import React from 'react';

const SignUp = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center px-4 sm:px-0" style={{ backgroundImage: `url('/images/foodpic.jpg')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <a href="/home" className="mb-6 px-4 py-2 bg-[#00664B] text-white rounded-lg hover:bg-[#004d3f] transition duration-200">
          Go Back
        </a>
      </div>
      
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:px-12 sm:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
          <span className="text-black">Create Your</span> 
          <span className="text-[#00664B]"> MealEdge Account</span>
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00664B] focus:border-transparent"
              placeholder="Enter your name here"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00664B] focus:border-transparent"
              placeholder="Enter your email here"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00664B] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
         
          <button
            type="submit"
            className="w-full py-2 bg-[#00664B] text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account? <a href="/signin" className="text-[#00664B] font-bold hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
