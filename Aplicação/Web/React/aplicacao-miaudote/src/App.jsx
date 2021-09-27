import './css/App.css';
import background from './imagens/Geral/forma-header.svg';
import imgLogo from './imagens/Geral/logo-header.svg';
import imgHome from './imagens/Home/mulher-cachorro-gato-home.svg';
import React from 'react'

function App() {
  return (
    <div className="App">
      <div className="container">
        <img className="img-backgound" src={background} />
        <div className="content">

          {/* HEADER */}
          <div className="header">
            <img src={imgLogo} />
            <div className="header-botoes">
              <ul className="header-lista">
                <li>HOME</li>
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
                Encontre sua <br/> pata metade
              </p>
              <p className="texto-pequeno">
                OU AJUDE AS PESSOAS A <br/> ENCONTRAREM O SEU PET IDEAL
              </p>
              <button className="botao-cadastrar">Cadastre-se</button>
            </div> {/* fim content-home */}
            <img src={imgHome}/>
          </div> {/* fim container home */}

        </div> {/* fim content */}
      </div> {/* fim container */}
    </div> // fim App 
  );
}

export default App;
