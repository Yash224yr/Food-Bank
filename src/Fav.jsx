import React, { useContext, useEffect, useState } from 'react';
import { mealcontext } from './App';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Fav() {
  const { favlist, setFavList } = useContext(mealcontext);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealPromises = favlist.map((mealId) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        );
        const responses = await Promise.all(mealPromises);
        const meals = responses.map((response) => response.data.meals[0]);
        setFav(meals);
      } catch (error) {
        console.log(error);
      }
    };

    if (favlist.length > 0) {
      fetchMeals();
    }
  }, [favlist]);

  function handlerdelete(index) {
    setFavList(favlist.filter((list, ind) => ind !== index));
    setFav(fav.filter((_, ind) => ind !== index));
  }

  return (
    <div className='fav'>
      {favlist.length === 0 && <div className='no-fav'></div>}
      {favlist &&
        fav.map((meal, index) => (
          <div key={index} className='fav-list'>
            <img src={meal.strMealThumb} alt='' />
            <h1>{meal.strMeal}</h1>
            <h2>{meal.strCategory}</h2>
            <h3>{meal.strArea}</h3>
            <div className='favlist-edit'>
              <button className='noselect' onClick={() => handlerdelete(index)}>
                <span className='text'>Remove</span>
                <span className='icon'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'></path>
                  </svg>
                </span>
              </button>
              <button className='fav-receipe'>
                <Link to={`/receipe/${meal.idMeal}`}>Recipe</Link>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}


export default Fav;
