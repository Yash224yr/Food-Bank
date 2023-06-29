import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mealcontext } from './App';
import LocalDiningIcon from '@mui/icons-material/LocalDining';



function Categorie() {
    const [categories, setCategories] = useState([]);
    const [check, setCheck] = useState(true)
    const { description, setDescription } = useContext(mealcontext)
    const [count, setCount] = useState(0)

    let Mealtext = [
        'Wanna make a delicious dish ?',
        'Search for your next meal !',
        'Discover new recipes !',
        'Cook up something amazing !',
    ]


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => (prevCount + 1) % Mealtext.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


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
                <h1>"Discover an Abundance of <span>Delicious Recipes </span> with Our Advanced Search Functionality."</h1>
                <h2>{Mealtext[count]}</h2>
                <button>Explore <LocalDiningIcon /><span></span></button>
            </div>
            <div className='text'>
                <div class="categorie-text">
                    <h1>Receipe By<span>Categories</span></h1>
                </div>
                <div className='text-line'></div>
            </div>
            <div className='categories-list'>
                {categories.map((meal, index) => (
                    <div key={index} className='category-item'>
                        <img className='imggoto' src={meal.strCategoryThumb} alt="" />
                        <h1 className='goto' >{meal.strCategory}</h1>
                        <button class="cta"  onClick={() => { getdescription(meal.strCategoryDescription) }} >
                            <span><Link to={`/list/${meal.strCategory}`}>Discover Receies </Link></span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categorie;
