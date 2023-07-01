import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { mealcontext } from './App';

function Ingre() {
    const [ingre, setIngre] = useState([]);
    const [meal, setMeal] = useState([]);
    const [error, setError] = useState('');
  const {favlist, setFavList } = useContext(mealcontext)
    

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
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
            .then((result) => {
                console.log(result);
                if (result.data.meals) {
                    setMeal(result.data.meals);
                    setError('');
                } else {
                    setMeal([]);
                    setError('No meals found. Please try a different ingredient.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handlerfav(meal) {
        if (!favlist.includes(meal)) {
            setFavList([...favlist, meal])
        }
    }

    function handlerdelete(mealId) {
        setFavList(favlist.filter((meal) => meal !== mealId));
    }




    return (
        <div className="search-meal">
            {meal.length > 0 ? (

                <div className='dish-list'>
                    {
                        meal.map((meal, index) => {
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
            ) : (
                <div className="categories-list">
                    {ingre.map((meal, index) => (
                        <div key={index} className="category-item">
                            <img
                                className="imggoto"
                                src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`}
                                alt=""
                            />
                            <h1 className="goto">{meal.strIngredient}</h1>
                            <button className="cta">
                                <span>
                                    <Link onClick={(e) => getingremeal(e, meal.strIngredient)}>
                                        Recipes
                                    </Link>
                                </span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Ingre;
