/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import '../css/App.css';

export default ({ onOpen = () => {}, props}) => 
<button onClick={onOpen} className="botao-cadastrar">Cadastre-se</button>