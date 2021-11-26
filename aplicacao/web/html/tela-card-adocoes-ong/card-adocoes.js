// MODAL
// Get the modal
let dadosCards = []
let vetorComVetores = []
let vetorFiltrados = []
let contador = 1;

var modal = document.getElementById("modalCadastro");
// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("close")[0];

function topo() {
    window.scrollTo(0, 0)
}

function redirecionarCadastro() {
    modal.style.display = "block";
    document.querySelector("body").style.overflow = 'hidden';
}

function cadastroForm() {
    window.location.href = "../cadastro-pet/cadastro-pet.html"
}

function cadastroArq() {
    window.location.href = "../tela-importacao/importacao.html"
}
// When the user clicks on <div> (x), close the modal
fechar.onclick = function () {
    modal.style.display = "none";
    document.querySelector("body").style.overflow = 'visible';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.querySelector("body").style.overflow = 'visible';
    }
}

function gerarRelatorio() {
    let cnpj = JSON.parse(login_usuario).cnpj
    window.location.href = `http://localhost:8080/miaudote/animais/exportacao/${cnpj}`
}

function getInfosCards() {
    axios.get(`http://localhost:8080/miaudote/animais/animais-ong/${JSON.parse(sessionStorage.login_usuario).cnpj}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true,
        },
    }).then(response => {
        dadosCards = []

        for (let index = 0; index < response.data.length; index++) {
            dadosCards[index] = response.data[index];
        }

        criarDivVazia()
        criarVetoresDeCards()
        preencherVetorPrincipalComVetores()
        limparDivVazia()
        mostrarDivs()
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar os cards. Tente novamente!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function mostrarPagina(numero) {
    let elementos = document.getElementsByTagName("div")

    for (i = 0; i < elementos.length; i++) {
        if (elementos[i].classList.contains("cards")) {
            elementos[i].style.display = "none";
        }
    }

    let paginaAtual = document.getElementById(`card${numero}`);
    paginaAtual.style.display = "flex";

    let botaoPagina = document.querySelector(".active");
    botaoPagina.classList.remove("active")

    document.getElementById(`pagina${numero}`).classList.add("active");
}

function criarDivVazia() {
    let divContainer = document.querySelector(".container");

    let div = document.createElement('div')
        divContainer.appendChild(div)
        if (div.classList) div.classList.add("cards");
        else div.className += " cards";
}

function limparDivVazia() {
    let divCards = document.querySelectorAll(".cards");
    divCards.forEach(element => {
        element.remove()
    })
}

function mostrarDivs() {
    let divContainer = document.querySelector(".container");
    let divContainerPagination = document.querySelector(".container-pagination");

    let divPagination = document.createElement('div')
    divContainerPagination.appendChild(divPagination)
    if (divPagination.classList) divPagination.classList.add("pagination");
    else divPagination.className += " pagination";

    let aSetaEsquerda = document.createElement('a')
    aSetaEsquerda.href = "#";
    divPagination.appendChild(aSetaEsquerda);

    let imgSetaEsquerda = document.createElement('img')
    aSetaEsquerda.appendChild(imgSetaEsquerda)
    imgSetaEsquerda.src = "../../imagens/adote/icon-seta-esquerda-adote.svg";

    let aPagina1 = document.createElement('a')
    aPagina1.href = "#";
    aPagina1.innerHTML = "1";
    aPagina1.id = "pagina1"
    divPagination.appendChild(aPagina1);
    if (aPagina1.classList) aPagina1.classList.add("active");
    else aPagina1.className += " active";

    aPagina1.addEventListener('click', () => {
        let idComLetra = aPagina1.id
        var idSemLetra = idComLetra.replace(/\D/g, "");
        mostrarPagina(idSemLetra);
    })

    vetorComVetores.forEach(element => {
        let div = document.createElement('div')
        divContainer.appendChild(div)
        if (div.classList) div.classList.add("cards");
        else div.className += " cards";
        div.id = `card${contador}`
        if (contador > 1) {
            div.style.display = 'none';
            let aPaginaExtra = document.createElement('a')
            aPaginaExtra.href = "#";
            aPaginaExtra.innerHTML = contador;
            aPaginaExtra.id = `pagina${contador}`
            aPaginaExtra.addEventListener('click', () => {
                let idComLetra = aPaginaExtra.id
                var idSemLetra = idComLetra.replace(/\D/g, "");
                mostrarPagina(idSemLetra);
            })
            divPagination.appendChild(aPaginaExtra);
        }

        contador++;

        element.forEach(elementoDoVetorDaPagina => {

            let divCardDentro = document.createElement('div')
            div.appendChild(divCardDentro)
            if (divCardDentro.classList) divCardDentro.classList.add("card-dentro");
            else divCardDentro.className += " card-dentro";
            divCardDentro.id = `cardDentro${elementoDoVetorDaPagina.id}`

            if (elementoDoVetorDaPagina.adotado == 1) {
                let divFiltro = document.createElement('div')
                divCardDentro.appendChild(divFiltro)
                if (divFiltro.classList) divFiltro.classList.add("card-filtro");
                else divFiltro.className += " card-filtro";
                divFiltro.style.display = "flex";
                divFiltro.style.alignItems = "center";
                divFiltro.style.justifyContent = "center";

                divCardDentro.style.position = "relative";

                let hAdotado = document.createElement('h1')
                hAdotado.innerHTML = "ADOTADO";
                hAdotado.style.fontSize = "40px";
                hAdotado.style.color = "white";
                divFiltro.appendChild(hAdotado);
            }

            let divImgPet = document.createElement('div')
            divCardDentro.appendChild(divImgPet)
            if (divImgPet.classList) divImgPet.classList.add("img-pet");
            else divImgPet.className += " img-pet";
            divImgPet.id = `divImgPet${elementoDoVetorDaPagina.id}`
            if (elementoDoVetorDaPagina.adotado != 1) {
                divImgPet.style.cursor = "pointer";
                divImgPet.addEventListener('click', () => {
                    sessionStorage[`cardAnimal`] = divImgPet.id.replace(/\D/g, '');
                    window.location.href = "../tela-perfil-pet-ong/perfil-pet-ong.html"
                })
            }

            let divEdicaoCard = document.createElement('div')
            divCardDentro.appendChild(divEdicaoCard)
            if (divEdicaoCard.classList) divEdicaoCard.classList.add("edicao-card");
            else divEdicaoCard.className += " edicao-card";
            divEdicaoCard.id = `divEdicaoCard${elementoDoVetorDaPagina.id}`
            if (elementoDoVetorDaPagina.adotado != 1) {
                divEdicaoCard.style.cursor = "pointer";
                divEdicaoCard.addEventListener('click', () => {
                    sessionStorage[`idEdicao`] = divEdicaoCard.id.replace(/\D/g, '');
                    window.location.href = "../cadastro-pet/editar-pet.html"
                })
            }

            let imgEditarCard = document.createElement('img')
            divEdicaoCard.appendChild(imgEditarCard)
            if (imgEditarCard.classList) imgEditarCard.classList.add("img-editar-card");
            else imgEditarCard.className += " img-editar-card";
            imgEditarCard.src = "../../imagens/geral/editar-pet.svg";

            let imagemAnimal;

            if (elementoDoVetorDaPagina.url === null) {
                imagemAnimal = "../../imagens/geral/placeholder-imagem-pet.svg";
            } else if (elementoDoVetorDaPagina.url.includes(',')) {
                let imagem = elementoDoVetorDaPagina.url.split(',')
                imagemAnimal = imagem[0]
            } else {
                imagemAnimal = elementoDoVetorDaPagina.url
            }

            let imgAnimal = document.createElement('div')
            divImgPet.appendChild(imgAnimal)
            if (imgAnimal.classList) imgAnimal.classList.add("img-perfil-animal");
            else imgAnimal.className += " img-perfil-animal";
            imgAnimal.style.backgroundImage = `url(${imagemAnimal})`;

            let divInformacoesPet = document.createElement('div')
            divCardDentro.appendChild(divInformacoesPet)
            if (divInformacoesPet.classList) divInformacoesPet.classList.add("informacoes-pet");
            else divInformacoesPet.className += " informacoes-pet";
            divInformacoesPet.id = `divInformacoesPet${elementoDoVetorDaPagina.id}`
            if (elementoDoVetorDaPagina.adotado != 1) {
                divInformacoesPet.style.cursor = "pointer";
                divInformacoesPet.addEventListener('click', () => {
                    sessionStorage[`cardAnimal`] = divInformacoesPet.id.replace(/\D/g, '');
                    window.location.href = "../tela-perfil-pet-ong/perfil-pet-ong.html"
                })
            }

            let divContainerDadosNome = document.createElement('div')
            divInformacoesPet.appendChild(divContainerDadosNome)
            if (divContainerDadosNome.classList) divContainerDadosNome.classList.add("container-dados");
            else divContainerDadosNome.className += " container-dados";

            let imgIconeEspecie = document.createElement('img')
            let especie = elementoDoVetorDaPagina.especie;
            especie == "gato" || especie == "Gato" ? imgIconeEspecie.src = "../../imagens/geral/cat-rosa.svg" : imgIconeEspecie.src = "../../imagens/geral/dog-rosa.svg";
            divContainerDadosNome.appendChild(imgIconeEspecie)

            let hNomePet = document.createElement('h1')
            hNomePet.innerHTML = elementoDoVetorDaPagina.nome;
            divContainerDadosNome.appendChild(hNomePet);

            let divContainerDadosIdade = document.createElement('div')
            divInformacoesPet.appendChild(divContainerDadosIdade)
            if (divContainerDadosIdade.classList) divContainerDadosIdade.classList.add("container-dados");
            else divContainerDadosIdade.className += " container-dados";

            let imgIconeIdade = document.createElement('img')
            imgIconeIdade.src = "../../imagens/geral/cake-rosa.svg";
            divContainerDadosIdade.appendChild(imgIconeIdade)

            let pIdadeAnimal = document.createElement('p')
            pIdadeAnimal.innerHTML = elementoDoVetorDaPagina.idadeAnimal + (elementoDoVetorDaPagina.idadeAnimal == 1 ? " ano" : " anos")
            divContainerDadosIdade.appendChild(pIdadeAnimal);

            let divContainerDadosDesc = document.createElement('div')
            divInformacoesPet.appendChild(divContainerDadosDesc)
            if (divContainerDadosDesc.classList) divContainerDadosDesc.classList.add("container-dados");
            else divContainerDadosDesc.className += " container-dados";

            let imgIconeDesc = document.createElement('img')
            imgIconeDesc.src = "../../imagens/geral/informacao-rosa.svg";
            divContainerDadosDesc.appendChild(imgIconeDesc)

            let pDescAnimal = document.createElement('p')
            pDescAnimal.innerHTML = elementoDoVetorDaPagina.descricao;
            divContainerDadosDesc.appendChild(pDescAnimal);
        })
    })

    let aSetaDireita = document.createElement('a')
    aSetaDireita.href = "#";
    divPagination.appendChild(aSetaDireita);

    let imgSetaDireita = document.createElement('img')
    aSetaDireita.appendChild(imgSetaDireita)
    imgSetaDireita.src = "../../imagens/adote/icon-seta-direita-adote.svg";
}

function preencherVetorPrincipalComVetores() {
    for (let i = 0, j = 0, numero = 1; i < dadosCards.length; i = i + 9, j++, numero++) {
        vetorComVetores[j] = window[`card${numero}`]
    }
}

function criarVetoresDeCards() {
    let i = 1;
    let numero = 0;

    for (let index = 0, indexAux = 0; index < dadosCards.length; index++, indexAux++) {
        if (i == 1 || i == 10) {
            if (i == 10) {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
                i = 1;
            } else {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
            }
        }

        if (i < 10) {
            eval(`card${numero}`)[indexAux] = dadosCards[index];
            i++;
        } else {
            i = 1;
            eval(`card${numero}`)[indexAux] = dadosCards[index];
        }
    }

}

function limparFiltros() {
    topo()
    vetorFiltrados = []
    vetorComVetores = []
    contador = 1;
    let i = 1;
    let numero = 0;

    for (let index = 0, indexAux = 0; index < dadosCards.length; index++, indexAux++) {
        if (i == 1 || i == 10) {
            if (i == 10) {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
                i = 1;
            } else {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
            }
        }

        if (i < 10) {
            eval(`card${numero}`)[indexAux] = dadosCards[index];
            i++;
        } else {
            i = 1;
            eval(`card${numero}`)[indexAux] = dadosCards[index];
        }
    }

    for (let i = 0, j = 0, numero = 1; i < dadosCards.length; i = i + 9, j++, numero++) {
        vetorComVetores[j] = window[`card${numero}`]
    }

    let divsDeCards = document.querySelectorAll(".cards");
    divsDeCards.forEach(element => { element.remove() });
    document.querySelector(".pagination").remove();
    criarDivVazia();

    if (dadosCards.length > 0) {
        getInfosCards();
    } else {
        let divContainer = document.querySelector(".container");
        let divContainerPagination = document.querySelector(".container-pagination");

        let divPagination = document.createElement('div')
        divContainerPagination.appendChild(divPagination)
        if (divPagination.classList) divPagination.classList.add("pagination");
        else divPagination.className += " pagination";

        let aSetaEsquerda = document.createElement('a')
        aSetaEsquerda.href = "#";
        divPagination.appendChild(aSetaEsquerda);

        let imgSetaEsquerda = document.createElement('img')
        aSetaEsquerda.appendChild(imgSetaEsquerda)
        imgSetaEsquerda.src = "../../imagens/adote/icon-seta-esquerda-adote.svg";

        let aPagina1 = document.createElement('a')
        aPagina1.href = "#";
        aPagina1.innerHTML = "1";
        aPagina1.id = "pagina1"
        divPagination.appendChild(aPagina1);
        if (aPagina1.classList) aPagina1.classList.add("active");
        else aPagina1.className += " active";

        let aSetaDireita = document.createElement('a')
        aSetaDireita.href = "#";
        divPagination.appendChild(aSetaDireita);

        let imgSetaDireita = document.createElement('img')
        aSetaDireita.appendChild(imgSetaDireita)
        imgSetaDireita.src = "../../imagens/adote/icon-seta-direita-adote.svg";

        let div = document.createElement('div')
        divContainer.appendChild(div)
        if (div.classList) div.classList.add("cards");
        else div.className += " cards";
        div.id = `card${contador}`;
        div.style.alignItems = "flex-start";
        div.style.justifyContent = "center";

        let imgNaoEncontrado = document.createElement('img')
        imgNaoEncontrado.src = "../../imagens/geral/nao-encontrado.svg"
        div.appendChild(imgNaoEncontrado);
    }

    let seletores = document.querySelectorAll("select")

    seletores.forEach(element => {
        element.value = 1
    });

}

function filtrar() {
    topo()
    vetorFiltrados = []
    vetorComVetores = []
    limparVetores();
    contador = 1;

    let sEspecie = document.getElementById('selectEspecie').options[document.getElementById('selectEspecie').selectedIndex].text.toUpperCase();
    let sIdade = document.getElementById('selectIdade').options[document.getElementById('selectIdade').selectedIndex].value;
    let sPorte = document.getElementById('selectPorte').options[document.getElementById('selectPorte').selectedIndex].text.toUpperCase();
    let sCor = document.getElementById('selectCor').options[document.getElementById('selectCor').selectedIndex].text.toUpperCase();
    let sPelagem = document.getElementById('selectPelagem').options[document.getElementById('selectPelagem').selectedIndex].text.toUpperCase();
    let sComportamento = document.getElementById('selectComportamento').options[document.getElementById('selectComportamento').selectedIndex].text.toUpperCase();

    vetorFiltrados = dadosCards;

    if (sEspecie != "QUALQUER") {
        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de espécie")
            return elemento.especie.toUpperCase() == sEspecie;
        });
    }

    if (sIdade != 1) {
        let min;
        let max;

        sIdade == 2 ? (min = 1, max = 3) :
            sIdade == 3 ? (min = 4, max = 7) :
                sIdade == 4 ? (min = 8, max = 10) : (min = 11, max = 30)

        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de idade")
            return elemento.idadeAnimal >= min &&
                elemento.idadeAnimal <= max;
        });
    }

    if (sPorte != "QUALQUER") {
        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de porte")
            return elemento.porte.toUpperCase() == sPorte;
        });
    }

    if (sCor != "QUALQUER") {
        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de cor")
            return elemento.corPelagem.toUpperCase().includes(sCor);
        });
    }

    if (sPelagem != "QUALQUER") {
        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de tipo pelagem")
            return elemento.tipoPelagem.toUpperCase() == sPelagem;
        });
    }

    if (sComportamento != "QUALQUER") {
        vetorFiltrados = vetorFiltrados.filter(function (elemento) {
            console.log("entrei no filtro de comportamento")
            return elemento.comportamento.toUpperCase() == sComportamento;
        });
    }

    let i = 1;
    let numero = 0;

    for (let index = 0, indexAux = 0; index < vetorFiltrados.length; index++, indexAux++) {
        if (i == 1 || i == 10) {
            if (i == 10) {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
                i = 1;
            } else {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
            }
        }

        if (i < 10) {
            eval(`card${numero}`)[indexAux] = vetorFiltrados[index];
            i++;
        } else {
            i = 1;
            eval(`card${numero}`)[indexAux] = vetorFiltrados[index];
        }
    }

    for (let i = 0, j = 0, numero = 1; i < vetorFiltrados.length; i = i + 9, j++, numero++) {
        vetorComVetores[j] = window[`card${numero}`]
    }

    let divsDeCards = document.querySelectorAll(".cards");
    divsDeCards.forEach(element => { element.remove() });
    document.querySelector(".pagination").remove();

    if (vetorFiltrados.length > 0) {
        mostrarDivs();
    } else {
        let divContainer = document.querySelector(".container");
        let divContainerPagination = document.querySelector(".container-pagination");

        let divPagination = document.createElement('div')
        divContainerPagination.appendChild(divPagination)
        if (divPagination.classList) divPagination.classList.add("pagination");
        else divPagination.className += " pagination";

        let aSetaEsquerda = document.createElement('a')
        aSetaEsquerda.href = "#";
        divPagination.appendChild(aSetaEsquerda);

        let imgSetaEsquerda = document.createElement('img')
        aSetaEsquerda.appendChild(imgSetaEsquerda)
        imgSetaEsquerda.src = "../../imagens/adote/icon-seta-esquerda-adote.svg";

        let aPagina1 = document.createElement('a')
        aPagina1.href = "#";
        aPagina1.innerHTML = "1";
        aPagina1.id = "pagina1"
        divPagination.appendChild(aPagina1);
        if (aPagina1.classList) aPagina1.classList.add("active");
        else aPagina1.className += " active";

        let aSetaDireita = document.createElement('a')
        aSetaDireita.href = "#";
        divPagination.appendChild(aSetaDireita);

        let imgSetaDireita = document.createElement('img')
        aSetaDireita.appendChild(imgSetaDireita)
        imgSetaDireita.src = "../../imagens/adote/icon-seta-direita-adote.svg";

        let div = document.createElement('div')
        divContainer.appendChild(div)
        if (div.classList) div.classList.add("cards");
        else div.className += " cards";
        div.id = `card${contador}`;
        div.style.alignItems = "flex-start";
        div.style.justifyContent = "center";

        let imgNaoEncontrado = document.createElement('img')
        imgNaoEncontrado.src = "../../imagens/geral/nao-encontrado.svg"
        div.appendChild(imgNaoEncontrado);
    }

}

function limparVetores() {
    for (let j = 1; j <= 50; j++) {
        try {
            if (typeof window[`card${j}`] === 'object') {
                delete window[`card${j}`]
            } else {
                break;
            }
        }
        catch (err) {
            console.log("erro")
        }
    }
}