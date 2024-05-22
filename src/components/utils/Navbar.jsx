import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setHamburgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {};

  const handleToggleHamburger = () => {
    setHamburgerOpen(true);
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full h-[10vh] z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-0">
          <Link
            to="/home"
            className="flex items-center rtl:space-x-reverse px-4"
          >
            <img
              src="/logo.png"
              className="h-[5vh] md:h-[3.5vw] mr-3"
              alt="MedoDoc"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-purple-600">
              Medo
            </span>
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-slate-400">
              Doc
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse px-4">
            <Link to="/prediction">
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-4 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                Predict
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={hamburgerOpen ? "true" : "false"}
              onClick={handleToggleHamburger}
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {hamburgerOpen && (
            <div
              ref={hamburgerRef}
              className=" md:hidden absolute top-[10vh] bg-purple-200 w-full flex justify-center items-center shadow-md rounded-b-xl"
            >
              <ul className="w-full">
                <Link to="/home">
                  <li className="border border-b-violet-300 rounded-b-xl shadow-sm hover:bg-slate-100 w-full flex justify-center py-2">
                    Home
                  </li>
                </Link>
                <Link to="/about">
                  <li className="border border-b-violet-300 rounded-b-xl shadow-sm hover:bg-slate-100 w-full flex justify-center py-2">
                    About
                  </li>
                </Link>
                <Link to="/enrolldoctor">
                  <li className="border border-b-violet-300 rounded-b-xl shadow-sm hover:bg-slate-100 w-full flex justify-center py-2">
                    Enroll Doctor
                  </li>
                </Link>
                <Link to="/contact">
                  <li className="border border-b-violet-300 rounded-b-xl shadow-sm hover:bg-slate-100 w-full flex justify-center py-2">
                    Contact
                  </li>
                </Link>
              </ul>
            </div>
          )}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 md:dark:text-purple-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/enrollDoctor"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Enroll Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
