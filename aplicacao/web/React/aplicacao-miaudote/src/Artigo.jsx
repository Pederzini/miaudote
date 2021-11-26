/* eslint-disable jsx-a11y/alt-text */
import './css/Artigo.css';
import React from 'react'

//import imagens
import imgLogo from './imagens/Geral/logo-header.svg';
import imgDropdown from './imagens/Adote/dropdown.svg';
import imgPata from './imagens/Adote/icon-pata.svg';
import imgMenu from './imagens/Geral/icon-menu.svg';
import imgSair from './imagens/Geral/sair.svg';
import imgPlaceholder from './imagens/Geral/placeholder-imagem-pet.svg';
import imgArtigo1 from './imagens/Artigos/artigo-1.png';
import imgPataLaranja from './imagens/Artigos/img-pata-laranja.svg';

import imgFacebook from './imagens/Geral/icon-facebook.svg';
import imgInstagram from './imagens/Geral/icon-instagram.svg';
import imgGithub from './imagens/Geral/icon-github.svg';
import imgWspp from './imagens/Geral/icon-whatsapp-footer.svg';
import imgEmail from './imagens/Geral/icon-email-footer.svg';


// import componentes
import Titulo from './components/Titulo';

function Artigo() {

    return (
        <div className="artigo">

            <header id="topo">
                <div className="menu">
                    <div className="logo-header">
                        <img src={imgLogo} alt="" />
                    </div>

                    <div className="text-menu">
                        <a href="../../home-adotante/home-adotante.html">HOME</a>
                        <a href="tela-card-adocoes.html">ADOTE</a>
                        <div className="dropdown">
                            <span>
                                ARTIGOS
                                <img className="img-seta" src={imgDropdown} alt="" />
                            </span>

                            <div className="dropdown-content">
                                <div className="text-dropdown">
                                    <img src={imgPata} alt="" />
                                    <p>ADOTEI, E AGORA?</p>

                                </div>
                                <div className="text-dropdown">
                                    <img src={imgPata} alt="" />
                                    <p>CONHECENDO SEU PET</p>

                                </div>
                                <div className="text-dropdown">
                                    <img src={imgPata} alt="" />
                                    <p>PATINHAS QUE CURAM</p>

                                </div>
                                <div className="text-dropdown">
                                    <img src={imgPata} alt="" />
                                    <p>COVID</p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-btn">
                        <button className="btn-login">
                            <img src={imgMenu} alt="" />
                            <p id="nome">JOANA</p>
                        </button>
                    </div>

                    <div className="container-sair">
                        <img src={imgSair} />
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

            <div className="container-header">
            </div>

            <div className="box-titulo">
                <Titulo className="titulo" titulo="Adotei, e agora?" />
            </div>

            <div className="container-artigo">
                <div className="div-esquerda-artigo">
                    <div className="div-imagem">
                        <img src={imgArtigo1} alt="" />
                    </div>
                    <div className="div-artigos">
                        <div className="artigos-relacionados">
                            ARTIGOS RELACIONADOS
                        </div>
                        <div className="artigo-link">
                            <img src={imgPataLaranja} alt="" />
                            <u>Adotei, e agora?</u>
                        </div>
                        <div className="artigo-link">
                            <img src={imgPata} alt="" />
                            <u>conhecendo seu pet</u>
                        </div>
                        <div className="artigo-link">
                            <img src={imgPata} alt="" />
                            <u>Patinhas que curam</u>
                        </div>
                        <div className="artigo-link">
                            <img src={imgPata} alt="" />
                            <u>COVID</u>
                        </div>

                    </div>

                </div>

                <div className="texto">
                    <p>
                    Antes de qualquer coisa, se você está lendo isso e adotou um peludo, PARABÉNS! Resgatar um animal abandonado é um lindo ato de compaixão que deve ser reconhecido e parabenizado, então, mais uma vez, parabéns! Se você está nessa situação e chegou até esse post, é porque se importa com seu novo amigo e quer saber quais são os primeiros passos que você deve dar nessa nova jornada, certo? Pra te ajudarmos, vamos dar algumas 4 dicas importantes que nem todo mundo sabe sobre pet resgatados!
                    </p>
                    <p>
                        Fonte do artigo: [Fonte]
                    </p>
                </div>
            </div>

            <a href="#topo" >
                <div class="container-gato">
                    <svg class="svg-gato" width="180" height="177" viewBox="0 0 180 177" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_1949:4093)">
                            <circle cx="54" cy="120" r="50" fill="white" />
                        </g>
                        <mask id="mask0_1949:4093" className="mascara" maskUnits="userSpaceOnUse" x="4" y="70" width="100"
                            height="100">
                            <circle cx="54" cy="120" r="49.5875" fill="white" stroke="black" stroke-width="0.825" />
                        </mask>
                        <g mask="url(#mask0_1949:4093)">
                            <path
                                d="M104.028 136.693C102.18 129.869 96.4314 124.407 90.2549 120.037C86.5325 117.41 82.5757 115.029 78.8119 112.451C82.2448 110.328 85.8569 108.438 89.6069 106.793C90.7237 106.302 89.7448 104.829 88.6281 105.308C84.6437 107.051 80.8385 109.076 77.2264 111.347C75.9304 110.426 74.662 109.469 73.4488 108.45C76.3992 105.504 79.5563 102.73 82.879 100.128C83.8165 99.4038 82.4516 98.1887 81.5141 98.9128C78.1777 101.515 75.0205 104.314 72.0701 107.259C71.9598 107.149 71.8357 107.051 71.7254 106.94C70.8017 106.093 70.5536 105.59 68.8164 104.375C69.0646 99.3056 69.0784 94.2363 68.8302 89.167C64.0462 93.5121 59.9515 98.4464 56.7116 103.798C56.491 104.166 56.2566 104.559 55.8568 104.792C55.2226 105.173 54.3679 105.05 53.6096 104.94C47.5847 104.044 41.229 105.001 35.866 107.615L22.4376 90.5417C22.6444 97.3908 24.5194 104.093 25.8154 110.856C20.6729 113.519 17.4468 118.662 17.047 123.928C13.1039 123.155 9.14711 122.381 5.20409 121.596C3.99085 121.363 3.48074 123.02 4.69398 123.253C8.80245 124.063 12.9109 124.873 17.0194 125.671C17.0745 126.763 17.2538 127.856 17.5571 128.924C14.3447 130.433 11.0773 131.882 7.78222 133.257C6.6517 133.723 7.63057 135.208 8.76109 134.742C11.9321 133.416 15.0617 132.029 18.1637 130.581C18.1637 130.581 18.1637 130.581 18.1637 130.593C18.7703 131.943 19.5975 133.195 20.6177 134.324C18.6738 136.792 16.7299 139.271 14.7859 141.738C14.069 142.646 15.751 143.506 16.4541 142.61C18.2878 140.29 20.1076 137.958 21.9413 135.638C26.2979 139.529 32.9156 141.505 38.968 140.241C38.513 151.423 41.8356 162.715 48.3982 172.252C45.241 173.823 42.07 175.628 40.1812 178.365C38.2924 181.102 38.0994 185.018 40.6362 187.301C43.6969 190.038 48.8256 189.252 52.934 188.013C68.0168 183.471 81.7622 175.444 92.447 164.924C100.305 157.179 106.785 146.832 104.028 136.693Z"
                                fill="#434343" />
                            <path
                                d="M30.7374 121.706C30.5444 121.362 30.2962 121.141 29.9929 120.994C28.7934 120.135 26.7668 120.368 26.0499 121.73V121.743C25.8982 121.964 25.8017 122.221 25.7879 122.504C25.719 123.842 27.2355 124.725 28.6004 124.492C29.9102 124.271 31.4405 122.958 30.7374 121.706Z"
                                fill="#FEFEF8" />
                            <path
                                d="M58.9452 115.998C58.4076 115.531 57.6493 115.458 56.8772 115.58C56.7394 115.556 56.5739 115.556 56.3947 115.617C55.9673 115.74 55.5123 115.924 55.1263 116.157C55.0574 116.194 54.9884 116.231 54.9195 116.256C54.7679 116.341 54.6576 116.44 54.5886 116.55C54.175 116.955 53.9544 117.458 54.1061 118.121C54.4783 119.606 56.4085 119.459 57.6079 118.956C58.7798 118.465 60.1861 117.078 58.9452 115.998ZM56.2155 117.569C56.4361 117.471 56.6566 117.385 56.891 117.336C56.8634 117.36 56.8359 117.373 56.8221 117.373C56.6429 117.471 56.4361 117.532 56.2155 117.569Z"
                                fill="#FEFEF8" />
                            <path
                                d="M64.9009 124.357C64.6114 123.903 63.8118 123.645 63.3017 123.989C60.4616 125.83 56.7943 125.989 53.4855 125.192C50.4248 124.443 47.695 122.958 45.0755 121.387C45.6546 120.834 46.0957 120.196 46.4266 119.447C46.7299 118.772 45.9717 118.171 45.2961 118.122C42.9523 117.987 40.5672 118.895 39.1058 120.54C38.4716 121.252 38.8577 122.258 39.933 122.319C40.2777 122.332 40.6362 122.356 40.9808 122.369C39.3264 126.628 35.5764 130.224 30.82 131.869C30.2271 132.078 29.8273 132.569 30.0065 133.158C30.1582 133.661 30.8613 134.091 31.4542 133.882C37.024 131.955 41.4496 127.843 43.297 122.81C46.3853 124.688 49.6252 126.505 53.2925 127.303C57.0425 128.125 61.2888 127.867 64.5011 125.793C64.9837 125.462 65.2456 124.885 64.9009 124.357Z"
                                fill="#FEFEF8" />
                        </g>
                        <path
                            d="M69.7352 88.7114V71.3306C7.71545 50.9624 18.131 13.7566 60.74 5.06614C103.349 -3.62428 183.675 -1.40732 179.201 42.2285C176.549 68.0824 119.761 78.1199 91.9866 74.0463L69.7352 88.7114Z"
                            fill="white" stroke="#C8C8C8" />
                        <path
                            d="M68.2668 32.9388L67.1626 31.1516C66.9425 30.8025 66.5821 30.628 66.0812 30.628C65.3071 30.628 64.6317 30.4572 64.055 30.1157C63.4782 29.7742 63.0305 29.2961 62.7117 28.6814C62.393 28.0592 62.2336 27.3306 62.2336 26.4958C62.2336 25.6535 62.393 24.9249 62.7117 24.3102C63.0305 23.6955 63.4782 23.2212 64.055 22.8873C64.6317 22.5458 65.3109 22.3751 66.0926 22.3751C66.8742 22.3751 67.5534 22.5458 68.1302 22.8873C68.707 23.2212 69.1547 23.6955 69.4734 24.3102C69.7922 24.9249 69.9515 25.6497 69.9515 26.4845C69.9515 27.3951 69.7618 28.1768 69.3824 28.8294C69.0105 29.4821 68.4945 29.9602 67.8342 30.2637C68.1606 30.37 68.4413 30.6242 68.6766 31.0264L69.5076 32.3469L68.2668 32.9388ZM66.0926 29.3758C66.8287 29.3758 67.4017 29.1216 67.8115 28.6131C68.2213 28.1047 68.4262 27.3989 68.4262 26.4958C68.4262 25.5852 68.2213 24.8794 67.8115 24.3785C67.4093 23.8777 66.8363 23.6272 66.0926 23.6272C65.3565 23.6272 64.7835 23.8777 64.3737 24.3785C63.9639 24.8794 63.759 25.5852 63.759 26.4958C63.759 27.3989 63.9639 28.1047 64.3737 28.6131C64.7835 29.1216 65.3565 29.3758 66.0926 29.3758ZM74.8823 30.628C73.7819 30.628 72.9395 30.3434 72.3552 29.7742C71.7784 29.1975 71.4901 28.3475 71.4901 27.2244V22.4889H72.9471V27.213C72.9471 27.9339 73.1103 28.4765 73.4366 28.8408C73.7705 29.1975 74.2524 29.3758 74.8823 29.3758C76.1648 29.3758 76.8061 28.6549 76.8061 27.213V22.4889H78.2518V27.2244C78.2518 28.3475 77.9672 29.1975 77.398 29.7742C76.8288 30.3434 75.9903 30.628 74.8823 30.628ZM80.0649 30.5142V22.4889H85.4037V23.65H81.4651V25.8584H85.1533V27.0195H81.4651V29.3531H85.4037V30.5142H80.0649ZM86.9709 30.5142V22.4889H90.4542C91.3346 22.4889 92.0138 22.7014 92.4919 23.1264C92.97 23.5438 93.209 24.1319 93.209 24.8908C93.209 25.4903 93.0534 25.9874 92.7423 26.382C92.4312 26.769 91.9834 27.0309 91.3991 27.1675C91.7861 27.2889 92.1048 27.5811 92.3553 28.044L93.6985 30.5142H92.0934L90.7047 27.9529C90.5681 27.7025 90.4049 27.5317 90.2152 27.4407C90.0331 27.3496 89.7978 27.3041 89.5094 27.3041H88.428V30.5142H86.9709ZM88.428 26.2226H90.2038C91.2663 26.2226 91.7975 25.7901 91.7975 24.9249C91.7975 24.0674 91.2663 23.6386 90.2038 23.6386H88.428V26.2226ZM100.837 30.628C100.207 30.628 99.6225 30.5483 99.0837 30.3889C98.5449 30.222 98.0896 29.9981 97.7177 29.7173L98.1617 28.5676C98.5335 28.8332 98.9395 29.0381 99.3797 29.1823C99.8274 29.3265 100.313 29.3986 100.837 29.3986C101.436 29.3986 101.873 29.2999 102.146 29.1026C102.419 28.8977 102.556 28.6359 102.556 28.3172C102.556 28.0516 102.457 27.8429 102.26 27.6911C102.07 27.5393 101.74 27.4141 101.269 27.3154L100.017 27.0536C98.5904 26.7501 97.8771 26.0177 97.8771 24.8566C97.8771 24.3558 98.0099 23.9194 98.2755 23.5476C98.5411 23.1757 98.9092 22.8873 99.3797 22.6824C99.8502 22.4775 100.393 22.3751 101.007 22.3751C101.554 22.3751 102.066 22.4586 102.544 22.6255C103.022 22.7849 103.421 23.0125 103.739 23.3085L103.296 24.4013C102.666 23.8701 101.899 23.6045 100.996 23.6045C100.472 23.6045 100.063 23.7145 99.7667 23.9346C99.4707 24.1547 99.3228 24.443 99.3228 24.7997C99.3228 25.0729 99.4138 25.293 99.596 25.46C99.7781 25.6193 100.089 25.7445 100.529 25.8356L101.77 26.0974C102.521 26.2568 103.079 26.5072 103.444 26.8487C103.815 27.1902 104.001 27.6456 104.001 28.2147C104.001 28.6928 103.872 29.114 103.614 29.4783C103.356 29.8425 102.988 30.1271 102.51 30.332C102.04 30.5293 101.482 30.628 100.837 30.628ZM108.701 30.628C107.601 30.628 106.758 30.3434 106.174 29.7742C105.597 29.1975 105.309 28.3475 105.309 27.2244V22.4889H106.766V27.213C106.766 27.9339 106.929 28.4765 107.255 28.8408C107.589 29.1975 108.071 29.3758 108.701 29.3758C109.984 29.3758 110.625 28.6549 110.625 27.213V22.4889H112.07V27.2244C112.07 28.3475 111.786 29.1975 111.217 29.7742C110.648 30.3434 109.809 30.628 108.701 30.628ZM113.884 30.5142V22.4889H117.39C118.232 22.4889 118.885 22.6748 119.348 23.0467C119.811 23.411 120.042 23.9194 120.042 24.5721C120.042 25.0046 119.932 25.3765 119.712 25.6876C119.492 25.9988 119.188 26.2264 118.801 26.3706C119.257 26.4996 119.609 26.7273 119.86 27.0536C120.118 27.3724 120.247 27.7784 120.247 28.2716C120.247 28.985 120.004 29.539 119.518 29.9336C119.04 30.3206 118.372 30.5142 117.515 30.5142H113.884ZM115.284 25.8925H117.139C118.133 25.8925 118.63 25.5093 118.63 24.7428C118.63 23.9763 118.133 23.5931 117.139 23.5931H115.284V25.8925ZM115.284 29.41H117.333C118.335 29.41 118.835 29.0078 118.835 28.2033C118.835 27.3989 118.335 26.9967 117.333 26.9967H115.284V29.41ZM121.835 30.5142V22.4889H123.292V30.5142H121.835ZM125.15 30.5142V22.4889H128.633C129.514 22.4889 130.193 22.7014 130.671 23.1264C131.149 23.5438 131.388 24.1319 131.388 24.8908C131.388 25.4903 131.233 25.9874 130.921 26.382C130.61 26.769 130.162 27.0309 129.578 27.1675C129.965 27.2889 130.284 27.5811 130.534 28.044L131.878 30.5142H130.273L128.884 27.9529C128.747 27.7025 128.584 27.5317 128.394 27.4407C128.212 27.3496 127.977 27.3041 127.689 27.3041H126.607V30.5142H125.15ZM126.607 26.2226H128.383C129.445 26.2226 129.977 25.7901 129.977 24.9249C129.977 24.0674 129.445 23.6386 128.383 23.6386H126.607V26.2226ZM134.274 28.135V27.6797C134.274 27.323 134.339 26.9929 134.468 26.6894C134.604 26.3858 134.832 26.0557 135.151 25.699C135.394 25.4334 135.561 25.2057 135.652 25.016C135.75 24.8263 135.8 24.6252 135.8 24.4127C135.8 24.1623 135.709 23.9649 135.526 23.8208C135.344 23.6766 135.086 23.6045 134.752 23.6045C134.009 23.6045 133.322 23.8777 132.692 24.4241L132.214 23.3313C132.533 23.0429 132.927 22.8114 133.398 22.6369C133.876 22.4623 134.358 22.3751 134.843 22.3751C135.322 22.3751 135.739 22.4548 136.096 22.6141C136.46 22.7735 136.741 22.9936 136.938 23.2744C137.143 23.5551 137.245 23.8853 137.245 24.2647C137.245 24.6138 137.166 24.9401 137.006 25.2437C136.855 25.5472 136.581 25.8773 136.187 26.234C135.83 26.5603 135.583 26.8449 135.447 27.0878C135.31 27.3306 135.223 27.5735 135.185 27.8163L135.139 28.135H134.274ZM133.91 30.5142V28.9319H135.504V30.5142H133.91ZM58.3602 46.628C57.5254 46.628 56.8083 46.461 56.2088 46.1271C55.6168 45.7856 55.1615 45.3075 54.8428 44.6928C54.524 44.0705 54.3647 43.3382 54.3647 42.4958C54.3647 41.6535 54.524 40.9249 54.8428 40.3102C55.1615 39.6955 55.6168 39.2212 56.2088 38.8873C56.8083 38.5458 57.5254 38.3751 58.3602 38.3751C58.899 38.3751 59.4075 38.4586 59.8856 38.6255C60.3713 38.7925 60.7697 39.0315 61.0808 39.3427L60.6027 40.5038C60.2612 40.2154 59.9122 40.0067 59.5555 39.8777C59.1988 39.7411 58.8156 39.6728 58.4058 39.6728C57.5937 39.6728 56.9753 39.9194 56.5503 40.4127C56.1253 40.8984 55.9128 41.5928 55.9128 42.4958C55.9128 43.3989 56.1253 44.0971 56.5503 44.5904C56.9753 45.0837 57.5937 45.3303 58.4058 45.3303C58.8156 45.3303 59.1988 45.2658 59.5555 45.1368C59.9122 45.0002 60.2612 44.7877 60.6027 44.4993L61.0808 45.6604C60.7697 45.964 60.3713 46.203 59.8856 46.3776C59.4075 46.5445 58.899 46.628 58.3602 46.628ZM62.4663 46.5142V38.4889H63.9234V45.2734H67.771V46.5142H62.4663ZM68.9722 46.5142V38.4889H70.4292V46.5142H68.9722ZM78.0589 48.9388L76.9547 47.1516C76.7346 46.8025 76.3742 46.628 75.8733 46.628C75.0992 46.628 74.4238 46.4572 73.8471 46.1157C73.2703 45.7742 72.8226 45.2961 72.5038 44.6814C72.1851 44.0592 72.0257 43.3306 72.0257 42.4958C72.0257 41.6535 72.1851 40.9249 72.5038 40.3102C72.8226 39.6955 73.2703 39.2212 73.8471 38.8873C74.4238 38.5458 75.103 38.3751 75.8847 38.3751C76.6663 38.3751 77.3456 38.5458 77.9223 38.8873C78.4991 39.2212 78.9468 39.6955 79.2655 40.3102C79.5843 40.9249 79.7436 41.6497 79.7436 42.4845C79.7436 43.3951 79.5539 44.1768 79.1745 44.8294C78.8026 45.4821 78.2866 45.9602 77.6263 46.2637C77.9527 46.37 78.2335 46.6242 78.4687 47.0264L79.2997 48.3469L78.0589 48.9388ZM75.8847 45.3758C76.6208 45.3758 77.1938 45.1216 77.6036 44.6131C78.0134 44.1047 78.2183 43.3989 78.2183 42.4958C78.2183 41.5852 78.0134 40.8794 77.6036 40.3785C77.2014 39.8777 76.6284 39.6272 75.8847 39.6272C75.1486 39.6272 74.5756 39.8777 74.1658 40.3785C73.756 40.8794 73.5511 41.5852 73.5511 42.4958C73.5511 43.3989 73.756 44.1047 74.1658 44.6131C74.5756 45.1216 75.1486 45.3758 75.8847 45.3758ZM84.6744 46.628C83.574 46.628 82.7316 46.3434 82.1473 45.7742C81.5705 45.1975 81.2822 44.3475 81.2822 43.2244V38.4889H82.7392V43.213C82.7392 43.9339 82.9024 44.4765 83.2287 44.8408C83.5626 45.1975 84.0445 45.3758 84.6744 45.3758C85.9569 45.3758 86.5982 44.6549 86.5982 43.213V38.4889H88.0439V43.2244C88.0439 44.3475 87.7593 45.1975 87.1901 45.7742C86.621 46.3434 85.7824 46.628 84.6744 46.628ZM89.857 46.5142V38.4889H95.1958V39.65H91.2572V41.8584H94.9454V43.0195H91.2572V45.3531H95.1958V46.5142H89.857ZM99.9451 46.5142V38.4889H105.284V39.65H101.345V41.8584H105.033V43.0195H101.345V45.3531H105.284V46.5142H99.9451ZM106.874 46.5142V38.4889H108.092L110.938 43.7366L113.772 38.4889H114.967V46.5142H113.647V41.1071L111.348 45.2961H110.494L108.194 41.1298V46.5142H106.874ZM120.052 46.5142V38.4889H121.27L124.116 43.7366L126.951 38.4889H128.146V46.5142H126.825V41.1071L124.526 45.2961H123.672L121.373 41.1298V46.5142H120.052ZM130.026 46.5142V38.4889H131.483V46.5142H130.026ZM133.364 46.5142V38.4889H134.582L137.428 43.7366L140.262 38.4889H141.458V46.5142H140.137V41.1071L137.838 45.2961H136.984L134.685 41.1298V46.5142H133.364ZM143.77 48.0281L143.19 47.5728C143.38 47.3831 143.52 47.201 143.611 47.0264C143.71 46.8595 143.778 46.6887 143.816 46.5142H143.076V44.9319H144.67V45.9791C144.67 46.3662 144.601 46.7191 144.465 47.0378C144.336 47.3641 144.104 47.6942 143.77 48.0281ZM83.8255 62.5142V54.4889H85.0435L87.8893 59.7366L90.7238 54.4889H91.919V62.5142H90.5986V57.1071L88.2991 61.2961H87.4454L85.146 57.1298V62.5142H83.8255ZM93.7992 62.5142V54.4889H95.2562V62.5142H93.7992ZM96.2494 62.5142L99.8807 54.4889H101.076L104.707 62.5142H103.227L102.431 60.6587H98.5147L97.7293 62.5142H96.2494ZM100.461 56.0712L99.0156 59.4976H101.93L100.484 56.0712H100.461ZM108.979 62.628C107.879 62.628 107.036 62.3434 106.452 61.7742C105.875 61.1975 105.587 60.3475 105.587 59.2244V54.4889H107.044V59.213C107.044 59.9339 107.207 60.4765 107.533 60.8408C107.867 61.1975 108.349 61.3758 108.979 61.3758C110.261 61.3758 110.903 60.6549 110.903 59.213V54.4889H112.348V59.2244C112.348 60.3475 112.064 61.1975 111.495 61.7742C110.925 62.3434 110.087 62.628 108.979 62.628ZM114.264 60.135L113.82 54.4889H115.573L115.129 60.135H114.264ZM113.9 62.5142V60.9319H115.493V62.5142H113.9Z"
                            fill="#434343" />
                        <defs>
                            <filter id="filter0_d_1949:4093" x="0.7" y="70" width="106.6" height="106.6"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dy="3.3" />
                                <feGaussianBlur stdDeviation="1.65" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1949:4093" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1949:4093" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </a>

            <div className="footer">
                <div class="content-footer">
                    <div class="coluna-1">
                        <img src={imgLogo} alt="" />
                        <div class="text-footer">
                            <p>Copyright© 2021</p>
                        </div>

                    </div>
                    <div class="coluna-2">
                        <div class="container-rede-sociais">
                            <img src={imgFacebook} alt="" />
                            <img src={imgInstagram} alt="" />
                            <img src={imgGithub} alt="" />

                        </div>
                        <p>Desenvolvido por alunos BandTec </p>
                    </div>
                    <div class="coluna-3">
                        <div class="alinhamento-contato">
                            <h1 class="text-titulo-contato">Contato</h1>
                            <div class="container-contato">
                                <p>email @email</p>
                                <div class="container-btn-contato">
                                    <button class="btn-contato">
                                        <img src={imgEmail} alt="" />
                                    </button>
                                </div>

                            </div>
                            <div class="container-contato">
                                <p>(11)4002-8922</p>
                                <div class="container-btn-contato">
                                    <button class="btn-contato">
                                        <img src={imgWspp} alt="" />
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <svg id="svg1" width="100%" height="274" viewBox="0 0 1366 274" fill="none" preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0 273.308V48.4874C107.667 59.8708 235.73 20.0291 349.563 14.3374C463.397 8.64578 590.562 28.8368 706.241 48.4874C854.224 73.6256 959.995 85.009 1045.37 78.3687C1158.39 69.5784 1252.17 57.0249 1309.08 28.5666L1366 0.108276V273.308H1309.08C1252.17 273.308 1138.33 273.308 1024.5 273.308C910.667 273.308 796.833 273.308 683 273.308C569.167 273.308 455.333 273.308 341.5 273.308C227.667 273.308 113.833 273.308 56.9167 273.308H0Z"
                        fill="#FEA273" />
                </svg>
                <svg id="svg2" width="100%" height="292" viewBox="0 0 1366 292" fill="none" preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 291.308V41.9035C179.861 76.5166 515.445 60.8697 585.023 48.5416C1036 -17.8399 1293.58 -1.87673 1366 14.4025V291.308H0Z"
                        fill="#FD8344" />
                </svg>

            </div>


        </div>
    );
}

export default Artigo;