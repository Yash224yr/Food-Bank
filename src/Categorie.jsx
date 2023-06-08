import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { mealcontext } from './App';


function Categorie() {
    const [categories, setCategories] = useState([]);
    const [check, setCheck] = useState(true)
    const {description , setDescription} = useContext(mealcontext)


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


    function getdescription(meal){
        setDescription(meal)
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
                        <img className='imggoto' src={meal.strCategoryThumb} alt="" />
                        <h1 className='goto'>{meal.strCategory}</h1>
                        <div className='icons'>
                            <h1><Link>{meal.strCategory}</Link></h1>
                            <div className='iconlogo'>
                                <FavoriteBorderIcon></FavoriteBorderIcon>
                            </div>
                            <button onClick={()=>{getdescription(meal.strCategoryDescription)}} ><Link to={`/list/${meal.strCategory}`}>Explore</Link></button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categorie;
