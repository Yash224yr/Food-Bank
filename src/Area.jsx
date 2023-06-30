import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Area() {
  const [area, setArea] = useState([]);
  const [list, setList] = useState('');
  const [arealist, setArealist] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((result) => {
        setArea(result.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });

    setRandomQuote(getRandomQuote());
  }, []);

  function getRandomQuote() {
    const quotes = [
      'The best way to experience a region is through its local cuisine.',
      'Regional dishes are the heart and soul of a culture.',
      'Exploring regional food is like taking a delicious journey through the country.',
      'Every region has its unique flavors and culinary traditions.',
      'Taste the essence of a region in every bite of its signature dishes.',
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function submithandler() {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`)
      .then((result) => {
        setArealist(result.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitchange(e) {
    setList(e.target.value);
  }

  return (
    <div className='area-container'>
      <div className='select-area'>
        <select onChange={(e) => submitchange(e)}>
          <option disabled selected>
            Select the Region
          </option>
          {area
            ? area.map((meal, index) => (
                <option key={index} value={meal.strArea}>
                  {meal.strArea}
                </option>
              ))
            : ''}
        </select>
        <button onClick={() => submithandler()}>
          <SearchIcon />
        </button>
      </div>
      <div className='random-quote'>
        <p>" {randomQuote} "</p>
      </div>

      <div className='area-list'>
        {arealist.map((meal, index) => {
          return (
            <div className='area-dish' key={index}>
              <img src={meal.strMealThumb} alt='' />
              <Link className='gotoreceipe' to={`/receipe/${meal.idMeal}`}>
                {meal.strMeal}
              </Link>
              <h1>
                <Link to='/fav'>
                  <FavoriteBorderIcon />
                </Link>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Area;
