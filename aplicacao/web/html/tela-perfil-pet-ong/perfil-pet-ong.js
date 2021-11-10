let fotosPet;

function redirecionarTela() {
    sessionStorage.trocaMenu = 2
    window.location.href = ".././tela-adocoes/adocoes.html"
}

function organizaFotos() {
    let imagemPrincipal = fotoPrincipal.src
    let divFotos = document.querySelectorAll('.foto')
    let fotos = document.querySelectorAll('.imagem')
    fotos.forEach(element => {
        if (element.src != "https://i.imgur.com/s8t0M4S.png") {
            element.addEventListener("mouseover", function (event) {
                divFotos[element.getAttribute('value')].style.borderColor = "#FF7D73"
                fotoPrincipal.src = element.src
            }, false);
        }
        
        if (element.src != "https://i.imgur.com/s8t0M4S.png") {
            element.addEventListener("mouseout", function (event) {
                divFotos[element.getAttribute('value')].style.borderColor = "#8F7FAC"
                fotoPrincipal.src = imagemPrincipal
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

let idAnimal = 61

function getInfosPet() {
    axios.get(`http://localhost:8080/miaudote/animais/${idAnimal}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        let idade = calcIdade(response.data.dataNascimento)
        let sexo = response.data.genero

        campo_nome.innerHTML = response.data.nome.toUpperCase()
        campo_idade.innerHTML = idade == 1 ? `${idade} ano` : `${idade} anos`
        campo_porte.innerHTML = response.data.porte
        campo_chegada.innerHTML = response.data.dataChegada
        campo_castrado.innerHTML = response.data.castrado
        campo_sexo.innerHTML = sexo == "Femea" ? "Fêmea" : "Macho"
        campo_pelagem.innerHTML = response.data.tipoPelagem
        campo_comportamento.innerHTML = response.data.comportamento
        campo_vacinacao.innerHTML = response.data.vacinado
        campo_necessidades.innerHTML = response.data.necessidadeEspeciais
        campo_descricao.innerHTML = response.data.descricao
        img_pet.src = response.data.especie != "Gato" ? "../../imagens/geral/dog-rosa.svg" : "../../imagens/perfil-animal/cat-rosa.svg"

        fotosPet = response.data.urlImagem.split(',')
        fotoPrincipal.src = fotosPet[0].length > 0 ? fotosPet[0] : "https://i.imgur.com/s8t0M4S.png"
        let fotos = document.querySelectorAll('.imagem')
        for (let index = 0; index < fotosPet.length; index++) {
            if (index + 1 != fotosPet.length) {
                fotos[index].src = fotosPet[index + 1]
            }
        }
        organizaFotos()

    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}
