/* eslint-disable jsx-a11y/alt-text */
import './css/App.css';
import React from 'react'

// import imagens
import background from './imagens/Geral/forma-header.svg';
import imgLogo from './imagens/Geral/logo-header.svg';
import imgHome from './imagens/Home/mulher-cachorro-gato-home.svg';
import imgHeader from './imagens/Geral/forma-header-encolhido.svg';
import imgOsso from './imagens/Geral/icon-osso.svg';
import imgHLD from './imagens/Home/HLD.svg';
import imgHldAdocao from './imagens/Home/caminho-HLD-adocao.svg';
import imgAdocaoCadastro from './imagens/Home/caminho-adocao-cadastro.svg';
import imgBtnEsquerda from './imagens/Geral/icon-seta-esquerda.svg';
import imgBtnDireita from './imagens/Geral/icon-seta-direita.svg';
import imgFavoritarBranco from './imagens/Geral/icon-coracao-branco.svg';
import imgFavoritarVermelho from './imagens/Geral/icon-coracao-vermelho.svg';
import imgLocalizacao from './imagens/Geral/icon-localizacao.svg';
// import componentes
import BotaoCadastro from './components/BotaoCadastro';
import Titulo from './components/Titulo';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <img className="background-header" src={imgHeader} alt="" />
      <div className="container">
        <img className="img-backgound" src={background} />
        <div className="content">

          {/* HEADER */}
          <div className="header">
            <img src={imgLogo} />
            <div className="header-botoes">
              <ul className="header-lista">
                <li className="pagina-atual"> <img src={imgOsso} /> HOME</li>
                <li>COMO FUNCIONA</li>
                <li>ADOTE</li>
              </ul> {/* fim hedaer-lista */}
              <button className="botao-login">LOGIN</button>
            </div> {/* fim header-botoes */}
          </div> {/* fim header */}

          {/* CONTEUDO HOME */}
          <div className="container-home">
            <div className="content-home">
              <p className="texto-grande">
                Encontre sua <br /> pata metade
              </p>
              <p className="texto-pequeno">
                OU AJUDE AS PESSOAS A <br /> ENCONTRAREM O SEU PET IDEAL
              </p>
              <BotaoCadastro />
            </div> {/* fim content-home */}
            <img src={imgHome} />
          </div> {/* fim container home */}

        </div> {/* fim content */}
      </div> {/* fim container */}

      {/* COMO FUNCIONA */}
      <div className="container-como-funciona">
        <Titulo titulo="Como funciona"></Titulo>
        <div className="container-imagem">
          <img src={imgHLD} />
        </div>
      </div> {/* fim container-como-funciona */}

      {/* ANIMAIS PARA ADOÇÃO */}
      <div className="container-adocao">
        <Titulo titulo="Animais disponÍveis para adoção"></Titulo>
        <img src={imgHldAdocao} className="caminho-HLD-adocao" />
        <img src={imgAdocaoCadastro} className="caminho-adocao-cadastro" />

        {/* CONTEUDO ADOCAO */}
        <div className="conteudo-adocao">
          <img src={imgBtnEsquerda} />

          {/* CARDS ADOCAO */}
          <div className="cards-adocao">
            <Card imgFavoritar={imgFavoritarVermelho} imgLocalizacao={imgLocalizacao} />
            <Card imgFavoritar={imgFavoritarVermelho} imgLocalizacao={imgLocalizacao} />
            <Card imgFavoritar={imgFavoritarVermelho} imgLocalizacao={imgLocalizacao} />
          </div> {/* fim cards-adocao */}

          <img src={imgBtnDireita} />
        </div> {/* fim conteudo-adocao */}
      </div> {/* fim container-adocao */}

      {/* FAÇA O SEU CADASTRO */}
      <div className="container-cadastro">
        <Titulo titulo="Faça o seu cadastro"></Titulo>
      </div>

    </div> // fim App 
  );
}

export default App;
