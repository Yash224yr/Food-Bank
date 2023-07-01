import React from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  const thoughts = [
    "The best recipes are made with love.",
    "Cooking is an art that feeds the soul.",
    "Food brings people together.",
    "Explore the flavors of different regions.",
    "Every ingredient tells a story.",
    "Try something new today!",
  ];

  return (
    <div className='Explore-recipe'>
      <div className='explore-categories'>
        <h1>Recipe By Categories</h1>
        <p>"{thoughts[0]}"</p>
        <button><Link to="/category" >Get Recipes</Link></button>
      </div>
      <div className='explore-regional'>
        <h1>Regional Recipes</h1>
        <p>"{thoughts[1]}"</p>
        <button><Link to="/area" > Get Recipes</Link></button>
      </div>
      <div className='explore-ingredients'>
        <h1>Recipes By Ingredients</h1>
        <p>"{thoughts[2]}"</p>
        <button><Link to="/ingre" >Get Recipes</Link></button>
      </div>
      <div className='explore-random'>
        <h1>Get Random Meal</h1>
        <p>"{thoughts[3]}"</p>
        <button>Get Recipes</button>
      </div>
    </div>
  );
}

export default Explore;
