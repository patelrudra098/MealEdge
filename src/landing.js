import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    '/images/food1.png',
    '/images/food2.png',
    '/images/food3.png',
    '/images/food4.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const features = [
    {
      name: 'Nutritional Database',
      description:
        'Access a comprehensive nutritional database to check the nutrients of various food items, ensuring you make informed dietary choices.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'AI Meal Generator',
      description:
        'Generate meal plans tailored to your dietary needs with the help of our AI-powered meal generator.',
      icon: LockClosedIcon,
    },
    {
      name: 'Recipe Search',
      description:
        'Search for recipes that align with your fitness goals, whether you’re looking to build muscle, lose weight, or maintain a healthy lifestyle.',
      icon: ArrowPathIcon,
    },
    {
      name: 'Save to Dashboard',
      description:
        'Easily save your favorite recipes and meal plans to your dashboard for quick access anytime.',
      icon: FingerPrintIcon,
    },
  ];

  return (
    <div className="p-5 font-nunito">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8 pl-4 pr-4">
        <h1 className="text-2xl md:text-3xl font-bold font-poppins">
          <span className="text-black">Meal</span>
          <span className="text-[#00664B]">Edge</span>
        </h1>
        <div className="flex space-x-2">
          <Link to="/signup">
            <button className="px-3 py-1  text-[#00664B] rounded-[10px] font-bold text-xs md:text-sm md:px-5 md:py-2 hover:bg-[#00664B] hover:text-white transition duration-200">
              Sign up
            </button>
          </Link>

          <Link to="/signin">
            <button className="px-3 py-1 bg-[#00664B] text-white rounded-[10px] font-bold text-xs md:text-sm md:px-5 md:py-2">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 mt-8 md:mt-16">
        {/* Hero Section */}
        <div className="md:w-[48%] ml-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 font-poppins">
            <span className="text-[#00664B]">AI</span>-Powered Meal Suggestions & Recipe Search!
          </h2>
          <p className="text-gray-700 mb-8 text-justify max-w-[650px]">
            Easily find recipes and create meal plans that match your health goals with our intelligent AI. Get personalized suggestions and browse a wide range of recipes tailored to your dietary preferences. Whether you want to lose weight, build muscle, or simply eat healthier, MealEdge makes meal planning effortless and enjoyable! Start your journey towards a healthier lifestyle with us. Our advanced algorithms take into consideration your dietary needs, preferences, and goals to suggest the best meal options for you. With MealEdge, planning meals has never been easier or more personalized!
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link to="/home">
                <button className="px-5 py-2 border-2 bg-[#00664B] text-white rounded-[10px] font-bold text-sm w-full md:w-auto">
                  Explore
                </button>
              </Link>
              <Link to="/home">
                <button className="px-5 py-2 border-2 border-white text-[#00664B] rounded-[10px] font-bold text-sm w-full md:w-auto hover:bg-[#00664B] hover:text-white transition duration-200">
                  Get started
                </button>
              </Link>

            </div>

            {/* Thumbnails (Only in PC mode) */}
            <div className="hidden md:flex justify-start mt-4 space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`thumbnail-${index}`}
                  className={`w-20 h-24 object-contain cursor-pointer rounded-lg transform transition-transform duration-300 ease-in-out ${index === activeIndex ? 'scale-110' : 'scale-100'
                    }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="md:w-[50%] flex justify-center items-center md:ml-8 mt-8 md:mt-0">
          <div className="w-full h-[550px] bg-white rounded-[10px] overflow-hidden">
            <img
              src={images[activeIndex]}
              alt="carousel"
              className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform slide-left"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout Thumbnails (below carousel) */}
      <div className="md:hidden flex justify-center mt-8 space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail-${index}`}
            className={`w-20 h-24 object-contain cursor-pointer rounded-lg transform transition-transform duration-300 ease-in-out ${index === activeIndex ? 'scale-110' : 'scale-100'
              }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-poppins">
              <span className="text-[#00664B]">Feature</span>-Oriented
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover a comprehensive set of tools to help you achieve your health and fitness goals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00664B]">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <span className="text-[#00664B]">{feature.name}</span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container mx-auto py-24 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg md:mr-8">
            <h2 className="text-3xl font-bold text-[#00664B] sm:text-4xl font-poppins mb-4">
              About Us
            </h2>
            <p className="mt-2 text-lg leading-8 text-justify">
              At MealEdge, our mission is to make healthy eating simple and accessible for everyone. We understand the challenges of meal planning and finding recipes that fit your dietary preferences, so we've created a platform that does the hard work for you. Whether you're aiming to lose weight, build muscle, or maintain a balanced diet, our AI-powered tools will guide you every step of the way. Our team of nutrition experts and tech enthusiasts is dedicated to helping you achieve your health goals with personalized meal suggestions and a vast library of delicious recipes.
            </p>
          </div>

          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src="/images/foodpic.jpg"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#00664B] py-8 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold font-poppins">
            <span className="text-white">Meal</span>
            <span className="text-white">Edge</span>
          </h1>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="/" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Support</a>
              </li>
            </ul>
          </div>
          <p className="text-sm mt-4 md:mt-0">
            &copy; 2024 MealEdge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
