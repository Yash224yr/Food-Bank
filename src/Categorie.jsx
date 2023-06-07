import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Categorie() {
    const [categories, setCategories] = useState([]);
    const [check, setCheck] = useState(true)


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
                        <h1 className='goto'><Link to={`/list/${meal.strCategory}`}>{meal.strCategory}</Link></h1>
                        <div className='icons'>
                            <h1><Link to={`/list/${meal.strCategory}`}>{meal.strCategory}</Link></h1>
                            <div className='iconlogo'>
                                <a href=""><InfoIcon></InfoIcon></a>
                                <FavoriteBorderIcon></FavoriteBorderIcon>
                            </div>
                        </div>
                       

                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categorie;
