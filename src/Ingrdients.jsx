import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { mealcontext } from './App';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';


function Ingredients() {
  const { search, setSearch } = useContext(mealcontext);
  const [meal, setMeal] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const { favlist, setFavList } = useContext(mealcontext)


  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((result) => {
        if (result.data.meals) {
          setMeal(result.data.meals);
          setError('');
        } else {
          setMeal([]);
          setError('Oops! Not Found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [search]);

  function getRecipe(meal) {
    setReceipe(meal);
  }

  function handlerfav(meal) {
    if (!favlist.includes(meal)) {
      setFavList([...favlist, meal])
    }
  }

  function handlerdelete(mealId) {
    setFavList(favlist.filter((meal) => meal !== mealId));
  }

  return (
    <div className='search-meal'>
      {loading ? (
        <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
      ) : error ? (
        <div className='error'></div>
      ) : (
        <div className='search-dish-list'>
          {meal.map((meal, index) => {
            return (
              <div className='search-dish-key' key={index}>
                <img src={meal.strMealThumb} alt='' />
                <div className='dish-receipe'>
                  <h1>
                    <Link to={`/receipe/${meal.idMeal}`}>{meal.strMeal}</Link>
                  </h1>
                  {favlist.includes(meal.idMeal) ? (
                    <FavoriteSharpIcon
                      className='unlike'
                      onClick={() => {
                        handlerdelete(meal.idMeal);
                      }}
                    ></FavoriteSharpIcon>
                  ) : (
                    <FavoriteBorderIcon
                      className='like'
                      onClick={() => {
                        handlerfav(meal.idMeal);
                      }}
                    ></FavoriteBorderIcon>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ingredients;
