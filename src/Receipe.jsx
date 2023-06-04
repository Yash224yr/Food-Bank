import React, { useContext, useEffect, useState } from 'react';
import { mealcontext } from './App';
import axios from 'axios';


function Recipe() {
    const { receipe, setReceipe } = useContext(mealcontext);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receipe}`)
            .then((result) => {
                setDetail(result.data.meals);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(detail);

    return (
        <div className='recipe-list'>
            {detail.map((meal, index) => {
                return (
                    <div className='recipe-detail' key={index}>
                        <div className='recipe-ingredients'>
                            <div className='image'>
                                <img src={meal.strMealThumb} alt='' />
                            </div>
                            <div className='detail'>
                                <h1>{meal.strMeal}</h1>
                                <h3>{meal.strCategory}</h3>
                                <h3>{meal.strArea} Dish</h3>
                                <a href={meal.strSource} target='_blank' rel='noopener noreferrer'>
                                    Meal Source
                                </a>
                                <a href={meal.strYoutube} target='_blank' rel='noopener noreferrer'>
                                    YouTube
                                </a>
                            </div>
                            <div className='ingredients'>
                                <h2>Ingredients:</h2>
                                <ul>
                                    {Object.entries(meal).map(([key, value]) => {
                                        if (key.includes('Ingredient') && value) {
                                            return <li key={key}>{value}</li>;
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='recipe-instruction'>
                            <h2>Instructions:</h2>
                            <p>{meal.strInstructions}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Recipe;
