import React, { useContext, useEffect, useState } from 'react'
import { mealcontext } from './App'
import axios from 'axios'
import { Link } from 'react-router-dom'

function GetList() {
  const { select, setSelect } = useContext(mealcontext)
  const [list, getlist] = useState([])
  const { description, setdescription } = useContext(mealcontext)
  const { receipe, setReceipe } = useContext(mealcontext)



  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${select}`)
      .then((result) => {
        getlist(result.data.meals)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function getReceipe(meal) {
    setReceipe(meal)
  }


  return (
    <div className='categories'>
      <p>{description}</p>
      <div className='area-list'>
        {
          list.map((meal, index) => {
            return (
              <div className='area-dish' key={index}>
                <img src={meal.strMealThumb} alt="" />
                <Link to="/receipe" onClick={()=>{getReceipe(meal.idMeal)}}>{meal.strMeal}</Link>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default GetList