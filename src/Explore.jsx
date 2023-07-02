import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Explore() {
  const thoughts = [
    "Recipes: a taste of creativity.",
    "Explore the world through recipes.",
    "Unlock the magic of fresh ingredients.",
    "Random meals: a delicious adventure.",
  ];

  const [randomMealId, setRandomMealId] = useState(null);
  const navigate = useNavigate();

  async function handleRandomMeal() {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const mealId = response.data.meals[0].idMeal;
    setRandomMealId(mealId);
    navigate(`/recipe/${mealId}`);
  }

  return (
    <div className='Explore-recipe'>
      <div className='explore-categories'>
        <h1>Recipe By Categories</h1>
        <p>"{thoughts[0]}"</p>
        <button>
          <Link to="/category">Get Recipes</Link>
        </button>
      </div>
      <div className='explore-regional'>
        <h1>Regional Recipes</h1>
        <p>"{thoughts[1]}"</p>
        <button>
          <Link to="/area">Get Recipes</Link>
        </button>
      </div>
      <div className='explore-ingredients'>
        <h1>Recipes By Ingredients</h1>
        <p>"{thoughts[2]}"</p>
        <button>
          <Link to="/ingre">Get Recipes</Link>
        </button>
      </div>
      <div className='explore-random'>
        <h1>Get Random Meal</h1>
        <p>"{thoughts[3]}"</p>
        <button onClick={handleRandomMeal}>
          Get Recipes
        </button>
      </div>
    </div>
  );
}

export default Explore;
