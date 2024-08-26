import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className="text-2xl md:text-3xl font-bold font-poppins logo">
            <span className="text-black">Meal</span>
            <span className="text-[#00664B]">Edge</span>
          </h1>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 text-white bg-[#00664B] rounded md:bg-transparent md:text-[#00664B] md:p-0 dark:text-white md:dark:text-[#00664B] font-poppins transition-transform transform hover:scale-105"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/nutritiondb"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00664B] md:p-0 dark:text-white md:dark:hover:text-[#00664B] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-poppins transition-transform transform hover:scale-105"
              >
                Nutritional DB
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00664B] md:p-0 dark:text-white md:dark:hover:text-[#00664B] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-poppins transition-transform transform hover:scale-105"
              >
                Signin
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00664B] md:p-0 dark:text-white md:dark:hover:text-[#00664B] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-poppins transition-transform transform hover:scale-105"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00664B] md:p-0 dark:text-white md:dark:hover:text-[#00664B] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-poppins transition-transform transform hover:scale-105"
              >
                Generate With AI
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
