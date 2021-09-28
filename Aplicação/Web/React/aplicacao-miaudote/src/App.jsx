/* eslint-disable jsx-a11y/alt-text */
import './css/App.css';
import background from './imagens/Geral/forma-header.svg';
import imgLogo from './imagens/Geral/logo-header.svg';
import imgHome from './imagens/Home/mulher-cachorro-gato-home.svg';
import imgHeader from './imagens/Geral/forma-header-encolhido.svg'
import BotaoCadastro from './components/BotaoCadastro';
import Titulo from './components/Titulo';
import imgOsso from './imagens/Geral/icon-osso.svg'
import React from 'react'

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

      <div className="container-como-funciona">

        <Titulo titulo="Como funciona"></Titulo>

      </div>

    </div> // fim App 
  );
}

export default App;
