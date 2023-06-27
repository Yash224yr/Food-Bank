import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Ingre() {
    const [ingre, setIngre] = useState([]);
    const [input, setInput] = useState('');
    const [meal, setMeal] = useState([]);
    const [showCategories, setShowCategories] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        axios
            .get('https://www.themealdb.com/api/json/v1/1/list.php?i=Chicken')
            .then((result) => {
                setIngre(result.data.meals);
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    function getingremeal(e, meal) {
        e.preventDefault();
        const ingredient = input.length >= 1 ? input : meal;
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then((result) => {
                console.log(result);
                if (result.data.meals) {
                    setShowCategories(false);
                    setMeal(result.data.meals);
                    setError('');
                } else {
                    setShowCategories(true);
                    setMeal([]);
                    setError('No meals found. Please try a different ingredient.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="search-meal">
            <form onSubmit={(e) => getingremeal(e)}>
                <input
                    type="text"
                    placeholder="Search Ingredients"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">
                    <SearchIcon />
                </button>
            </form>

            {error && <p className="errormsg">{error}</p>}

            {!error && (
                <div className="area-list">
                     {
                    meal.map((meal, index) => {
                        return (
                            <div className='area-dish' key={index}>
                                <img src={meal.strMealThumb} alt="" />
                                <Link className='gotoreceipe'  to={`/receipe/${meal.idMeal}`} onClick={() => getRecipe(meal.idMeal)}>{meal.strMeal} </Link>
                                <h1><Link to="/fav" ><FavoriteBorderIcon/></Link></h1>
                            </div>
                            
                        )
                    })
                }
                </div>
            )}

            {showCategories && (
                <div className="categories-list">
                    {ingre.map((meal, index) => (
                        <div key={index} className="category-item">
                            <img
                                src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`}
                                alt=""
                            />
                            <h1>
                                <Link onClick={(e) => getingremeal(e, meal.strIngredient)}>{meal.strIngredient}</Link>
                            </h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Ingre;
