/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import '../css/Card.css';

export default props =>
<div className="card">
    <div className="botao-card">
        <button>
            ADOTAR
        </button>
    </div>
    <div className="imagem-card">
        <div className="favoritar">
            <img src={props.imgFavoritar} />
        </div>
    </div> {/* fim imagem-card */}

    <div className="descricao-card">
        <div className="descricao-esquerda">
            <p className="nome-pet">
                thor
            </p>
            <p className="sobre-pet">
                Descrição sobre o animal
            </p>
        </div>
        <div className="descricao-direita">
            <p className="idade-pet">
                3 anos
            </p>
            <div className="distancia-pet">
                <img src={props.imgLocalizacao} />
                <p>3km</p>
            </div>
        </div>
    </div> {/* fim descrica-card */}
</div>/* fim card */ 