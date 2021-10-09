function trocaMenu(valor) {
    
    let todasDivs = document.querySelectorAll('.opcoes-adocoes');

    const divs = [document.querySelectorAll('.card-animais-favoritos'),
                  document.querySelectorAll('.card-processo-adocao'), 
                  document.querySelectorAll('.card-animais-adotados')]

    todasDivs.forEach(element => {
        let valorDiv = element.getAttribute('value') - 1
        if (valor == element.getAttribute('value')) {
            mostrarDivs(valor)
            element.style.backgroundColor = '#FFD8D5';
        } else {
            let div = divs[valorDiv]
            bloquearDivs(div)
            element.style.backgroundColor = '#FFFFFF';
        }
    });

    function bloquearDivs(div) {
        div.forEach(element => {
            element.style.display = 'none';
        });
    }

}

function mostrarDivs(valor) {
    let div = document.querySelector(".cards-adocoes")

    if (valor == 1) {
        let divAnimaisFavoritos = document.createElement('div')
        div.appendChild(divAnimaisFavoritos)
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
        imgPet.src = "../../imagens/Pets-teste/cachorro.svg"
        divImgPet.appendChild(imgPet)

        let divTextoPet = document.createElement('div')
        divDadosPet.appendChild(divTextoPet)
        if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
        else divTextoPet.className += " texto-pet";

        let pThor = document.createElement('p')
        pThor.innerHTML = "THOR" 
        divTextoPet.appendChild(pThor)
       
        let pAnos = document.createElement('p')
        pAnos.innerHTML = "3 ANOS"
        divTextoPet.appendChild(pAnos)  

        let divSexoPet = document.createElement('div')
        divTextoPet.appendChild(divSexoPet)
        if (divSexoPet.classList) divSexoPet.classList.add("sexo-pet");
        else divSexoPet.className += " sexo-pet";

        let pSexo = document.createElement('p')
        pSexo.innerHTML = "MACHO" 
        divSexoPet.appendChild(pSexo)

        let imgSexo = document.createElement('img')
        imgSexo.src = "../../imagens/Adocoes/sexo-masculino.svg"
        divSexoPet.appendChild(imgSexo)
       
        // DIV DADOS FAVORITOS E OQ ESTÁ DENTRO DELA
        let divDadosFavoritos = document.createElement('div')
        divAnimaisFavoritos.appendChild(divDadosFavoritos)
        if (divDadosFavoritos.classList) divDadosFavoritos.classList.add("dados-favoritos");
        else divDadosFavoritos.className += " dados-favoritos";

        let divImgFavorito = document.createElement('div')
        divDadosFavoritos.appendChild(divImgFavorito)
        if (divImgFavorito.classList) divImgFavorito.classList.add("img-favorito");
        else divImgFavorito.className += " img-favorito";

        let containerFavorito = document.createElement('div')
        divImgFavorito.appendChild(containerFavorito)
        if (containerFavorito.classList) containerFavorito.classList.add("container-favorito");
        else containerFavorito.className += " container-favorito";

        let imgCoracaoVermelho = document.createElement('img')
        imgCoracaoVermelho.src = "../../imagens/Geral/icon-coracao-vermelho.svg"
        containerFavorito.appendChild(imgCoracaoVermelho)

        let caontadorFavorito = document.createElement('div')
        divDadosFavoritos.appendChild(caontadorFavorito)
        if (caontadorFavorito.classList) caontadorFavorito.classList.add("contador-favvorito");
        else caontadorFavorito.className += " contador-favvorito";

        let cliqueFavorito = document.createElement('div')
        divDadosFavoritos.appendChild(cliqueFavorito)
        if (cliqueFavorito.classList) cliqueFavorito.classList.add("clique-favorito");
        else cliqueFavorito.className += " clique-favorito";

        let containerClique = document.createElement('div')
        cliqueFavorito.appendChild(containerClique)
        if (containerClique.classList) containerClique.classList.add("container-clique");
        else containerClique.className += " container-clique";

        let containerAlinhamento = document.createElement('div')
        containerClique.appendChild(containerAlinhamento)
        if (containerAlinhamento.classList) containerAlinhamento.classList.add("container-alinhamento");
        else containerAlinhamento.className += " container-alinhamento";

        let pAlinhamento = document.createElement('p')
        pAlinhamento.innerHTML = "CLIQUE AQUI PRA VER QUEM FAVORITOU O THOR"
        containerAlinhamento.appendChild(pAlinhamento)

    } else if (valor == 2) {
        let div = document.querySelector(".cards-adocoes")

        let divDadosFavoritos = document.createElement('div')
        divAnimaisFavoritos.appendChild(divDadosFavoritos)
        if (divDadosFavoritos.classList) divDadosFavoritos.classList.add("dados-favoritos");
        else divDadosFavoritos.className += " dados-favoritos";
    }
}

