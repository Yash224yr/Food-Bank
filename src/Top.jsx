import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

function Top() {
    const [ingre, setIngre] = useState([])

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


    const randomIngredients = ingre.sort(() => 0.5 - Math.random()).slice(0, 10);

    return (
        <div className='top-ingre'>
            <div className='text'>
                <h1 className='categorie-text'>Ingredients</h1>
                <div className='text-line'></div>
            </div>
            <div className='top-ingre-meals'>
                {randomIngredients.map((meal, index) => (
                    <div className='category-item' key={index}>
                        <h1><Link to="/list">{meal.strIngredient}</Link></h1>
                        <img src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`} alt="" />
                    </div>
                ))}
            </div>
            <Link className='top-ingre-search' to="/ingre" >... Get More Ingredients <SearchIcon /> </Link>
        </div>
    )
}

export default Top;
