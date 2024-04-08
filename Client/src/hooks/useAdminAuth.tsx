import { useState } from "react";

const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/checkAdminAuth",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        setError("Authentication failed");
        return false;
      }


      
      setIsLoading(false);
      setError(null);


      return true;
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while authenticating.");
      return false;
    }
  };

  return { auth, error, isLoading };
};
export default useAdminAuth;
