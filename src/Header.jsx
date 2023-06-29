import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { mealcontext } from './App';
import logo from "./images/logo.png"




function Header() {
  const [random, setRandom] = useState('');
  const [check, setCheck] = useState(false);
  const [menu, setMenu] = useState(true)
  const {search , setSearch} = useContext(mealcontext)


  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleMenuLinkClick = () => {
    setIsMenuActive(false);
  };

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
    <header className="header" id="header">
      <nav className="navbar container">
        <img src={logo} alt="" className='brand' />
        <div className="search">
          <form className="search-form">
            <input
              type="text"
              name="search"
              className="search-input"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              placeholder="Search for Meal"
              autoFocus
            />
            <button type="submit" className="search-submit" disabled>
              <Link type='submit' to="/search-meal"  ><SearchIcon></SearchIcon></Link>
            </button>
          </form>
        </div>
        <div className={`menu ${isMenuActive ? 'is-active' : ''}`} id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <Link to="/" >Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/ingre" >Ingredients</Link>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link" onClick={handleMenuLinkClick}>
                Popular
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link" onClick={handleMenuLinkClick}>
                Support
              </a>
            </li>
          </ul>
        </div>
        <div className="burger" id="burger" onClick={handleBurgerClick}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
