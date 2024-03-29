import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './Header';
import { createContext, useState } from 'react';
import GetList from './GetList';
import First from './First';
import Ingrdients from './Ingrdients';
import Receipe from './Receipe';
import Area from './Area';
import Ingre from './Ingre';
import Fav from './Fav';
import Explore from './Explore';
import Categorie from './Categorie';

export const mealcontext = createContext(null)

function App() {

  const [select, setSelect] = useState("")
  const [search , setSearch] = useState("")
  const [description , setDescription] = useState("")
  const [favlist , setFavList] = useState([])

  return (
    <mealcontext.Provider value={{ select, setSelect, search , setSearch, description , setDescription , favlist , setFavList}}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<First/>}></Route>
          <Route path='/list/:category' element={<GetList />}></Route>
          <Route path='/search-meal' element={<Ingrdients/>}></Route>
          <Route path='/receipe/:id' element={<Receipe/>}></Route>
          <Route path='/area' element={<Area/>}></Route>
          <Route path='/ingre' element={<Ingre/>} ></Route>
          <Route path='/fav' element={<Fav/>} ></Route>
          <Route path='/explore' element={<Explore></Explore>} ></Route>
          <Route path='/category' element={<Categorie></Categorie>} ></Route>
        </Routes>
      </BrowserRouter>
    </mealcontext.Provider>

  );
}

export default App;
