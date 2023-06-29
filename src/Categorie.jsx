import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mealcontext } from './App';

function Categorie() {
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState(true);
  const { description, setDescription } = useContext(mealcontext);


  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((result) => {
        setCategories(result.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getdescription(meal) {
    setDescription(meal);
  }

  return (
    <div className="categories">

      <div className="text">
        <div className="categorie-text">
          <h1>
            Receipe By<span>Categories</span>
          </h1>
        </div>
        <div className="text-line"></div>
      </div>
      <div className="categories-list">
        {categories.map((meal, index) => (
          <div key={index} className="category-item">
            <img className="imggoto" src={meal.strCategoryThumb} alt="" />
            <h1 className="goto">{meal.strCategory}</h1>
            <button
              className="cta"
              onClick={() => {
                getdescription(meal.strCategoryDescription);
              }}
            >
              <span>
                <Link to={`/list/${meal.strCategory}`}>Discover Recipes</Link>
              </span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorie;
