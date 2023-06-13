import React, { useState } from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';



function Header() {
  const [random, setRandom] = useState('');
  const [check, setCheck] = useState(false);
  const [menu , setMenu] = useState(true)

  const getRandomMeal = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((result) => {
        const mealId = result.data.meals[0].idMeal;
        setRandom(mealId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRandomMealClick = (e) => {
    e.preventDefault();
    getRandomMeal();
    setCheck(!check);
  };

  return (
    <header>
      <div className='headerleft'>
        <FoodBankIcon className='logo-icon' style={{ color: 'white' }} />
        <h1>Food Bank</h1>
      </div>
      <div className='headerright'  style={{ top: menu===false ? "10%" : "-100%" }} >
        <Link to='/'>Home</Link>
        <Link to='/ingre'>Ingredients</Link>
        <Link to='/area'>Regional Delicacies</Link>
        <Link to="/fav">Favourite</Link>
      </div>
      <div className='menu'>
      <a href="" onClick={(e)=>{e.preventDefault() ; setMenu(!menu)}} ><MenuBookIcon></MenuBookIcon></a>
      </div>

      <div className='get-random'>
        <button onClick={handleRandomMealClick}>  {check ? (<CloseIcon/>) : ("Random Meal") } </button>
        {random && check && (
          <a href={`/receipe/${random}`} className="hidden-link">
            Go to Random Meal
          </a>
        )}
      </div>
    </header>
  );
}

export default Header;
