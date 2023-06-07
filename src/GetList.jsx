    import React, {  useEffect, useState } from 'react'
    import axios from 'axios'
    import { Link, useParams } from 'react-router-dom'

    function GetList() {
      const [list, getlist] = useState([])
      const{category} = useParams()


      useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          .then((result) => {
            getlist(result.data.meals)
          })
          .catch((err) => {
            console.log(err)
          })
      }, [])


  


      return (
        <div className='categories'>
          <div className='area-list'>
            {
              list.map((meal, index) => {
                return (
                  <div className='area-dish' key={index}>
                    <img src={meal.strMealThumb} alt="" />
                    <Link to={`/receipe/${meal.idMeal}`}>{meal.strMeal}</Link>
                  </div>
                )
              })
            }
          </div>

        </div>
      )
    }

    export default GetList