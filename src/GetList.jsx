import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { mealcontext } from './App'



function GetList() {
  const [list, getlist] = useState([])
  const { category } = useParams()
  const { description, setDescription, favlist , setFavList } = useContext(mealcontext)




  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => {
        getlist(result.data.meals)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function handlerfav(meal){
    setFavList([...favlist, meal])
  }


console.log(favlist)

  return (
    <div className='categories'>
      {description ? (<p>{description}</p>) : ("")}
      <div className='area-list'>
        {
          list.map((meal, index) => {
            return (
              <div className='area-dish' key={index}>
                <img src={meal.strMealThumb} alt="" />
                <Link className='gotoreceipe' to={`/receipe/${meal.idMeal}`} onClick={() => getRecipe(meal.idMeal)}>{meal.strMeal} </Link>
                <button onClick={()=>{handlerfav(meal.idMeal)}} >Fav</button>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default GetList