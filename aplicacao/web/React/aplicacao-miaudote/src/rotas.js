import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './App';
import Artigo from './Artigo';

//BrowserRouter: da acesso para usar os recursos de rotas
//Switch: permite navegar entre as rotas
//Route : cria a rota em si

function Rotas(){
    return(
        <BrowserRouter>
            {/* <Routes> */}
               <Route exact path="/"  element={<Home/>}/> 
               <Route exact path="/artigo"  element={<Artigo/>}/>
            {/* </Routes> */}
        </BrowserRouter>
    );
}

export default Rotas;