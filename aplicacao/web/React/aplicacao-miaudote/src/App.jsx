/* eslint-disable jsx-a11y/alt-text */
import './css/App.css';
import React, { useState, useRef } from 'react'

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
import imgMulherCadastro from './imagens/Home/mulher-caixa-cachorro.svg';
import imgHomemCadastro from './imagens/Home/homem-cachorro.svg';
import imgQuemSomos from './imagens/Home/quem-somos.svg';
import imgFacebook from './imagens/Geral/icon-facebook.svg';
import imgInstagram from './imagens/Geral/icon-instagram.svg';
import imgGithub from './imagens/Geral/icon-github.svg';
import imgWspp from './imagens/Geral/icon-whatsapp-footer.svg';
import imgEmail from './imagens/Geral/icon-email-footer.svg';

// import componentes
import BotaoCadastro from './components/BotaoCadastro';
import Titulo from './components/Titulo';
import Card from './components/Card';
import Modal from './components/Modal';

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isHome, setIsHome] = useState("ativo");
  const [isComoFunciona, setIsComoFunciona] = useState("inativo");
  const [isAdote, setIsAdote] = useState("inativo");

  const homeRef = useRef(null);
  const comoFuncionaRef = useRef(null);
  const adoteRef = useRef(null);

  const imgAtual = [setIsHome, setIsComoFunciona, setIsAdote]

  function scroll(ref, value) {

    for (let index = 0; index < imgAtual.length; index++) {
      const element = imgAtual[index];

      if (value == index) {
        element("ativo")
      } else {
        element("inativo")
      }

    }

    ref.current.scrollIntoView();
  }

  function linkLogin(tela) {
    switch (tela) {
      case "login":
        window.location.replace('https://www.google.com')
        break;
      case "ong":
        window.location.replace('https://www.youtube.com')
        break
      case "adotante":
        window.location.replace('https://www.twitch.tv')
        break
      default:
        break;
    }
  }

  return (
    <div ref={homeRef} className="App">
      <img className="background-header" src={imgHeader} alt="" />
      <div className="container">
        <img className="img-backgound" src={background} />
        <div className="content">

          {/* HEADER */}
          <div className="header">
            <img src={imgLogo} />
            <div className="header-botoes">
              <ul className="header-lista">
                <li onClick={() => scroll(homeRef, 0)} className={`home ${isHome}`}> <img src={imgOsso} /> HOME</li>

                <li onClick={() => scroll(comoFuncionaRef, 1)} className={`como-funciona ${isComoFunciona}`}> <img src={imgOsso} />COMO FUNCIONA</li>

                <li onClick={() => scroll(adoteRef, 2)} className={`adote ${isAdote}`}> <img src={imgOsso} />ADOTE</li>
              </ul> {/* fim hedaer-lista */}
              <button onClick={() => linkLogin("login")} className="botao-login">LOGIN</button>
            </div> {/* fim header-botoes */}
          </div> {/* fim header */}

          {/* MODAL */}
          {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null}

          {/* CONTEUDO HOME */}
          <div className="container-home">
            <div className="content-home">
              <p className="texto-grande">
                Encontre sua <br /> pata metade
              </p>
              <p className="texto-pequeno">
                OU AJUDE AS PESSOAS A <br /> ENCONTRAREM O SEU PET IDEAL
              </p>
              <BotaoCadastro onOpen={() => setIsModalVisible(true)} />
            </div> {/* fim content-home */}
            <img src={imgHome} />
          </div> {/* fim container home */}

        </div> {/* fim content */}
      </div> {/* fim container */}

      {/* COMO FUNCIONA */}
      <div ref={comoFuncionaRef} className="container-como-funciona">
        <Titulo titulo="Como funciona"></Titulo>
        <div className="container-imagem">
          <img src={imgHLD} />
        </div>
      </div> {/* fim container-como-funciona */}

      {/* ANIMAIS PARA ADOÇÃO */}
      <div ref={adoteRef} className="container-adocao">
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
        <div className="conteudo-cadastro">

          <div className="content-doar">
            <div className="img-doar">
              <img src={imgMulherCadastro} alt="" />
            </div>
            <div className="texto-cadastro">
              <p>Quero doar</p>
            </div>
            <BotaoCadastro onOpen={() => linkLogin("adotante")}/>
          </div> {/* fim content-doar */}

          <div className="content-adotar">
            <div className="img-adotar">
              <img src={imgHomemCadastro} alt="" />
            </div>

            <div className="texto-cadastro">
              <p>Quero adotar</p>
            </div>
            <BotaoCadastro onOpen={() => linkLogin("ong")}/>
          </div>
        </div> {/* fim conteudo-cadastro */}
      </div> {/* fim container-cadastro */}

      {/* QUEM SOMOS */}
      <div className="container-quem-somos">
        <Titulo titulo="Quem somos"></Titulo>
        <div className="img-quem-somos">
          <img src={imgQuemSomos} alt="" />
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="container-footer">

          <div className="logo-footer">
            <img src={imgLogo} alt="" />
            <p>Copyright© 2021</p>
          </div>

          <div className="content-redes-sociais">
            <div className="redes-sociais">
              <img src={imgFacebook} alt="" />
              <img src={imgInstagram} alt="" />
              <img src={imgGithub} alt="" />
            </div>
            <p>Desenvolvido por alunos BandTec</p>
          </div> {/* fim content-redes-sociais */}

          <div className="content-contato-footer">
            <div className="titulo-contato">
              <p>Contato</p>
            </div>
            <div className="email">
              <p>emai@mail.com</p> <img src={imgEmail} alt="" />
            </div>
            <div className="telefone">
              <p>(11)99555-5555</p> <img src={imgWspp} alt="" />
            </div>
          </div> {/* fim content-contato-footer */}

        </div> {/* fim container-footer */}
      </footer>


    </div> // fim App
  );
}

export default App;
