import React, { useEffect, useState } from "react";
import symptoms from "../data/symptoms.json";
import { useSendSymptoms } from "../hooks/prediction/useSendSymptoms";
import { useStateStore } from "../zustand/useStateStore";
import Spinner from "../components/utils/Spinner";
import precautionsData from "../data/precautions.json";

const PredictionPage = () => {
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [subDropdownOpen, setSubDropdownOpen] = useState({});
  const [selectedDiseasePrecautions, setSelectedDiseasePrecautions] = useState(
    []
  );
  const { sendSymptoms } = useSendSymptoms();
  const { loading, showPredictions, setShowPredictions, diseaseInfo, disease, doctor, specialist } =
    useStateStore();

    useEffect(()=>{
      console.log(typeof doctor);
    },[doctor]);

  const handleCheckBoxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setUserSymptoms([...userSymptoms, value]);
    } else {
      setUserSymptoms(userSymptoms.filter((symptom) => symptom !== value));
    }
  };

  const handleDropdownToggle = (category) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleSubDropdownToggle = (category, subcategory) => {
    setSubDropdownOpen((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [subcategory]: !prevState[category]?.[subcategory],
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendSymptoms(userSymptoms);
    const precautions = precautionsData[disease];
    setSelectedDiseasePrecautions(precautions);
  };

  const handleClear = () => {
    setUserSymptoms([]);
    setSelectedDiseasePrecautions([]);
    setSelectedDiseasePrecautions([]);
    setDropdownOpen({});
    setSubDropdownOpen({});
    setShowPredictions(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="form bg-purple-50 w-[80vw] mt-20 rounded-xl flex justify-center flex-col p-9">
          <div className="flex flex-col items-center">
            <span className="text-violet-900 font-serif text-xl">
              Tell us your symptoms
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-36 md:gap-x-12 xl:gap-x-36 gap-9 my-9">
              {Object.entries(symptoms).map(([category, subcategories]) => (
                <div key={category}>
                  <div
                    className="dropdownlabel bg-purple-200 rounded-lg px-9 flex justify-between cursor-pointer"
                    onClick={() => handleDropdownToggle(category)}
                  >
                    <label className="text-gray-700">{category}</label>
                    <div>{dropdownOpen[category] ? "-" : "+"}</div>
                  </div>
                  {dropdownOpen[category] && (
                    <div className="dropdown flex flex-col">
                      {Object.entries(subcategories).map(
                        ([subcategory, symptomsList]) => (
                          <div key={subcategory}>
                            <div
                              className="dropdownlabel bg-purple-100 rounded-lg px-7 flex justify-between my-1 cursor-pointer"
                              onClick={() =>
                                handleSubDropdownToggle(category, subcategory)
                              }
                            >
                              <label className="text-gray-600">
                                {subcategory}
                              </label>
                              <div>
                                {subDropdownOpen[category]?.[subcategory]
                                  ? "-"
                                  : "+"}
                              </div>
                            </div>
                            {subDropdownOpen[category]?.[subcategory] && (
                              <div className="dropdown flex flex-col ml-4">
                                {symptomsList.map((symptom) => (
                                  <div
                                    key={symptom}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={symptom}
                                      type="checkbox"
                                      value={symptom}
                                      className="mr-2"
                                      onChange={handleCheckBoxChange}
                                    />
                                    <label htmlFor={symptom}>{symptom}</label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!loading ? (
              <div className="flex items-center">
                <button
                  onClick={handleSubmit}
                  className="mt-4 mr-4 rounded-xl bg-purple-200 hover:bg-purple-300 shadow-md py-2 px-9 font-medium text-purple-950"
                >
                  Submit
                </button>
                <button
                  onClick={handleClear}
                  className="mt-4 rounded-xl bg-purple-200 hover:bg-purple-300 shadow-md py-2 px-9 font-medium text-purple-950"
                >
                  Clear
                </button>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="mt-8">
            <div className="my-4">
              <h2 className="text-violet-900 font-semibold text-lg">
                Prediction:
              </h2>
              {!showPredictions && (
                <p className="mt-2 text-gray-700">
                  Prediction result will be displayed here after submission.
                </p>
              )}
            </div>
            {showPredictions && (
              <div className="bg-white flex flex-col justify-center items-center rounded-md">
                <div className="flex justify-center items-center mt-3 mb-5">
                  <img src="/logo.png" className="size-[5vw] mx-4" />
                  <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-purple-600">
                    Medo
                  </span>
                  <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-slate-400">
                    Doc
                  </span>
                </div>
                <div>
                  <span className="text-violet-900 font-black text-2xl">
                    Disease Predicted
                  </span>{" "}
                  :{" "}
                  <span className="text-gray-900 font-black italic text-2xl">
                    {disease}
                  </span>
                </div>
                <div className="diseaseInfo px-9 my-5 text-justify font-medium">
                  {diseaseInfo}
                </div>
                <div className="precautions px-9 my-5 text-justify font-medium bg-purple-50  flex justify-center items-center">
                  {selectedDiseasePrecautions && (
                    <div className="flex flex-col items-center justify-center py-5">
                      <span className="text-violet-900  text-2xl px-9 mb-2  text-justify ">
                        Precautions:
                      </span>
                      <ul className="flex flex-col justify-center ">
                        {selectedDiseasePrecautions.precautions && selectedDiseasePrecautions.precautions.map(
                          (precaution, index) => (
                            <li key={index}>- {precaution}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="my-4 text-lg font-semibold">
                  <span>Specialist Doctor to consult : {specialist}</span>
                </div>
                <div className="pb-4">
                  {doctor.length === 0 && (
                    <span className="italic text-sm">
                      Currently we dont have an specialist doctor for the above
                      disease
                    </span>
                  )}
                  {doctor && (
                    <div className="">
                      <span>Our specialist doctors:- </span>
                      <div className="grid grid-cols-1">
                        {Array.isArray(doctor) &&
                          doctor.map((doc) => (
                            <div
                              key={doc.name}
                              className="w-[20vw] bg-purple-100 flex flex-col px-5 py-2 space-y-2"
                            >
                              <div className="flex justify-center">
                                <span className="font-medium text-lg text-purple-950">
                                  {doc.name}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Email</span>:{" "}
                                <span>{doc.email}</span>
                              </div>
                              <div>
                                <span className="font-medium">Phone</span>:{" "}
                                <span>{doc.phone}</span>
                              </div>
                              <div>
                                <span className="font-medium">Address</span>:{" "}
                                <span>{doc.address}</span>
                              </div>
                              <div>
                                <span className="font-medium">Education</span>:{" "}
                                <span>{doc.education}</span>
                              </div>
                              <div>
                                <span className="font-medium">Experience</span>:{" "}
                                <span>{doc.experience}</span>
                              </div>
                              <div>
                                <span className="font-medium">
                                  Specialization
                                </span>
                                : <span>{doc.specialization}</span>
                              </div>
                              <div>
                                <span className="font-medium">Description</span>
                                : <span>{doc.description}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PredictionPage;
