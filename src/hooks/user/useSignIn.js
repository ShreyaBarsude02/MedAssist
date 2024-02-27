import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignin = () => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [loading, setLoading] = useState(false);

  const signin = async (email, password) => {
    handleInputErrors(email, password);

    try {
      const response = await fetch(`${host}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/home");
      }

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("authtoken", data.authtoken);
      localStorage.setItem("userId", data.user_id);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return { signin };
};

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
  }
}
