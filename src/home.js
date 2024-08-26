import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

const Home = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Store the actual query to be used
  const [selectedFilters, setSelectedFilters] = useState({
    dietGoal: '',
    dietType: '',
    cuisine: '',
    mealTime: '',
  });
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false); // Flag for triggering search

  const apiKey = '09fa079ebb8d409d81d7a68716dee758';

  const categoryMapping = useMemo(() => ({
    dietGoal: {
      'Weight Loss': 'low-calorie',
      'Weight Gain': 'high-calorie',
      'Maintain Health': 'healthy',
      'Muscle Building': 'high-protein',
    },
    dietType: {
      Vegetarian: 'vegetarian',
      'Non-Vegetarian': '',
      Vegan: 'vegan',
      Pescatarian: 'pescatarian',
    },
    cuisine: {
      Italian: 'italian',
      Indian: 'indian',
      Mexican: 'mexican',
      Chinese: 'chinese',
      Japanese: 'japanese',
    },
    mealTime: {
      Breakfast: 'breakfast',
      Lunch: 'lunch',
      Dinner: 'dinner',
      Snack: 'snack',
    },
  }), []);

  const handleFilterChange = (group, filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [group]: prev[group] === filterName ? '' : filterName,
    }));
    setDropdownVisible(false); // Close dropdown after selection
  };

  const generateTags = useCallback(() => {
    const tags = Object.keys(selectedFilters)
      .filter((group) => selectedFilters[group] && selectedFilters[group] !== 'none')
      .map((group) => categoryMapping[group][selectedFilters[group]])
      .filter((tag) => tag);
    return tags.join(',');
  }, [selectedFilters, categoryMapping]);

  const fetchRecipes = useCallback(
    async (type, append = false) => {
      setLoading(true);
      setError('');
      try {
        const tags = generateTags(); // Generate the combined tags string

        const query = searchQuery ? `query=${encodeURIComponent(searchQuery)}&` : '';
        const diet = selectedFilters.dietType ? `&diet=${categoryMapping.dietType[selectedFilters.dietType]}` : '';
        const cuisine = selectedFilters.cuisine ? `&cuisine=${categoryMapping.cuisine[selectedFilters.cuisine]}` : '';
        const mealType = selectedFilters.mealTime ? `&type=${categoryMapping.mealTime[selectedFilters.mealTime]}` : '';

        const url = `https://api.spoonacular.com/recipes/complexSearch?${query}tags=${tags}&sort=${type}&number=${append ? 5 : 7}${diet}${cuisine}${mealType}&apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();

        if (type === 'popularity') {
          setTrendingRecipes(data.results || []);
        } else if (type === 'random') {
          setRandomRecipes((prev) => (append ? [...prev, ...(data.results || [])] : data.results || []));
          setShowLoadMore(data.results.length > 0);
        } else if (type === 'search') {
          // Removed unused state update for searchResults
        }
      } catch (error) {
        console.error(`Error fetching ${type} recipes:`, error);
        setError(`An error occurred while fetching ${type} recipes: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [generateTags, searchQuery, apiKey, selectedFilters, categoryMapping] // Added categoryMapping
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setSearchQuery(searchTerm.trim()); // Set the actual search query
      setSearchTriggered(true); // Trigger search
    }
  };

  useEffect(() => {
    if (searchTriggered) {
      fetchRecipes('search'); // Trigger search fetch
      setSearchTriggered(false); // Reset search trigger after fetching
    }
  }, [searchTriggered, fetchRecipes]);

  useEffect(() => {
    fetchRecipes('popularity'); // Initial fetch for trending recipes
    fetchRecipes('random'); // Initial fetch for random recipes
  }, [fetchRecipes]);

  const fetchMoreRandomRecipes = async () => {
    fetchRecipes('random', true);
  };

  const navigate = useNavigate();

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const sanitizeSummary = (summary) => {
    return sanitizeHtml(summary, {
      allowedTags: ['b', 'i', 'em', 'strong', 'br'],
      allowedAttributes: {},
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e); // Trigger search on Enter key press
    }
  };


  return (
    <div className="container mx-auto px-4">
      <Navbar />

      <form className="max-w-lg mx-auto mt-8" onSubmit={handleSearch}>
        <div className="relative flex flex-col sm:flex-row">
          <div className="relative flex-grow">
            <input
              className="border-2 border-gray-300 bg-white h-12 w-full pl-5 pr-12 rounded-lg text-sm focus:outline-none shadow-md"
              type="search"
              name="search"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Added key down event handler
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="text-gray-600 h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
               
          <div className="relative mt-4 sm:mt-0 sm:ml-2">
            <button
              id="dropdownBgHoverButton"
              className="text-white bg-[#00664B] hover:bg-[#004d3f] focus:ring-4 focus:outline-none focus:ring-[#00664B] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-12 w-full sm:w-auto"
              type="button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              Filters
              <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownVisible && (
              <div
                id="dropdownBgHover"
                className="absolute z-20 w-full sm:w-64 bg-white rounded-lg shadow-lg mt-2"
                style={{ top: '100%', left: '0' }}
              >
                <div className="p-3 space-y-4">
                  <div>
                    <h3 className="font-medium">Diet Goals</h3>
                    <div className="flex flex-wrap">
                      {Object.keys(categoryMapping.dietGoal).map((filterName) => (
                        <button
                          key={filterName}
                          onClick={() => handleFilterChange('dietGoal', filterName)}
                          className={`m-1 px-3 py-1 rounded-full text-sm ${selectedFilters.dietGoal === filterName
                              ? 'bg-[#00664B] text-white'
                              : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                          {filterName}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Diet Types</h3>
                    <div className="flex flex-wrap">
                      {Object.keys(categoryMapping.dietType).map((filterName) => (
                        <button
                          key={filterName}
                          onClick={() => handleFilterChange('dietType', filterName)}
                          className={`m-1 px-3 py-1 rounded-full text-sm ${selectedFilters.dietType === filterName
                              ? 'bg-[#00664B] text-white'
                              : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                          {filterName}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Cuisines</h3>
                    <div className="flex flex-wrap">
                      {Object.keys(categoryMapping.cuisine).map((filterName) => (
                        <button
                          key={filterName}
                          onClick={() => handleFilterChange('cuisine', filterName)}
                          className={`m-1 px-3 py-1 rounded-full text-sm ${selectedFilters.cuisine === filterName
                              ? 'bg-[#00664B] text-white'
                              : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                          {filterName}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Meal Times</h3>
                    <div className="flex flex-wrap">
                      {Object.keys(categoryMapping.mealTime).map((filterName) => (
                        <button
                          key={filterName}
                          onClick={() => handleFilterChange('mealTime', filterName)}
                          className={`m-1 px-3 py-1 rounded-full text-sm ${selectedFilters.mealTime === filterName
                              ? 'bg-[#00664B] text-white'
                              : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                          {filterName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Trending Recipes</h2>
        <Swiper
          spaceBetween={10}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {trendingRecipes.map((recipe) => (
            <SwiperSlide key={recipe.id} className="relative group">
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                onClick={() => handleRecipeClick(recipe.id)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
              <h3 className="absolute bottom-0 left-0 right-0 text-white text-lg font-semibold p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {recipe.title}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Random Recipes</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00664B]"></div>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                  <p
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(sanitizeSummary(recipe.summary), 150),
                    }}
                  />
                  <button
                    onClick={() => handleRecipeClick(recipe.id)}
                    className="mt-4 bg-[#00664B] hover:bg-[#004d3f] text-white font-medium py-2 px-4 rounded-lg"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {showLoadMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={fetchMoreRandomRecipes}
              className="bg-[#00664B] hover:bg-[#004d3f] text-white font-medium py-2 px-4 rounded-lg shadow-md"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
