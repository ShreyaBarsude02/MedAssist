import toast from "react-hot-toast";
import validator from "validator";

export const useSendSymptoms = () => {
    const host = "http://localhost:5000";
    const {setLoading, setShowPredictions} = useStateStore();

    const handleInputErrors = (symptoms) => {
        if (validator.isEmpty(symptoms)) {
            toast.error("Enter your symptoms");
        }}

    const sendSymptoms = async (symptoms) => {
        handleInputErrors(symptoms);

        try {
            setLoading(true);
            const response = await fetch(`${host}/api/prediction/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({symptoms}),
              });

              const data = await response.json();
              setLoading(false);

              if (response.ok) {
                setShowPredictions(true);
              }
        }catch (error) {
            console.error(error);
            toast.error("Please try again");
            setLoading(false);
          }
    }
    return {sendSymptoms};
}