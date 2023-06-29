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
    const [showMore, setShowMore] = useState(false);
    const [visibleItems, setVisibleItems] = useState(20);

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
                    setError('No Ingredient found. Please try a different ingredient.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLoadMore() {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 20);
    }

    return (
        <div className="search-meal">
            <div class="categorie-text">
                <h1>Receipe By<span>Ingrdient</span></h1>
            </div>

            {showCategories && (
                <div className='categories-list'>
                    {ingre.slice(0, visibleItems).map((meal, index) => (
                        <div key={index} className='category-item-ingre'>
                            <img className='imggoto' src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`} alt="" />
                            <h1 className='goto' >{meal.strIngredient}</h1>
                            <button className="cta" onClick={(e) => getingremeal(e, meal.strIngredient)}>
                                <span>Discover Recipes</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    ))}
                    {ingre.length > visibleItems && (
                        <button onClick={handleLoadMore} className="load-more-button">
                            Load More ...
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Ingre;
