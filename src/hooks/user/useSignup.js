import toast from "react-hot-toast";
import validator from "validator";
import { useStateManager } from "../../zustand/useStateManager";

export const useSignup = () => {

  const {setLoading} = useStateManager

  const signup = async (fullname, email, password, gender) => {
    handleinputerrors(fullname, email, password, gender);
    
    try {
        
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password, gender }),
      });
      setLoading(true);
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        return true;
      } else {
        if (data.error === "User already exist") {
          toast.error("User already exist");
          return false;
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return { signup };
};

const handleinputerrors = (fullname, email, password, gender) => {
  if (validator.isEmpty(fullname)) {
    toast.error("Enter your Full Name");
  }

  if (!validator.isEmail(email)) {
    toast.error("Please enter a valid email");
  }

  if (!validator.isByteLength(password, [, { min: 8, max: undefined }])) {
    toast.error("Password must be atleast 8 characters");
  }

  if (validator.isEmpty(gender)) {
    toast.error("Please select your Gender");
  }
};
