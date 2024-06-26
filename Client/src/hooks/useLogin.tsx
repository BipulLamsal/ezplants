import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const useLoginAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const { login: contextLogin } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Invalid email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.status) {
        setLoginStatus(responseData.msg);
        contextLogin(responseData.data.token);
        localStorage.setItem("fullname", responseData.data.fullname);
        toast(`User Logged in : ${responseData.data.fullname}`);
      } else {
        setError(responseData.msg);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return { isLoading, error, loginStatus, login };
};
