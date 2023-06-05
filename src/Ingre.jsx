import React, { useEffect, useState } from 'react'
import axios from "axios"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


function Ingre() {

    const [ingre, setIngre] = useState([])
    const [input, setInput] = useState('');
    const [meal, setMeal] = useState([])



    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=Chicken")
            .then((result) => {
                setIngre(result.data.meals)
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    function getingremeal(e) {
        e.preventDefault()
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
            .then((result) => {
                console.log(result)
                setMeal(result.data.meals)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <div className='search-meal'>
            <form>
                <input
                    type='text'
                    placeholder='Search Ingredients'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit' onClick={(e) => { getingremeal(e) }}>
                    <SearchIcon />
                </button>
            </form>






            {
                meal ? (
                    <div className='area-list'>
                        {
                            meal.map((meal, index) => {
                                return (
                                    <div className='area-dish' key={index}>
                                        <img src={meal.strMealThumb} alt="" />
                                        <Link to='/receipe' onClick={() => getRecipe(meal.idMeal)}>{meal.strMeal}  </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) :
                    (
                        <div className='categories-list'>
                            {ingre.map((meal, index) => (
                                <div key={index} className='category-item'>
                                    <h1><Link to="/list">{meal.strIngredient}</Link></h1>
                                    <img src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`} alt="" />
                                </div>
                            ))}
                        </div>
                    )
            }



           



        </div>
    )
}

export default Ingre