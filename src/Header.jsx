import React, { useContext, useState } from 'react'
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Link } from 'react-router-dom';

function Header() {

 

  return (
    <header>
        <div className='headerleft'> 
        < FoodBankIcon className='logo-icon' style={{ color: 'white' }}/>
        <h1>Food Bank</h1>
        </div>
        <div className='headerright'>
            <Link to="/area">Regional Delicacies</Link>
            <Link to="/" >Home</Link>
        </div>
        <div className='get-random'>
         <button> <Link to="/random" >Random Meal</Link></button>
        </div>
    </header>
  )
}

export default Header