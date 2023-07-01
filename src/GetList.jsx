import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { mealcontext } from './App'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

function GetList() {
  const [list, getlist] = useState([])
  const [loading, setLoading] = useState(true); // Added loading state
  const { category } = useParams()
  const { description, setDescription, favlist, setFavList } = useContext(mealcontext)

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => {
        getlist(result.data.meals)
        setLoading(false); // Set loading state to false once data is fetched
      })
      .catch((err) => {
        console.log(err)
        setLoading(false); // Set loading state to false in case of error
      })
  }, [])

  function handlerfav(meal) {
    if (!favlist.includes(meal)) {
      setFavList([...favlist, meal])
    }
  }

  function handlerdelete(mealId) {
    setFavList(favlist.filter((meal) => meal !== mealId));
  }

  return (
    <div className='dish'>
      {description ? <p>{description}</p> : null}
      {loading ? ( 
         <div className="loader">
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
       </div>
      ) : (
        <div className='dish-list'>
          {list.map((meal, index) => (
            <div className='dish-key' key={index}>
              <img src={meal.strMealThumb} alt="" />
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
        </div>
      )}
    </div>
  )
}

export default GetList;
