import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { mealcontext } from './App';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

function GetList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false); // Added state for Load More button
  const { category } = useParams();
  const { description, setDescription, favlist, setFavList } = useContext(mealcontext);
  const [visibleItems, setVisibleItems] = useState(20); // Number of items to be initially displayed

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => {
        const mealList = result.data.meals || [];
        setList(mealList);
        setLoading(false);

        // Check if the number of items exceeds 20
        if (mealList.length > 20) {
          setShowLoadMore(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function handlerfav(meal) {
    if (!favlist.includes(meal)) {
      setFavList([...favlist, meal]);
    }
  }

  function handlerdelete(mealId) {
    setFavList(favlist.filter((meal) => meal !== mealId));
  }

  function handleLoadMore() {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 20);
  }

  return (
    <div className='dish'>
      {description ? <p>{description}</p> : null}
      {loading ? (
        <div className='loader'>
          <div className='circle'></div>
          <div className='circle'></div>
          <div className='circle'></div>
          <div className='circle'></div>
        </div>
      ) : (
        <div className='dish-list'>
          {list.slice(0, visibleItems).map((meal, index) => (
            <div className='dish-key' key={index}>
              <Link  to={`/receipe/${meal.idMeal}`}  >
              <img src={meal.strMealThumb} alt='' />

              </Link>
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
                  />
                ) : (
                  <FavoriteBorderIcon
                    className='like'
                    onClick={() => {
                      handlerfav(meal.idMeal);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          {showLoadMore && visibleItems < list.length && (
            <button className='load-more-button' onClick={handleLoadMore}>
              Load More ...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GetList;
