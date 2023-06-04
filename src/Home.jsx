import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mealcontext } from './App'
import SearchIcon from '@mui/icons-material/Search';

function Home() {

    const {search , setSearch} = useContext(mealcontext)
    const [count , setCount] = useState(0)

    const text = [
    'Wanna make a delicious dish ?',
    'Search for your next meal !',
    'Discover new recipes !',
    'Cook up something amazing !',
    ]

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => (prevCount + 1) % text.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
      

  function getMeal(e){
    e.preventDefault()
  }


  return (
    <div className='home'>
        <div className='tag-line'>
          <h1>"Indulge in a World of Tantalizing Recipes and Culinary Inspiration"</h1>
          <h3>{text[count]}</h3>
        </div>
        <div className='meal-link'>
          <form onSubmit={(e)=>getMeal(e)}>
            <input type="text" placeholder='Search Your Meal' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <Link type='submit' to="/search-meal">  <SearchIcon/></Link>
          </form>
        </div>
    </div>
    
  )
}

export default Home