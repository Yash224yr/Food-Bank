import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { mealcontext } from './App';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Ingredients() {
  const { search, setSearch } = useContext(mealcontext);
  const [meal, setMeal] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  function getRecipe(meal) {
    setReceipe(meal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(input);
  }

  return (
    <div className='search-meal'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search Your Meal'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>
          <SearchIcon />
        </button>
      </form>

      {error ? (
        <div className='error'>

        </div>
      ) : (

        <div className='area-list'>
          {
            meal.map((meal, index) => {
              return (
                <div className='area-dish' key={index}>
                <img src={meal.strMealThumb} alt="" />
                <Link className='gotoreceipe'  to={`/receipe/${meal.idMeal}`} onClick={() => getRecipe(meal.idMeal)}>{meal.strMeal} </Link>
                <h1><Link to="/fav" ><FavoriteBorderIcon/></Link></h1>
            </div>
              )
            })
          }
        </div>
      )}
    </div>
  );
}

export default Ingredients;
