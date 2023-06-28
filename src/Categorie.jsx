import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mealcontext } from './App';



function Categorie() {
    const [categories, setCategories] = useState([]);
    const [check, setCheck] = useState(true)
    const { description, setDescription } = useContext(mealcontext)


    useEffect(() => {
        axios
            .get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((result) => {
                console.log(result)
                setCategories(result.data.categories);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    function getdescription(meal) {
        setDescription(meal)
    }






    return (
        <div className='categories'>
            <div className='home-image'>
              <h1>Helo</h1>
            </div>
            <div className='text'>
                <h1 className='categorie-text'>Categories</h1>
                <div className='text-line'></div>
            </div>
            <div className='categories-list'>
                {categories.map((meal, index) => (
                    <div key={index} className='category-item'>
                        <img className='imggoto' src={meal.strCategoryThumb} alt="" />
                        <h1 className='goto' onClick={() => { getdescription(meal.strCategoryDescription) }}><Link to={`/list/${meal.strCategory}`}>{meal.strCategory}</Link></h1>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categorie;
