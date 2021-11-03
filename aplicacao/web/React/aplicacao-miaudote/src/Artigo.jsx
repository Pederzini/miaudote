import './css/Artigo.css';
import React, { useState, useRef } from 'react'

//import imagens
import imgLogo from './imagens/Geral/logo-header.svg';
import imgDropdown from './imagens/Adote/dropdown.svg';
import imgPata from './imagens/Adote/icon-pata.svg';
import imgMenu from './imagens/Geral/icon-menu.svg';
import imgSair from './imagens/Geral/sair.svg';

function Artigo() {

    return (
        <div className="artigo">
            <header id="topo">
                <div class="menu">
                    <div class="logo-header">
                        <img src={imgLogo} alt=""/>

                    </div>
                    <div class="text-menu">
                        <a href="../../home-adotante/home-adotante.html">HOME</a>
                        <a href="tela-card-adocoes.html">ADOTE</a>
                        <div class="dropdown">

                            <span>
                                ARTIGOS
                                <img class="img-seta" src={imgDropdown} alt=""/>
                            </span>

                            <div class="dropdown-content">
                                <div class="text-dropdown">
                                    <img src={imgPata} alt=""/>
                                    <p>ADOTEI, E AGORA?</p>

                                </div>
                                <div class="text-dropdown">
                                    <img src={imgPata} alt=""/>
                                    <p>CONHECENDO SEU PET</p>

                                </div>
                                <div class="text-dropdown">
                                    <img src={imgPata} alt=""/>
                                    <p>PATINHAS QUE CURAM</p>

                                </div>
                                <div class="text-dropdown">
                                    <img src={imgPata} alt=""/>
                                    <p>COVID</p>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="container-btn">
                        <button class="btn-login">
                            <img src={imgMenu} alt=""/>
                            <p id="nome">JOANA</p>
                        </button>
                    </div>

                    <div class="container-sair">
                        <img onclick="logoff()" src={imgSair}/>

                    </div>
                </div>

                <svg width="1360" height="156" viewBox="0 0 1360 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M170.944 146.864C295.611 156.814 744.694 89.3772 1171.11 146.864C1234.07 155.956 1360 165.746 1360 132.178V0H1284.44H906.667H453.333H75.5555H0V108.26C0 108.26 46.2778 136.914 170.944 146.864Z"
                        fill="#FEA273" fill-opacity="0.75" />
                    <path
                        d="M170.944 137.132C295.611 146.423 744.694 83.4546 1171.11 137.132C1234.07 145.621 1360 154.763 1360 123.419V0H1284.44H906.667H453.333H75.5555H0V101.086C0 101.086 46.2778 127.841 170.944 137.132Z"
                        fill="#FEA273" />
                </svg>

            </header>
        </div>
    );
}

export default Artigo;