// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import Navbar from './navbar';
// import { useNavigate } from 'react-router-dom';
// import sanitizeHtml from 'sanitize-html';

// const Home = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedCuisine, setSelectedCuisine] = useState(''); // Added cuisine filter
//   const [selectedMealTime, setSelectedMealTime] = useState(''); // Added meal time filter
//   const [trendingRecipes, setTrendingRecipes] = useState([]);
//   const [randomRecipes, setRandomRecipes] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [showLoadMore, setShowLoadMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const apiKey = '33ddd655240e48329e70565d7a70c6de';

//   const categoryMapping = useMemo(
//     () => ({
//       'Weight Loss': 'low-calorie',
//       'Weight Gain': 'high-calorie',
//       'Maintain Health': 'healthy',
//       'Muscle Building': 'high-protein',
//       'Vegetarian': 'vegetarian',
//       'Non-Vegetarian': 'omnivore', // Updated to "omnivore" for Spoonacular
//       'Vegan': 'vegan',
//       'Pescatarian': 'pescatarian',
//       'Gluten-Free': 'gluten free',
//     }),
//     []
//   );

//   const cuisineOptions = useMemo(
//     () => [
//       'Italian',
//       'Mexican',
//       'Indian',
//       'Chinese',
//       'Mediterranean',
//       'French',
//       'Japanese',
//       'American',
//     ],
//     []
//   );

//   const mealTimeOptions = useMemo(
//     () => ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
//     []
//   );

//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryName)
//         ? prev.filter((cat) => cat !== categoryName)
//         : [...prev, categoryName]
//     );
//   };

//   const fetchTrendingRecipes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const tags = selectedCategories.map((cat) => categoryMapping[cat]).join(',');
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=7&diet=${tags}&cuisine=${selectedCuisine}&type=${selectedMealTime}&apiKey=${apiKey}`
//       );
//       const data = await response.json();
//       setTrendingRecipes(data.results || []);
//     } catch (error) {
//       console.error('Error fetching trending recipes:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCategories, selectedCuisine, selectedMealTime, apiKey, categoryMapping]);

//   const fetchRandomRecipes = useCallback(async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/random?number=5&page=${page}&tags=${selectedCuisine},${selectedMealTime}&apiKey=${apiKey}`
//       );
//       const data = await response.json();
//       setRandomRecipes((prev) => [...prev, ...(data.recipes || [])]);
//       setShowLoadMore(data.recipes.length > 0);
//     } catch (error) {
//       console.error('Error fetching random recipes:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [apiKey, selectedCuisine, selectedMealTime]);

//   useEffect(() => {
//     fetchTrendingRecipes();
//     fetchRandomRecipes();
//   }, [fetchTrendingRecipes, fetchRandomRecipes]);

//   const fetchMoreRandomRecipes = async () => {
//     const nextPage = Math.ceil(randomRecipes.length / 6) + 1;
//     fetchRandomRecipes(nextPage);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     if (searchTerm.trim() === '') {
//       setSearchResults([]);
//       fetchRandomRecipes();
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=6&diet=${selectedCategories.map((cat) => categoryMapping[cat]).join(',')}&cuisine=${selectedCuisine}&type=${selectedMealTime}&apiKey=${apiKey}`
//       );
//       const data = await response.json();
//       if (data.results.length === 0) {
//         setError('No recipes found for the given search term.');
//       }
//       setSearchResults(data.results || []);
//     } catch (error) {
//       console.error('Error performing search:', error);
//       setError('An error occurred while searching.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       fetchRandomRecipes();
//     } else {
//       setRandomRecipes(searchResults);
//     }
//   }, [searchResults, searchTerm, fetchRandomRecipes]);

//   const navigate = useNavigate();

//   const handleRecipeClick = (id) => {
//     navigate(`/recipe/${id}`);
//   };

//   const sanitizeSummary = (summary) => {
//     return sanitizeHtml(summary, {
//       allowedTags: ['b', 'i', 'em', 'strong', 'br'],
//       allowedAttributes: {},
//     });
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <Navbar />
//       <form className="max-w-lg mx-auto mt-8" onSubmit={handleSearch}>
//         <div className="relative flex flex-col sm:flex-row">
//           <div className="relative flex-grow">
//             <input
//               className="border-2 border-gray-300 bg-white h-12 w-full pl-5 pr-12 rounded-lg text-sm focus:outline-none shadow-md"
//               type="search"
//               name="search"
//               placeholder="Search recipes..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
//               <svg
//                 className="text-gray-600 h-5 w-5 fill-current"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 56.966 56.966"
//               >
//                 <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
//               </svg>
//             </button>
//           </div>

//           <div className="relative mt-4 sm:mt-0 sm:ml-2">
//             <button
//               id="dropdownBgHoverButton"
//               className="text-white bg-[#00664B] hover:bg-[#004d3f] focus:ring-4 focus:outline-none focus:ring-[#00664B] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-12 w-full sm:w-auto"
//               type="button"
//               onClick={() => setDropdownVisible(!dropdownVisible)}
//             >
//               Filters
//               <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 4 4 4-4"
//                 />
//               </svg>
//             </button>

//             {dropdownVisible && (
//               <div
//                 id="dropdownBgHover"
//                 className="absolute z-20 w-full sm:w-48 bg-white rounded-lg shadow-lg mt-2"
//                 style={{ top: '100%', left: '0' }}
//               >
//                 <ul className="p-3 space-y-1 text-sm text-gray-700">
//                   {Object.keys(categoryMapping).map((category) => (
//                     <li key={category}>
//                       <div className="flex items-center p-2 rounded hover:bg-gray-100">
//                         <input
//                           id={`checkbox-item-${category}`}
//                           type="checkbox"
//                           className="w-4 h-4 text-[#00664B] bg-gray-100 border-gray-300 rounded focus:ring-[#00664B]"
//                           checked={selectedCategories.includes(category)}
//                           onChange={() => handleCategoryChange(category)}
//                         />
//                         <label
//                           htmlFor={`checkbox-item-${category}`}
//                           className="w-full ml-2 text-sm font-medium text-gray-900"
//                         >
//                           {category}
//                         </label>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </form>

//       <section className="my-16">
//         <h2 className="text-2xl font-bold mb-6 font-poppins">Trending Recipes</h2>
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={10}
//           breakpoints={{
//             640: { slidesPerView: 2, spaceBetween: 20 },
//             768: { slidesPerView: 3, spaceBetween: 30 },
//             1024: { slidesPerView: 4, spaceBetween: 40 },
//           }}
//           className="mySwiper"
//         >
//           {trendingRecipes.map((recipe) => (
//             <SwiperSlide key={recipe.id}>
//               <div className="relative group">
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   className="rounded-lg w-full h-52 object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
//                   <button
//                     className="text-white text-lg font-bold"
//                     onClick={() => handleRecipeClick(recipe.id)}
//                   >
//                     {recipe.title}
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       <section className="my-16">
//         <h2 className="text-2xl font-bold mb-6 font-poppins">Random Recipes</h2>
//         {loading ? (
//           <div className="flex justify-center my-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00664B]"></div>
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {randomRecipes.map((recipe) => (
//                 <div
//                   key={recipe.id}
//                   className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
//                 >
//                   <img src={recipe.image} alt={recipe.title} className="w-full h-52 object-cover" />
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
//                     <p
//                       className="text-gray-700 text-sm mb-4 line-clamp-3"
//                       dangerouslySetInnerHTML={{ __html: sanitizeSummary(recipe.summary) }}
//                     ></p>
//                     <button
//                       className="bg-[#00664B] text-white  py-2 px-4 rounded hover:bg-[#004d3f]"
//                       onClick={() => handleRecipeClick(recipe.id)}
//                     >
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {showLoadMore && (
//               <div className="flex justify-center mt-8">
//                 <button
//                   onClick={fetchMoreRandomRecipes}
//                   className="bg-[#00664B] text-white font-bold py-2 px-6 rounded hover:bg-[#004d3f]"
//                 >
//                   Load More Recipes
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;
