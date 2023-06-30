import React, { useContext, useEffect, useState } from 'react';
import { mealcontext } from './App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


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
              <DeleteIcon onClick={() => handlerdelete(index)} ></DeleteIcon>
              <Link to={`/receipe/${meal.idMeal}`}>Recipe</Link>
              <button></button>
            </div>
          </div>
        ))}
    </div>
  );
}


export default Fav;
