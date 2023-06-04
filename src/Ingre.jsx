import React, { useEffect, useState } from 'react'
import axios from "axios"

function Ingre() {

    const[ingre , setIngre] = useState([])


    useEffect(()=>{
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then((result)=>{
            setIngre(result.data.meals)
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


  return (
        <div className='ingre-dish'>
            {
                ingre.map((meal, index)=>{
                    return(
                        <div className='ingre-list' key={index}>
                            <p>{meal.strIngredient}</p>
                            <img src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`} alt="" />
                        </div>
                    )
                })
            }
        </div>
  )
}

export default Ingre