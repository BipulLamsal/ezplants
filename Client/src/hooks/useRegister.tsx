import { useState } from "react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const register = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            password,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.status) {
        setRegisterStatus(responseData.msg);
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

  return { isLoading, error, registerStatus, register };
};
