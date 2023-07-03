import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { mealcontext } from './App';
import logo from "./images/logo.png"
import { useNavigate } from 'react-router-dom';




function Header() {
  const { search, setSearch } = useContext(mealcontext)


  const [isMenuActive, setIsMenuActive] = useState(false);

  const navigate = useNavigate()

  const handleBurgerClick = () => {
    setIsMenuActive(!isMenuActive);
  };



  function handlergetData(e){
    e.preventDefault()
    navigate("/search-meal")
    console.log("Hello")
  }



 

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <Link to="/" >
          <img src={logo} alt="" className='brand' />
        </Link>
        <div className="search">
          <form className="search-form" onSubmit={handlergetData}>
            <input
              type="text"
              name="search"
              className="search-input"
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              placeholder="Search for Meal"
              autoFocus
            />
            <button type="submit" className="search-submit">
              <Link to="/search-meal"  ><SearchIcon></SearchIcon></Link>
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
              <Link to="/area" >Regional</Link>
            </li>
            <li className="menu-item">
              <Link to="/fav">Favorite</Link>
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
