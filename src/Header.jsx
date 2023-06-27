import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';




function Header() {
  const [random, setRandom] = useState('');
  const [check, setCheck] = useState(false);
  const [menu, setMenu] = useState(true)

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
        <a href="#" className="brand">
          Brand
        </a>
        <div className="search">
          <form className="search-form">
            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="Search for Meal"
              autoFocus
            />
            <button type="submit" className="search-submit" disabled>
              <SearchIcon></SearchIcon>
            </button>
          </form>
        </div>
        <div className={`menu ${isMenuActive ? 'is-active' : ''}`} id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="#" className="menu-link" onClick={handleMenuLinkClick}>
                Listing
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link" onClick={handleMenuLinkClick}>
                Feature
              </a>
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
