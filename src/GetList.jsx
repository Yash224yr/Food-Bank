import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { mealcontext } from './App'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';



function GetList() {
  const [list, getlist] = useState([])
  const { category } = useParams()
  const { description, setDescription, favlist, setFavList } = useContext(mealcontext)




  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => {
        getlist(result.data.meals)
      })
      .catch((err) => {
        console.log(err)
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
      {description ? (<p>{description}</p>) : ("")}
      <div className='dish-list'>
        {
          list.map((meal, index) => {
            return (
              <div className='dish-key' key={index}>
                <img src={meal.strMealThumb} alt="" />
                <div className='dish-receipe' >
                  <h1 >  <Link to={`/receipe/${meal.idMeal}`}  >{meal.strMeal} </Link></h1>
                  {
                    favlist.includes(meal.idMeal) ? (
                      <FavoriteSharpIcon className='unlike' onClick={() => { handlerdelete(meal.idMeal) }} ></FavoriteSharpIcon>
                    ) : (
                      <FavoriteBorderIcon className='like' onClick={() => { handlerfav(meal.idMeal) }}  ></FavoriteBorderIcon>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default GetList