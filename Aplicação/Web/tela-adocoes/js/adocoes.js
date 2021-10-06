// function trocaMenu(valor) {
    
//     let todasDivs = document.querySelectorAll('.opcoes-adocoes');

//     const divs = [document.querySelectorAll('.card-animais-favoritos'),
//                   document.querySelectorAll('.card-processo-adocao'), 
//                   document.querySelectorAll('.card-animais-adotados')]

//     todasDivs.forEach(element => {
//         let valorDiv = element.getAttribute('value') - 1
//         if (valor == element.getAttribute('value')) {
//             mostrarDivs(divs[valorDiv])
//             element.style.backgroundColor = '#FFD8D5';
//         } else {
//             let div = divs[valorDiv]
//             bloquearDivs(div)
//             element.style.backgroundColor = '#FFFFFF';
//         }
//     });

//     function bloquearDivs(div) {
//         div.forEach(element => {
//             element.style.display = 'none';
//         });
//     }

//     function mostrarDivs(div) {
//         div.forEach(element => {
//             element.style.display = 'block';
//         });
//     }

// }

function trocarMenu(valor) {

    // if (ramIDE > 2) {
    //     let alerta = document.createElement('div')
    //     alerta.innerHTML = "1"
    //     first.appendChild(alerta);
    //     if (alerta.classList) alerta.classList.add("alert");
    //     else alerta.className += " alert";
    //   }

    //   let img1 = document.createElement('img')
    //   img1.src = `../../img/${nomeIDE}.png`
    //   img1.id = nomeIDE
    //   img1.addEventListener('click', function () {
    //     sessionStorage.ide_usuario_meu_app = nomeIDE
    //     window.location.href = 'graficoshardware.html'
    //   })
    let divCardAdocoes = document.querySelector(".cards-adocoes")

    if (valor == 1) {
        let divAnimaisFavoritos = document.createElement('div')
        divCardAdocoes.appendChild(divAnimaisFavoritos)
        if (divAnimaisFavoritos.classList) divAnimaisFavoritos.classList.add("card-animais-favoritos");
        else divAnimaisFavoritos.className += " card-animais-favoritos";

        // DIV DADOS PET E OQ ESTÁ DENTRO DELA
        let divDadosPet = document.createElement('div')
        divAnimaisFavoritos.appendChild(divDadosPet)
        if (divDadosPet.classList) divDadosPet.classList.add("dados-pet");
        else divDadosPet.className += " dados-pet";

        let divImgPet = document.createElement('div')
        divDadosPet.appendChild(divImgPet)
        if (divImgPet.classList) divImgPet.classList.add("img-pet");
        else divImgPet.className += " img-pet";

        let imgPet = document.createElement('img')
        divImgPet.appendChild(imgPet)
        // talves precise passar o SRC por id
        imgPet.src = "../../imagens/Pets-teste/cachorro.svg"

        let divTextoPet = document.createElement('div')
        divDadosPet.appendChild(divTextoPet)
        if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
        else divTextoPet.className += " texto-pet";

        // DIV DADOS FAVORITOS E OQ ESTÁ DENTRO DELA
        let divDadosFavoritos = document.createElement('div')
        divAnimaisFavoritos.appendChild(divDadosFavoritos)
        if (divDadosFavoritos.classList) divDadosFavoritos.classList.add("dados-favoritos");
        else divDadosFavoritos.className += " dados-favoritos";



    }
}

