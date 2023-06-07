import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


function Area() {

    const [area, setArea] = useState([])
    const [list, setlist] = useState("")
    const [arealist, setarealist] = useState([])


    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            .then((result) => {
                setArea(result.data.meals)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    function submithandler() {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`)
            .then((result) => {
                setarealist(result.data.meals)
            })
            .catch((err) => {
                console.log(err)
            })

    }



    function submitchange(e) {
        setlist(e.target.value)
    }



    return (
        <div className='area-container'>
            <div className='select-area'>
                <select onChange={(e) => { submitchange(e) }}>
                    <option disabled selected > Select the Region</option>
                    {area
                        ? area.map((meal, index) => (
                            <option key={index} value={meal.strArea}>
                                {meal.strArea}
                            </option>
                        ))
                        : ''}
                </select>
                <button onClick={() => { submithandler() }} > <SearchIcon></SearchIcon> </button>
            </div>
            <div className='area-list'>
                {
                    arealist.map((meal, index) => {
                        return (
                            <div className='area-dish' key={index}>
                                <img src={meal.strMealThumb} alt="" />
                                <Link  to={`/receipe/${meal.idMeal}`} onClick={() => getRecipe(meal.idMeal)}>{meal.strMeal} </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Area