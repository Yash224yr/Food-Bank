import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { mealcontext } from './App';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

function Area() {
  const [area, setArea] = useState([]);
  const [list, setList] = useState('');
  const [arealist, setArealist] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const { favlist, setFavList } = useContext(mealcontext);

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
    setLoading(true); // Start loading

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`)
      .then((result) => {
        setArealist(result.data.meals);
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading in case of an error
      });
  }

  function submitchange(e) {
    setList(e.target.value);
  }

  function handlerfav(meal) {
    if (!favlist.includes(meal)) {
      setFavList([...favlist, meal]);
    }
  }

  function handlerdelete(mealId) {
    setFavList(favlist.filter((meal) => meal !== mealId));
  }

  return (
    <div className='area-container'>
      <div className='select-area'>
        <select value={list} onChange={(e) => submitchange(e)}>
          <option disabled value=''>
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

      {loading ? (
        <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      ) : (
        <div className='area-dish-list'>
          {arealist.map((meal, index) => {
            return (
              <div className='dish-key' key={index}>
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

export default Area;
