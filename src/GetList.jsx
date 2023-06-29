import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { mealcontext } from './App'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



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
                  <Link className='gotoreceipe'  >{meal.strMeal} </Link>
                  <button onClick={() => { handlerfav(meal.idMeal) }} ><FavoriteBorderIcon /></button>
                  <button  onClick={() => getRecipe(meal.idMeal)} >  <Link  to={`/receipe/${meal.idMeal}`}  > Get Receipe</Link></button>
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