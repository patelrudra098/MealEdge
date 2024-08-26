import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNutrientsOpen, setIsNutrientsOpen] = useState(false); // Manage dropdown state
  const [openModal, setOpenModal] = useState(null); // For managing which modal is open

  const apiKey = '09fa079ebb8d409d81d7a68716dee758';

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        // Fetch recipe details
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        if (!response.ok) throw new Error('Failed to fetch recipe details.');
        const data = await response.json();
        setRecipe(data);

        // Fetch nutritional information
        const nutritionResponse = await fetch(
          `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`
        );
        if (!nutritionResponse.ok) throw new Error('Failed to fetch nutritional information.');
        const nutritionData = await nutritionResponse.json();
        setRecipe(prev => ({ ...prev, nutrition: nutritionData }));

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, apiKey]);

  const closeModal = () => setOpenModal(null);
  const toggleNutrients = () => setIsNutrientsOpen(prev => !prev); // Toggle dropdown

  if (loading) {
    return <div className="flex justify-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00664B]"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#00664B] text-white rounded-lg hover:bg-[#004d3f] transition duration-200"
      >
        Go Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Rectangle: Recipe Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Right Rectangle: Recipe Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-4xl font-poppins font-bold mb-4">{recipe.title}</h2>
          <p className="text-lg font-nunito text-gray-700 mb-6 text-justify">
            {recipe.summary ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, '') : 'No summary available.'}
          </p>

          {/* Buttons for Instructions and Ingredients */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setOpenModal('instructions')}
              className="w-full px-4 py-2 bg-[#00664B] text-white rounded-lg hover:bg-[#004d3f] transition duration-200"
            >
              See Instructions
            </button>
            <button
              onClick={() => setOpenModal('ingredients')}
              className="w-full px-4 py-2 bg-[#00664B] text-white rounded-lg hover:bg-[#004d3f] transition duration-200"
            >
              See Ingredients
            </button>
          </div>

          {/* Nutritional Information Dropdown */}
          <button
            onClick={toggleNutrients}
            className="w-full px-4 py-2 bg-[#E6F3ED] text-[#00664B] rounded-lg border border-[#00664B] flex justify-between items-center text-left"
          >
            <span>Nutritional Information</span>
            <ChevronUpIcon
              className={`${isNutrientsOpen ? 'transform rotate-180' : ''
                } w-5 h-5 text-[#00664B]`}
            />
          </button>
          {isNutrientsOpen && (
            <div className="px-4 py-2 text-gray-700 bg-[#F9F9F9] border border-t-0 border-[#00664B] rounded-b-lg">
              <ul className="list-disc list-inside space-y-1">
                {recipe.nutrition && recipe.nutrition.nutrients && recipe.nutrition.nutrients.length > 0 ? (
                  recipe.nutrition.nutrients.map((nutrient) => (
                    <li key={nutrient.name}>
                      {nutrient.name}: {nutrient.amount} {nutrient.unit}
                    </li>
                  ))
                ) : (
                  <li>No nutritional information available.</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Instructions */}
      {openModal === 'instructions' && (
        <div className="fixed inset-0 bg-black/30" aria-hidden="true">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6 overflow-y-auto max-h-[80vh] relative">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-semibold mb-4">Instructions</h3>
              <ul className="list-decimal list-inside space-y-2 text-gray-700">
                {recipe.analyzedInstructions.length > 0 ? (
                  recipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))
                ) : (
                  <li>No instructions available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Ingredients */}
      {openModal === 'ingredients' && (
        <div className="fixed inset-0 bg-black/30" aria-hidden="true">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6 overflow-y-auto max-h-[80vh] relative">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-semibold mb-4">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                  recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.original}
                    </li>
                  ))
                ) : (
                  <li>No ingredients available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
