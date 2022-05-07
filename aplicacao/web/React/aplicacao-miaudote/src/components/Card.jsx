/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import '../css/Card.css';

import iconBolo from '../imagens/Geral/icon-bolo.png';
import iconDog from '../imagens/Geral/especie-cachorro.png';
import iconCat from '../imagens/Geral/especie-gato.png';
import iconInfo from '../imagens/Geral/icon-info.png';


function Card(props) {

    let imagem = props.image == null ? "https://i.imgur.com/s8t0M4S.png" : props.image

    function linkTela() {
        window.location.replace('https://pederzini.github.io/miaudote/aplicacao/web/html/login/index.html')
    }

    const imagemCard = {
        
        backgroundImage: `url(${imagem})`
    }



    return (

        <div className="card" >
            <div className="botao-card">
                <button onClick={() => linkTela()}>
                    ADOTAR
                </button>
            </div>
            <div className="imagem-card" style={imagemCard}>
                <div className="favoritar">
                    <img src={props.imgFavoritar} />
                </div>
            </div> {/* fim imagem-card */}

            <div className="descricao-card">
                <div className="dados-pet">
                    <div className="icon-descricao">
                        <img src={props.especie === "Cachorro" ? iconDog : iconCat} alt="" />
                    </div>
                    <div className="texto-pet-nome">
                        {props.nome}
                    </div>
                </div>

                <div className="dados-pet">
                    <div className="icon-descricao">
                        <img src={iconBolo} alt="" />
                    </div>
                    <div className="texto-pet">
                        {props.idade} ANOS
                    </div>
                </div>

                <div className="dados-pet" id="descricao">
                    <div className="icon-descricao">
                        <img src={iconInfo} alt="" />
                    </div>
                    <div className="texto-pet">
                        {props.descricao}
                    </div>
                </div>
            </div> {/* fim descrica-card */}
        </div >/* fim card */
    )
}

export default Card;
