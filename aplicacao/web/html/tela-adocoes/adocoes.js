const dadosFavoritados = []
const dadosProcesso = []
const dadosAdotados = []

function trocaMenu(valor) {

    let todasDivs = document.querySelectorAll('.opcoes-adocoes');

    const divs = [document.querySelectorAll('.card-animais-favoritos'),
    document.querySelectorAll('.card-processo-adocao'),
    document.querySelectorAll('.card-animais-adotados')]

    if (divs[valor - 1].length == 0) {
        todasDivs.forEach(element => {
            let valorDiv = element.getAttribute('value') - 1
            if (valor == element.getAttribute('value')) {
                getEndpoint(valor)
                element.style.backgroundColor = '#dfd4f5';
            } else {
                let div = divs[valorDiv]
                bloquearDivs(div)
                element.style.backgroundColor = '#FFFFFF';
            }
        });
    }

    function bloquearDivs(div) {
        div.forEach(element => {
            element.parentNode.removeChild(element);
        });
    }

}

function calcIdade(data) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        // split = data.split('/'),
        // novadata = split[1] + "/" +split[0]+"/"+split[2],
        data_americana = new Date(data),
        vAno = data_americana.getFullYear(),
        vMes = data_americana.getMonth() + 1,
        vDia = data_americana.getDate(),
        ano_aniversario = +vAno,
        mes_aniversario = +vMes,
        dia_aniversario = +vDia,
        quantos_anos = ano_atual - ano_aniversario;
    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }
    return quantos_anos < 0 ? 0 : quantos_anos;
}

function getEndpoint(valor) {
    switch (valor) {
        case 1:
            getInfosFavoritos()
            break;

        case 2:
            getInfosEmProcesso()
            break;

        case 3:
            getInfosAdotados()
            break;

        default:
            break;
    }
}

function getInfosFavoritos() {
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/animais-favoritados`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        for (let index = 0; index < response.data.length; index++) {
            dadosFavoritados[index] = response.data[index];
        }
        mostrarDivs(1)
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function getInfosEmProcesso() {
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/adocoes-em-processo`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        for (let index = 0; index < response.data.length; index++) {
            dadosProcesso[index] = response.data[index];
        }
        mostrarDivs(2)
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function getInfosAdotados() {
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/adocoes-concluidas`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        for (let index = 0; index < response.data.length; index++) {
            dadosAdotados[index] = response.data[index];
        }
        mostrarDivs(3)
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function mostrarDivs(valor) {
    let div = document.querySelector(".cards-adocoes")

    if (valor == 1) {

        dadosFavoritados.forEach(element => {

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
            imgPet.src = element.url
            divImgPet.appendChild(imgPet)

            let divTextoPet = document.createElement('div')
            divDadosPet.appendChild(divTextoPet)
            if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
            else divTextoPet.className += " texto-pet";

            let pThor = document.createElement('p')
            pThor.innerHTML = element.nome
            divTextoPet.appendChild(pThor)

            let pAnos = document.createElement('p')
            pAnos.innerHTML = element.idadeAnimal
            divTextoPet.appendChild(pAnos)

            let divSexoPet = document.createElement('div')
            divTextoPet.appendChild(divSexoPet)
            if (divSexoPet.classList) divSexoPet.classList.add("sexo-pet");
            else divSexoPet.className += " sexo-pet";

            let pSexo = document.createElement('p')
            pSexo.innerHTML = element.genero === "f" ? "Fêmea" : "Macho"
            divSexoPet.appendChild(pSexo)

            let imgSexo = document.createElement('img')
            imgSexo.src = "../../imagens/adocoes/sexo-masculino.svg"//element.genero === "m" ?  "../../imagens/adocoes/sexo-masculino.svg" : "../../imagens/adocoes/sexo-feminino.svg"
            divSexoPet.appendChild(imgSexo)

            // DIV DADOS FAVORITOS E OQ ESTÁ DENTRO DELA
            let divDadosAdotante = document.createElement('div')
            divAnimaisFavoritos.appendChild(divDadosAdotante)
            if (divDadosAdotante.classList) divDadosAdotante.classList.add("dados-favoritos");
            else divDadosAdotante.className += " dados-favoritos";

            let divImgFavorito = document.createElement('div')
            divDadosAdotante.appendChild(divImgFavorito)
            if (divImgFavorito.classList) divImgFavorito.classList.add("img-favorito");
            else divImgFavorito.className += " img-favorito";

            let containerFavorito = document.createElement('div')
            divImgFavorito.appendChild(containerFavorito)
            if (containerFavorito.classList) containerFavorito.classList.add("container-favorito");
            else containerFavorito.className += " container-favorito";

            let imgCoracaoVermelho = document.createElement('img')
            imgCoracaoVermelho.src = "../../imagens/geral/icon-coracao-vermelho.svg"
            containerFavorito.appendChild(imgCoracaoVermelho)

            let caontadorFavorito = document.createElement('div')
            divDadosAdotante.appendChild(caontadorFavorito)
            if (caontadorFavorito.classList) caontadorFavorito.classList.add("contador-favvorito");
            else caontadorFavorito.className += " contador-favvorito";

            let cliqueFavorito = document.createElement('div')
            divDadosAdotante.appendChild(cliqueFavorito)
            if (cliqueFavorito.classList) cliqueFavorito.classList.add("clique-favorito");
            else cliqueFavorito.className += " clique-favorito";

            cliqueFavorito.addEventListener('click', () => {
                // Ação de ver quem favoritou
            })

            let containerClique = document.createElement('div')
            cliqueFavorito.appendChild(containerClique)
            if (containerClique.classList) containerClique.classList.add("container-clique");
            else containerClique.className += " container-clique";

            let containerAlinhamento = document.createElement('div')
            containerClique.appendChild(containerAlinhamento)
            if (containerAlinhamento.classList) containerAlinhamento.classList.add("container-alinhamento");
            else containerAlinhamento.className += " container-alinhamento";

            let pAlinhamento = document.createElement('p')
            pAlinhamento.innerHTML = "CLIQUE AQUI PRA VER QUEM FAVORITOU O " + element.nome.toUpperCase()
            containerAlinhamento.appendChild(pAlinhamento)
        });
    } else if (valor == 2) {

        dadosProcesso.forEach(element => {

            let divCardProcessoAdocao = document.createElement('div')
            div.appendChild(divCardProcessoAdocao)
            if (divCardProcessoAdocao.classList) divCardProcessoAdocao.classList.add("card-processo-adocao");
            else divCardProcessoAdocao.className += " card-processo-adocao";

            let divDadosAdotante = document.createElement('div')
            divCardProcessoAdocao.appendChild(divDadosAdotante)
            if (divDadosAdotante.classList) divDadosAdotante.classList.add("dados-adotante");
            else divDadosAdotante.className += " dados-adotante";

            let divTextoAdotante = document.createElement('div')
            divDadosAdotante.appendChild(divTextoAdotante)
            if (divTextoAdotante.classList) divTextoAdotante.classList.add("texto-adotante");
            else divTextoAdotante.className += " texto-adotante";

            let pNomeAdotante = document.createElement('p')
            pNomeAdotante.innerHTML = element.adotante.nome
            divTextoAdotante.appendChild(pNomeAdotante)

            let pIdadeAdotante = document.createElement('p')
            pIdadeAdotante.innerHTML = calcIdade(element.adotante.dataNascimento)//"20 ANOS" // element.adotante.idade 
            divTextoAdotante.appendChild(pIdadeAdotante)

            let pCidadeAdotante = document.createElement('p')
            pCidadeAdotante.innerHTML = element.adotante.endereco.cidade
            divTextoAdotante.appendChild(pCidadeAdotante)

            let divImgAdotante = document.createElement('div')
            divDadosAdotante.appendChild(divImgAdotante)
            if (divImgAdotante.classList) divImgAdotante.classList.add("img-adotante");
            else divImgAdotante.className += " img-adotante";

            let imgAdotante = document.createElement('img')
            imgAdotante.src = element.adotante.urlImagem
            divImgAdotante.appendChild(imgAdotante)

            let divTipoContatoAdotante = document.createElement('div')
            divCardProcessoAdocao.appendChild(divTipoContatoAdotante)
            if (divTipoContatoAdotante.classList) divTipoContatoAdotante.classList.add("tipo-contato");
            else divTipoContatoAdotante.className += " tipo-contato";

            let divLinhaContato = document.createElement('div')
            divTipoContatoAdotante.appendChild(divLinhaContato)
            if (divLinhaContato.classList) divLinhaContato.classList.add("linha-contato");
            else divLinhaContato.className += " linha-contato";

            let divImgContato = document.createElement('div')
            divTipoContatoAdotante.appendChild(divImgContato)
            if (divImgContato.classList) divImgContato.classList.add("img-contato");
            else divImgContato.className += " img-contato";

            let imgContato = document.createElement('img')
            imgContato.src = element.modoContato === "whatsapp" ? "../../imagens/adocoes/icon-whatsapp.svg" : "../../imagens/adocoes/icon-whatsapp.svg"
            divImgContato.appendChild(imgContato)

            let divDadosPetProcesso = document.createElement('div')
            divCardProcessoAdocao.appendChild(divDadosPetProcesso)
            if (divDadosPetProcesso.classList) divDadosPetProcesso.classList.add("dados-pet-processo");
            else divDadosPetProcesso.className += " dados-pet-processo";

            let divImgPetProcesso = document.createElement('div')
            divDadosPetProcesso.appendChild(divImgPetProcesso)
            if (divImgPetProcesso.classList) divImgPetProcesso.classList.add("img-pet-processo");
            else divImgPetProcesso.className += " img-pet-processo";

            let imgPetProcesso = document.createElement('img')
            imgPetProcesso.src = element.animal.urlImagem
            divImgPetProcesso.appendChild(imgPetProcesso)

            let divTextoPetProcesso = document.createElement('div')
            divDadosPetProcesso.appendChild(divTextoPetProcesso)
            if (divTextoPetProcesso.classList) divTextoPetProcesso.classList.add("texto-pet-processo");
            else divTextoPetProcesso.className += " texto-pet-processo";

            let pNomePet = document.createElement('p')
            pNomePet.innerHTML = element.animal.nome
            divTextoPetProcesso.appendChild(pNomePet)

            let pIdadePet = document.createElement('p')
            pIdadePet.innerHTML = calcIdade(element.animal.dataNascimento)
            divTextoPetProcesso.appendChild(pIdadePet)

            let divSexoPetProcesso = document.createElement('div')
            divTextoPetProcesso.appendChild(divSexoPetProcesso)
            if (divSexoPetProcesso.classList) divSexoPetProcesso.classList.add("sexo-pet-processo");
            else divSexoPetProcesso.className += " sexo-pet-processo";

            let pSexoPet = document.createElement('p')
            pSexoPet.innerHTML = element.animal.genero === "Femea" ? "Fêmea" : "Macho"
            divSexoPetProcesso.appendChild(pSexoPet)

            let imgSexoPetProcesso = document.createElement('img')
            imgSexoPetProcesso.src = "../../imagens/adocoes/sexo-masculino.svg" //element.genero === "m" ?  "../../imagens/adocoes/sexo-masculino.svg" : "../../imagens/adocoes/sexo-feminino.svg"
            divSexoPetProcesso.appendChild(imgSexoPetProcesso)

            let divContainerBtn = document.createElement('div')
            divCardProcessoAdocao.appendChild(divContainerBtn)
            if (divContainerBtn.classList) divContainerBtn.classList.add("container-bnt");
            else divContainerBtn.className += " container-bnt"

            let btnAdoutou = document.createElement('button')
            divContainerBtn.appendChild(btnAdoutou)
            btnAdoutou.id = "btn-adotou"
            btnAdoutou.addEventListener('click', () => {
                // Ação de marcar como adotado
            })

            let divContainerDentroBtn = document.createElement('div')
            btnAdoutou.appendChild(divContainerDentroBtn)
            if (divContainerDentroBtn.classList) divContainerDentroBtn.classList.add("container-dentro-btn");
            else divContainerDentroBtn.className += " container-dentro-btn"

            let divImgBtn = document.createElement('div')
            divContainerDentroBtn.appendChild(divImgBtn)
            if (divImgBtn.classList) divImgBtn.classList.add("img-btn");
            else divImgBtn.className += " img-btn"

            let imgCasa = document.createElement('img')
            imgCasa.src = "../../imagens/adocoes/icon-casa.svg"
            divImgBtn.appendChild(imgCasa)

            let divTextoAdotou = document.createElement('div')
            divContainerDentroBtn.appendChild(divTextoAdotou)
            if (divTextoAdotou.classList) divTextoAdotou.classList.add("texto-adotou");
            else divTextoAdotou.className += " texto-adotou"

            let pAdotouPet = document.createElement('p')
            pAdotouPet.innerHTML = "ADOTOU"
            divTextoAdotou.appendChild(pAdotouPet)

            let btnNaoAdoutou = document.createElement('button')
            divContainerBtn.appendChild(btnNaoAdoutou)
            btnNaoAdoutou.id = "btn-nao-adotou"
            btnNaoAdoutou.addEventListener('click', function () {
                // Ação de apagar
            })

            let divContainerDentroBtn2 = document.createElement('div')
            btnNaoAdoutou.appendChild(divContainerDentroBtn2)
            if (divContainerDentroBtn2.classList) divContainerDentroBtn2.classList.add("container-dentro-btn");
            else divContainerDentroBtn2.className += " container-dentro-btn"

            let divImgBtn2 = document.createElement('div')
            divContainerDentroBtn2.appendChild(divImgBtn2)
            if (divImgBtn2.classList) divImgBtn2.classList.add("img-btn");
            else divImgBtn2.className += " img-btn"

            let imgLixeira = document.createElement('img')
            imgLixeira.src = "../../imagens/adocoes/icon-lixeira.svg"
            divImgBtn2.appendChild(imgLixeira)

            let divTextoNaoAdotou = document.createElement('div')
            divContainerDentroBtn2.appendChild(divTextoNaoAdotou)
            if (divTextoNaoAdotou.classList) divTextoNaoAdotou.classList.add("texto-nao-adotou");
            else divTextoNaoAdotou.className += " texto-nao-adotou"

            let pNaoAdotouPet = document.createElement('p')
            pNaoAdotouPet.innerHTML = "NÃO ADOTOU"
            divTextoNaoAdotou.appendChild(pNaoAdotouPet)

        });
    } else if (valor == 3) {

        dadosAdotados.forEach(element => {

            let divCardAnimaisAdotados = document.createElement('div')
            div.appendChild(divCardAnimaisAdotados)
            if (divCardAnimaisAdotados.classList) divCardAnimaisAdotados.classList.add("card-animais-adotados");
            else divCardAnimaisAdotados.className += " card-animais-adotados"

            let divInformacoesAdotante = document.createElement('div')
            divCardAnimaisAdotados.appendChild(divInformacoesAdotante)
            if (divInformacoesAdotante.classList) divInformacoesAdotante.classList.add("informacoes-adotante");
            else divInformacoesAdotante.className += " informacoes-adotante"

            let divTextAdotante = document.createElement('div')
            divInformacoesAdotante.appendChild(divTextAdotante)
            if (divTextAdotante.classList) divTextAdotante.classList.add("text-adotante");
            else divTextAdotante.className += " text-adotante";

            let pNomeAdotante = document.createElement('p')
            pNomeAdotante.innerHTML = element.adotante.nome
            divTextAdotante.appendChild(pNomeAdotante)

            let pIdadeAdotante = document.createElement('p')
            pIdadeAdotante.innerHTML = calcIdade(element.adotante.dataNascimento)
            divTextAdotante.appendChild(pIdadeAdotante)

            let pCidadeAdotante = document.createElement('p')
            pCidadeAdotante.innerHTML = element.adotante.endereco.cidade
            divTextAdotante.appendChild(pCidadeAdotante)

            let divImagemAdotante = document.createElement('div')
            divInformacoesAdotante.appendChild(divImagemAdotante)
            if (divImagemAdotante.classList) divImagemAdotante.classList.add("imagem-adotante");
            else divImagemAdotante.className += " imagem-adotante";

            let imgAdotante = document.createElement('img')
            imgAdotante.src = element.adotante.urlImagem
            divImagemAdotante.appendChild(imgAdotante)

            let divContainerCasa = document.createElement('div')
            divCardAnimaisAdotados.appendChild(divContainerCasa)
            if (divContainerCasa.classList) divContainerCasa.classList.add("container-casa");
            else divContainerCasa.className += " container-casa";

            let divLinhaCasa = document.createElement('div')
            divContainerCasa.appendChild(divLinhaCasa)
            if (divLinhaCasa.classList) divLinhaCasa.classList.add("linha-casa");
            else divLinhaCasa.className += " linha-casa";

            let divImgCasaAdocao = document.createElement('div')
            divContainerCasa.appendChild(divImgCasaAdocao)
            if (divImgCasaAdocao.classList) divImgCasaAdocao.classList.add("img-casa-adocao");
            else divImgCasaAdocao.className += " img-casa-adocao";

            let imgCasaAdocao = document.createElement('img')
            imgCasaAdocao.src = "../../imagens/geral/casa-azul.svg"
            divImgCasaAdocao.appendChild(imgCasaAdocao)

            let divDadosPet = document.createElement('div')
            divCardAnimaisAdotados.appendChild(divDadosPet)
            if (divDadosPet.classList) divDadosPet.classList.add("dados-pet");
            else divDadosPet.className += " dados-pet";

            let divImgPet = document.createElement('div')
            divDadosPet.appendChild(divImgPet)
            if (divImgPet.classList) divImgPet.classList.add("img-pet");
            else divImgPet.className += " img-pet";

            let imgPet = document.createElement('img')
            imgPet.src = element.animal.urlImagem
            divImgPet.appendChild(imgPet)

            let divTextoPet = document.createElement('div')
            divDadosPet.appendChild(divTextoPet)
            if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
            else divTextoPet.className += " texto-pet";

            let pNomePet = document.createElement('p')
            pNomePet.innerHTML = element.animal.nome
            divTextoPet.appendChild(pNomePet)

            let pIdadePet = document.createElement('p')
            pIdadePet.innerHTML = calcIdade(element.animal.dataNascimento)
            divTextoPet.appendChild(pIdadePet)

            let divSexoPet = document.createElement('div')
            divTextoPet.appendChild(divSexoPet)
            if (divSexoPet.classList) divSexoPet.classList.add("sexo-pet");
            else divSexoPet.className += " sexo-pet";

            let pSexoPet = document.createElement('p')
            pSexoPet.innerHTML = element.animal.genero === "Femea" ? "FÊMEA" : "MACHO"
            divSexoPet.appendChild(pSexoPet)

            let imgSexoPet = document.createElement('img')
            imgSexoPet.src = imgSexoPet.src = "../../imagens/adocoes/sexo-masculino.svg"
            //element.animal.genero === "Femea" ? "../../imagens/adocoes/sexo-feminino.svg" : "../../imagens/adocoes/sexo-masculino.svg"
            divSexoPet.appendChild(imgSexoPet)
        });
    }
}

