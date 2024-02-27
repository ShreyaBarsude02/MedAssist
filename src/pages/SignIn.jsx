import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-gray-100">
        <div className="flex flex-col bg-teal-200 w-[75vw] h-[60vh] md:w-[50vw] xl:w-[25vw] items-center">
            <div>
                Sign In 
            </div>
          <div>
            <div className="name">name</div>
            <div className="email">email</div>
            <div className="password">password</div>
          </div>
          <div>
            go to signup
          </div>
          <div>
            <button>signin</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
