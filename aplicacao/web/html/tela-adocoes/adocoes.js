let dadosFavoritados = []
let dadosProcesso = []
let dadosAdotados = []

let dadosFavoritosModal = []
let dadosAdoInteressado = []

function topo() {
    window.scrollTo(0, 0)
}

function mostraLoading() {
    document.getElementsByClassName('loading')[0].style.display = "flex"
  }
  
  function escondeLoading() {
    document.getElementsByClassName('loading')[0].style.display = "none"
  }

function trocaMenu(valor) {

    sessionStorage.trocaMenu = 1
    let todasDivs = document.querySelectorAll('.opcoes-adocoes');

    const divs = [document.querySelectorAll('.card-animais-favoritos'),
        document.querySelectorAll('.card-processo-adocao'),
        document.querySelectorAll('.card-animais-adotados')
    ]

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

function apagarDivs() {
    let div = document.querySelectorAll('.card-processo-adocao')
    div.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function calcIdade(data, type) {

    dataParaCalcular = data

    if (type == "adotante") {
        while (dataParaCalcular.length > 10) dataParaCalcular = dataParaCalcular.slice(0, -1);
        dataParaCalcular = dataParaCalcular.replaceAll('-', '/')
    } else {
        let split = data.split('/')
        dataParaCalcular = split[1] + "/" + split[0] + "/" + split[2]
    }

    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        data_americana = new Date(dataParaCalcular),
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

function formataTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ""); //Remove tudo o que não é dígito
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos

    return telefone
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
    mostraLoading()
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/animais-favoritados`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        dadosFavoritados = []
        for (let index = 0; index < response.data.length; index++) {
            dadosFavoritados[index] = response.data[index];
        }
        mostrarDivs(1)
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações de favoritos',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function getInfosEmProcesso() {
    mostraLoading()
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/adocoes-em-processo`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        dadosProcesso = []
        for (let index = 0; index < response.data.length; index++) {
            dadosProcesso[index] = response.data[index];
        }
        mostrarDivs(2)
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações dos em processo',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function getInfosAdotados() {
    mostraLoading()
    axios.get(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).cnpj}/adocoes-concluidas`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        dadosAdotados = []
        for (let index = 0; index < response.data.length; index++) {
            dadosAdotados[index] = response.data[index];
        }
        mostrarDivs(3)
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações dos adotados',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function patchAdotou(idAdocao) {
    mostraLoading()
    axios.patch(`http://localhost:8080/miaudote/adocoes/finaliza-adocao/${idAdocao}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        apagarDivs()
        getInfosEmProcesso()
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao atualizar o adotou',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function patchNaoAdotou(idAdocao) {
    mostraLoading()
    axios.patch(`http://localhost:8080/miaudote/adocoes/cancela-adocao/${idAdocao}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        apagarDivs()
        getInfosEmProcesso()
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao atualizar o nao adotou',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function getQuemFavoritou(idAnimal) {
    axios.get(`http://localhost:8080/miaudote/adocoes/${idAnimal}/pessoas-que-favoritaram`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        dadosFavoritosModal = []
        for (let index = 0; index < response.data.length; index++) {
            dadosFavoritosModal[index] = response.data[index];
        }
        mostrarModalDiv(idAnimal)
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações do animal',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function getQuemInteressouFav(idAdotante) {
    axios.get(`http://localhost:8080/miaudote/adocoes/${idAdotante}/informacoes-pessoa-que-favoritou`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        document.getElementById("card-foto-adotante").src = response.data.urlImagem;
        document.getElementById("adotante-nome").innerHTML = response.data.nome;
        document.getElementById("adotante-idade").innerHTML = calcIdade(response.data.dataNascimento, "adotante");
        document.getElementById("adotante-endereco").innerHTML = response.data.endereco.cidade;
        document.getElementById("modal-mail-adotante").innerHTML = response.data.email;
        document.getElementById("modal-tel-adotante").innerHTML = formataTelefone(response.data.telefone);
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações dos adotados',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}

function mostrarModalDiv(idAnimal) {
    var contador = 0;
    dadosFavoritosModal.forEach(element => {
        if (element.animal.idAnimal == idAnimal) {
            let div = document.querySelector(".modal-conteudo")

            if (contador < 1) {
                let divModalTituloFav = document.createElement('div')
                div.appendChild(divModalTituloFav)
                if (divModalTituloFav.classList) divModalTituloFav.classList.add("modal-titulo");
                else divModalTituloFav.className += " modal-titulo";

                let nomePet = document.createElement('span')
                nomePet.innerHTML = "QUEM FAVORITOU: " + element.animal.nome
                divModalTituloFav.appendChild(nomePet)
                contador++;
            }

            let divModalConteudo = document.createElement('div')
            div.appendChild(divModalConteudo)
            if (divModalConteudo.classList) divModalConteudo.classList.add("modal-card");
            else divModalConteudo.className += " modal-card";

            let divModalCardConteudo = document.createElement('div')
            divModalConteudo.appendChild(divModalCardConteudo)
            if (divModalCardConteudo.classList) divModalCardConteudo.classList.add("modal-card-conteudo");
            else divModalCardConteudo.className += " modal-card-conteudo";

            let divFotoCard = document.createElement('img')
            divModalCardConteudo.appendChild(divFotoCard)
            if (divFotoCard.classList) divFotoCard.classList.add("modal-card-img");
            else divFotoCard.className += " modal-card-img";

            let fotoAdotante;

            if (element.adotante.urlImagem === null) {
                fotoAdotante = "https://i.imgur.com/s8t0M4S.png"
            } else {
                fotoAdotante = element.adotante.urlImagem
            }

            divFotoCard.src = fotoAdotante

            let divConteudoTexto2 = document.createElement('div')
            divModalConteudo.appendChild(divConteudoTexto2)
            if (divConteudoTexto2.classList) divConteudoTexto2.classList.add("modal-card-conteudo2");
            else divConteudoTexto2.className += " modal-card-conteudo2";

            let divCardTexto = document.createElement('div')
            divConteudoTexto2.appendChild(divCardTexto)
            if (divCardTexto.classList) divCardTexto.classList.add("modal-card-texto");
            else divCardTexto.className += " modal-card-texto";

            let nomeAdotante = document.createElement('p')
            nomeAdotante.innerHTML = element.adotante.nome
            divCardTexto.appendChild(nomeAdotante)

            let idade = document.createElement('p')
            idade.innerHTML = calcIdade(element.adotante.dataNascimento, "adotante")
            divCardTexto.appendChild(idade)

            let moradia = document.createElement('p')
            moradia.innerHTML = element.adotante.endereco.cidade
            divCardTexto.appendChild(moradia)
        }
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

            let imagemAnimal;

            if (element.url === null) {
                imagemAnimal = "https://i.imgur.com/s8t0M4S.png"
            } else if (element.url.includes(',')) {
                let imagem = element.url.split(',')
                imagemAnimal = imagem[0]
            } else {
                imagemAnimal = element.url
            }

            let imgPet = document.createElement('img')
            imgPet.src = imagemAnimal
            divImgPet.appendChild(imgPet)

            let divTextoPet = document.createElement('div')
            divDadosPet.appendChild(divTextoPet)
            if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
            else divTextoPet.className += " texto-pet";

            let pThor = document.createElement('p')
            pThor.innerHTML = element.nome
            divTextoPet.appendChild(pThor)

            let pAnos = document.createElement('p')
            pAnos.innerHTML = element.idadeAnimal + (element.idadeAnimal == 1 ? " ano" : " anos")
            divTextoPet.appendChild(pAnos)

            let divSexoPet = document.createElement('div')
            divTextoPet.appendChild(divSexoPet)
            if (divSexoPet.classList) divSexoPet.classList.add("sexo-pet");
            else divSexoPet.className += " sexo-pet";

            let pSexo = document.createElement('p')
            pSexo.innerHTML = element.genero.toUpperCase() === "F" ? "Fêmea" : "Macho"
            divSexoPet.appendChild(pSexo)

            let imgSexo = document.createElement('img')
            imgSexo.src = element.genero.toUpperCase() === "M" ? "../../imagens/adocoes/sexo-masculino.svg" : "../../imagens/adocoes/sexo-feminino.svg"
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

            divImgFavorito.addEventListener('click', () => {
                getQuemFavoritou(element.idAnimal)
                if (!element.favoritado) {
                    Swal.fire({
                        title: "Ops",
                        text: 'Não há adotantes que favoritaram esse animal',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                } else {
                    abrirModal()
                }
            })

            let divContador = document.createElement('div')
            containerFavorito.appendChild(divContador)
            if (divContador.classList) divContador.classList.add("contador");
            else divContador.className += " contador";

            let pContador = document.createElement('p')
            pContador.innerHTML = element.numFavoritado
            divContador.appendChild(pContador)

            let imgCoracaoVermelho = document.createElement('img')
            imgCoracaoVermelho.src = "../../imagens/geral/icon-coracao-vermelho.svg"
            imgCoracaoVermelho.style = "cursor: pointer;"
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
                getQuemFavoritou(element.idAnimal)
                if (!element.favoritado) {
                    Swal.fire({
                        title: "Ops",
                        text: 'Não há adotantes que favoritaram esse animal',
                        icon: 'warning',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#8675A5'
                    })
                } else {
                    abrirModal()
                }
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

            pIdadeAdotante.innerHTML = calcIdade(element.adotante.dataNascimento, "adotante") + (calcIdade(element.animal.dataNascimento, "animal") == 1 ? " ano" : " anos")
            divTextoAdotante.appendChild(pIdadeAdotante)

            let pCidadeAdotante = document.createElement('p')
            pCidadeAdotante.innerHTML = element.adotante.endereco.cidade
            divTextoAdotante.appendChild(pCidadeAdotante)

            let divImgAdotante = document.createElement('div')
            divDadosAdotante.appendChild(divImgAdotante)
            if (divImgAdotante.classList) divImgAdotante.classList.add("img-adotante");
            else divImgAdotante.className += " img-adotante";

            let imagemAdotante;

            if (element.adotante.urlImagem === null) {
                imagemAdotante = "https://i.imgur.com/s8t0M4S.png"
            } else {
                imagemAdotante = element.adotante.urlImagem
            }

            let imgAdotante = document.createElement('img')
            imgAdotante.src = imagemAdotante
            imgAdotante.style = "cursor: pointer;"
            divImgAdotante.appendChild(imgAdotante)

            divImgAdotante.addEventListener('click', () => {
                getQuemInteressouFav(element.adotante.idAdotante)
                abrirModalAdo()
            })

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
            imgContato.src = element.modoContato === "whatsapp" ? "../../imagens/adocoes/icon-whatsapp.svg" : "../../imagens/adocoes/icon-gmail.svg"
            divImgContato.appendChild(imgContato)

            let divDadosPetProcesso = document.createElement('div')
            divCardProcessoAdocao.appendChild(divDadosPetProcesso)
            if (divDadosPetProcesso.classList) divDadosPetProcesso.classList.add("dados-pet-processo");
            else divDadosPetProcesso.className += " dados-pet-processo";

            let divImgPetProcesso = document.createElement('div')
            divDadosPetProcesso.appendChild(divImgPetProcesso)
            if (divImgPetProcesso.classList) divImgPetProcesso.classList.add("img-pet-processo");
            else divImgPetProcesso.className += " img-pet-processo";

            let imagemAnimal;
            if (element.animal.urlImagem === null) {
                imagemAnimal = "https://i.imgur.com/s8t0M4S.png"
            } else if (element.animal.urlImagem.includes(',')) {
                let imagem = element.animal.urlImagem.split(',')
                imagemAnimal = imagem[0]
            } else {
                imagemAnimal = element.animal.urlImagem
            }

            let imgPetProcesso = document.createElement('img')
            imgPetProcesso.src = imagemAnimal
            divImgPetProcesso.appendChild(imgPetProcesso)

            let divTextoPetProcesso = document.createElement('div')
            divDadosPetProcesso.appendChild(divTextoPetProcesso)
            if (divTextoPetProcesso.classList) divTextoPetProcesso.classList.add("texto-pet-processo");
            else divTextoPetProcesso.className += " texto-pet-processo";

            let pNomePet = document.createElement('p')
            pNomePet.innerHTML = element.animal.nome
            divTextoPetProcesso.appendChild(pNomePet)

            let pIdadePet = document.createElement('p')
            pIdadePet.innerHTML = calcIdade(element.animal.dataNascimento, "animal") + (calcIdade(element.animal.dataNascimento, "animal") == 1 ? " ano" : " anos")
            divTextoPetProcesso.appendChild(pIdadePet)

            let divSexoPetProcesso = document.createElement('div')
            divTextoPetProcesso.appendChild(divSexoPetProcesso)
            if (divSexoPetProcesso.classList) divSexoPetProcesso.classList.add("sexo-pet-processo");
            else divSexoPetProcesso.className += " sexo-pet-processo";

            let pSexoPet = document.createElement('p')
            pSexoPet.innerHTML = element.animal.genero.toUpperCase() === "FEMEA" ? "Fêmea" : "Macho"
            divSexoPetProcesso.appendChild(pSexoPet)

            let imgSexoPetProcesso = document.createElement('img')
            imgSexoPetProcesso.src = element.animal.genero.toUpperCase() === "MACHO" ? "../../imagens/adocoes/sexo-masculino.svg" : "../../imagens/adocoes/sexo-feminino.svg"
            divSexoPetProcesso.appendChild(imgSexoPetProcesso)

            let divContainerBtn = document.createElement('div')
            divCardProcessoAdocao.appendChild(divContainerBtn)
            if (divContainerBtn.classList) divContainerBtn.classList.add("container-bnt");
            else divContainerBtn.className += " container-bnt"

            let btnAdoutou = document.createElement('button')
            divContainerBtn.appendChild(btnAdoutou)
            btnAdoutou.id = "btn-adotou"
            btnAdoutou.addEventListener('click', () => {
                Swal.fire({
                    title: 'Você tem certeza que deseja concluir o processo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#8675A5',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Sim, tenho certeza!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Adotado!',
                            'Seu animal foi adotado com sucesso!',
                            'success'
                        )
                        patchAdotou(element.id)
                    }
                })
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
                Swal.fire({
                    title: 'Você tem certeza que deseja excluir esse processo de adoção?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#8675A5',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Sim, tenho certeza!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Excluido!',
                            'O processo de adoção foi excluido com sucesso!',
                            'success'
                        )
                        patchNaoAdotou(element.id)
                    }
                })

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
            pIdadeAdotante.innerHTML = calcIdade(element.adotante.dataNascimento, "adotante") + (calcIdade(element.animal.dataNascimento, "animal") == 1 ? " ano" : " anos")
            divTextAdotante.appendChild(pIdadeAdotante)

            let pCidadeAdotante = document.createElement('p')
            pCidadeAdotante.innerHTML = element.adotante.endereco.cidade
            divTextAdotante.appendChild(pCidadeAdotante)

            let divImagemAdotante = document.createElement('div')
            divInformacoesAdotante.appendChild(divImagemAdotante)
            if (divImagemAdotante.classList) divImagemAdotante.classList.add("imagem-adotante");
            else divImagemAdotante.className += " imagem-adotante";

            let imagemAdotante;

            if (element.adotante.urlImagem === null) {
                imagemAdotante = "https://i.imgur.com/s8t0M4S.png"
            } else {
                imagemAdotante = element.adotante.urlImagem
            }

            let imgAdotante = document.createElement('img')
            imgAdotante.src = imagemAdotante
            divImagemAdotante.appendChild(imgAdotante)

            divImagemAdotante.addEventListener('click', () => {
                getQuemInteressouFav(element.adotante.idAdotante)
                abrirModalAdo()
            })

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

            let imagemAnimal;
            if (element.animal.urlImagem === null) {
                imagemAnimal = "https://i.imgur.com/s8t0M4S.png"
            } else if (element.animal.urlImagem.includes(',')) {
                let imagem = element.animal.urlImagem.split(',')
                imagemAnimal = imagem[0]
            } else {
                imagemAnimal = element.animal.urlImagem
            }

            let imgPet = document.createElement('img')
            imgPet.src = imagemAnimal
            divImgPet.appendChild(imgPet)

            let divTextoPet = document.createElement('div')
            divDadosPet.appendChild(divTextoPet)
            if (divTextoPet.classList) divTextoPet.classList.add("texto-pet");
            else divTextoPet.className += " texto-pet";

            let pNomePet = document.createElement('p')
            pNomePet.innerHTML = element.animal.nome
            divTextoPet.appendChild(pNomePet)

            let pIdadePet = document.createElement('p')
            pIdadePet.innerHTML = calcIdade(element.animal.dataNascimento, "animal") + (calcIdade(element.animal.dataNascimento, "animal") == 1 ? " ano" : " anos")
            divTextoPet.appendChild(pIdadePet)

            let divSexoPet = document.createElement('div')
            divTextoPet.appendChild(divSexoPet)
            if (divSexoPet.classList) divSexoPet.classList.add("sexo-pet");
            else divSexoPet.className += " sexo-pet";

            let pSexoPet = document.createElement('p')
            pSexoPet.innerHTML = element.animal.genero.toUpperCase() === "FEMEA" ? "FÊMEA" : "MACHO"
            divSexoPet.appendChild(pSexoPet)

            let imgSexoPet = document.createElement('img')
            imgSexoPet.src = imgSexoPet.src = element.animal.genero.toUpperCase() === "FEMEA" ? "../../imagens/adocoes/sexo-feminino.svg" : "../../imagens/adocoes/sexo-masculino.svg"
            divSexoPet.appendChild(imgSexoPet)
        });
    }
}