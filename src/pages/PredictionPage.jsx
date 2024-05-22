import React, { useState } from "react";
import symptoms from "../data/symptoms.json";

const PredictionPage = () => {
    const [userSymptoms, setUserSymptoms] = useState([]);

    const handleCheckBoxChange = (event) => {
        const {value, checked} = event.target;

        if(checked) {
            setUserSymptoms([...userSymptoms, value]);
        }else{
            setUserSymptoms(userSymptoms.filter((symptom)=>{symptom!==value}));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="form bg-purple-50 w-[80vw] mt-20 rounded-xl flex justify-center flex-col p-9">
          <div className="flex flex-col items-center">
            <span className="text-violet-900 font-serif text-xl">
              Tells us your symptoms
            </span>
            <div className="grid grid-cols-4">
              {symptoms.types.map((element) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      id={element}
                      name={element}
                      value={element}
                      onChange={handleCheckBoxChange}
                    />
                    <label htmlFor={element}> {element}</label>
                    <br />
                  </div>
                );
              })}
            </div>
            <button onClick={handleSubmit} className="w-[7vw] h-[4vh] rounded-xl bg-purple-200">
                Submit
            </button>
          </div>
          <div>prediction</div>
        </div>
      </div>
    </>
  );
};

export default PredictionPage;
