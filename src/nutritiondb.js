import React, { useState } from 'react';
import Navbar from './navbar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'; // Add heroicons for better search icon

const NutritionDB = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setError('Search term cannot be empty.');
      return;
    }

    try {
      // Search for recipes by ingredient
      const searchResponse = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=1&apiKey=${apiKey}`
      );

      if (!searchResponse.ok) {
        throw new Error('Error fetching ingredient data.');
      }

      const searchData = await searchResponse.json();

      if (searchData.length > 0) {
        const recipeId = searchData[0].id;
        // Fetch detailed nutritional information
        const infoResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`
        );

        if (!infoResponse.ok) {
          throw new Error('Error fetching nutritional information.');
        }

        const infoData = await infoResponse.json();
        setNutritionInfo(infoData.nutrition); // Set nutritional information
        setError(''); // Clear any previous errors
      } else {
        setNutritionInfo(null);
        setError('No ingredient found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching nutritional information. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar */}
      <Navbar />

      {/* Search Bar */}
      <form className="max-w-lg mx-auto mt-8 px-4" onSubmit={handleSearch}>
        <div className="relative flex flex-col sm:flex-row">
          <input
            className="border-2 border-gray-300 bg-white h-12 w-full pl-5 pr-12 rounded-lg text-sm focus:outline-none shadow-md placeholder-gray-500"
            type="search"
            name="search"
            placeholder="Search for nutritional info..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
          >
            <MagnifyingGlassIcon className="text-gray-800 h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Nutritional Information Section */}
      <section className="mt-8 max-w-4xl mx-auto p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {nutritionInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Macronutrients Card */}
            <div className="p-6 bg-[#E6F3ED] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#00664B]">Macronutrients</h3>
              <div className="space-y-4">
                {nutritionInfo.nutrients
                  .filter(nutrient =>
                    ['Protein', 'Carbohydrates', 'Fat', 'Calories', 'Sugar', 'Fiber', 'Cholesterol', 'Sodium'].includes(nutrient.name)
                  )
                  .map((nutrient) => (
                    <div key={nutrient.name} className="p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-700">
                        <span className="font-semibold">{nutrient.name}:</span> {nutrient.amount} {nutrient.unit}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            {/* Micronutrients Card */}
            <div className="p-6 bg-[#E6F3ED] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#00664B]">Micronutrients</h3>
              <div className="space-y-4">
                {nutritionInfo.nutrients
                  .filter(nutrient =>
                    nutrient.name.includes('Vitamin') || nutrient.name.includes('Mineral')
                  )
                  .map((nutrient) => (
                    <div key={nutrient.name} className="p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-700">
                        <span className="font-semibold">{nutrient.name}:</span> {nutrient.amount} {nutrient.unit}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          !error && <p className="text-center text-gray-700 mt-8">No nutritional information available.</p>
        )}
      </section>
    </div>
  );
};

export default NutritionDB;
