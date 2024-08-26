import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './landing';
import SignIn from './signin';
import SignUp from './signup';
import Home from './home';
import NutritionDB from './nutritiondb';
import RecipeDetails from './recipedetails';
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing page at the root URL */}
        <Route path="/" element={<Landing />} />
        {/* Route for the Home page */}
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/nutritiondb" element={<NutritionDB />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
