import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { mealcontext } from './App';
import { Link } from 'react-router-dom';


function Categorie() {
    const [categories, setCategories] = useState([]);
    const { select, setSelect } = useContext(mealcontext)
    const { description, setdescription } = useContext(mealcontext)


    useEffect(() => {
        axios
            .get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((result) => {
                setCategories(result.data.categories);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function getcategorie(meal, description) {
        setSelect(meal)
        setdescription(description)
    }



    return (
        <div className='categories'>
            <div className='text'>
                <h1 className='categorie-text'>Categories</h1>
                    <div className='text-line'></div>
            </div>
            <div className='categories-list'>
                {categories.map((meal, index) => (
                    <div key={index} className='category-item'>
                        <h1 onClick={() => { getcategorie(meal.strCategory, meal.strCategoryDescription) }}><Link to="/list">{meal.strCategory}</Link></h1>
                        <img src={meal.strCategoryThumb} alt="" />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categorie;
