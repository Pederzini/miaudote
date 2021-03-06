let fotosPet = [];
let idAnimal = sessionStorage.cardAnimal;

function topo() {
    window.scrollTo(0, 0)
}

function mostraLoading() {
    document.getElementsByClassName('loading')[0].style.display = "flex"
}
  
function escondeLoading() {
    document.getElementsByClassName('loading')[0].style.display = "none"
}

function redirecionarTela() {
    sessionStorage.trocaMenu = 2
    window.location.href = "../adocoes.html"
}

function redirecionarEditar() {
    sessionStorage.idEdicao = idAnimal
    window.location.href = "../editar-pet.html"
}

function organizaFotos() {
    let fotoPrincipal = document.getElementById('fotoPrincipal')
    let imagemPrincipal = fotoPrincipal.style.backgroundImage;
    let divFotos = document.querySelectorAll('.foto')
    let fotos = document.querySelectorAll('.imagem')
    fotos.forEach(element => {
        if (element.src != "https://i.imgur.com/s8t0M4S.png") {
            element.addEventListener("mouseover", function (event) {
                divFotos[element.getAttribute('value')].style.borderColor = "#FF7D73"
                fotoPrincipal.style.backgroundImage = `url(${element.src})`
            }, false);
        }
        
        if (element.src != "https://i.imgur.com/s8t0M4S.png") {
            element.addEventListener("mouseout", function (event) {
                divFotos[element.getAttribute('value')].style.borderColor = "#8F7FAC"
                fotoPrincipal.style.backgroundImage = imagemPrincipal
            }, false);
        } 
    });
}

function calcIdade(data) {

    let split = data.split('/')
    data = split[1] + "/" + split[0] + "/" + split[2]

    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
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

function getInfosPet() {
    mostraLoading()
    axios.get(`https://ec2-44-198-214-72.compute-1.amazonaws.com:8443/miaudote/animais/${idAnimal}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        let idade = calcIdade(response.data.dataNascimento)
        let sexo = response.data.genero

        campo_nome.innerHTML = response.data.nome.toUpperCase()
        campo_idade.innerHTML = idade == 1 ? `${idade} ano` : `${idade} anos`
        campo_porte.innerHTML = response.data.porte
        campo_chegada.innerHTML = response.data.dataChegada
        campo_castrado.innerHTML = response.data.castrado
        campo_sexo.innerHTML = sexo == "Femea" ? "F??mea" : "Macho"
        campo_pelagem.innerHTML = response.data.tipoPelagem
        campo_comportamento.innerHTML = response.data.comportamento
        campo_vacinacao.innerHTML = response.data.vacinado
        campo_necessidades.innerHTML = response.data.necessidadeEspeciais
        campo_descricao.innerHTML = response.data.descricao
        img_pet.src = response.data.especie != "Gato" ? "../imagens/geral/dog-rosa.svg" : "../imagens/geral/cat-rosa.svg"

        if(response.data.urlImagem != null) {
            fotosPet = response.data.urlImagem.split(',')
          }
        let divFotoPrincipal = document.getElementById('fotoPrincipal')
        divFotoPrincipal.style.backgroundImage = fotosPet.length > 0 ? `url(${fotosPet[0]})` : "url(https://i.imgur.com/s8t0M4S.png)"
        let fotos = document.querySelectorAll('.imagem')
        for (let index = 0; index < fotosPet.length; index++) {
            if (index + 1 != fotosPet.length) {
                fotos[index].src = fotosPet[index + 1]
            }
        }
        organizaFotos()
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informa????es da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    })
}

