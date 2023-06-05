import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home';
import Header from './Header';
import { createContext, useState } from 'react';
import GetList from './GetList';
import First from './First';
import Ingrdients from './Ingrdients';
import Receipe from './Receipe';
import Random from './Random';
import Area from './Area';
import Ingre from './Ingre';
export const mealcontext = createContext(null)

function App() {

  const [select, setSelect] = useState("")
  const [search , setSearch] = useState("")
  const [description , setdescription] = useState("")
  const [receipe, setReceipe] = useState("")

  return (
    <mealcontext.Provider value={{ select, setSelect, search , setSearch, description, setdescription , receipe, setReceipe}}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<First/>}></Route>
          <Route path='/list' element={<GetList />}></Route>
          <Route path='/search-meal' element={<Ingrdients/>}></Route>
          <Route path='/receipe' element={<Receipe/>}></Route>
          <Route path='/random' element={<Random/>} ></Route>
          <Route path='/area' element={<Area/>}></Route>
          <Route path='/ingre' element={<Ingre/>} ></Route>
        </Routes>
      </BrowserRouter>
    </mealcontext.Provider>

  );
}

export default App;
