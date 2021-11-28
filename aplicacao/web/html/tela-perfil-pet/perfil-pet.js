var telOng;
var emailOng;
var nomePet;
var fotoPet;
let fotosPet = [];
let idAnimal = sessionStorage.cardAnimalAdotante
let idAdotante = JSON.parse(sessionStorage.login_usuario).idAdotante
let favoritado;

// MODAL
// Get the modal
var modal = document.getElementById("modalCartao");
var modalA = document.getElementById("modalAjuda");
// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("close")[0];
var fecharA = document.getElementsByClassName("closeA")[0];

function mostraLoading() {
  let progresso = 0;
  var bar = new ldBar(".myBar", {"value": 0});
  
  document.getElementsByClassName('ldBar-label')[0].style.display = "none"
  document.getElementsByClassName('ldBar')[0].style.display = "flex";
  document.getElementsByClassName('loading')[0].style.display = "flex"
  function alteraValor() {
      bar.set(
          progresso,
          false
      )
      if (progresso >= 100) {
          progresso = 0;
      } else {
          progresso += 20;
      }
  }

  window.setInterval(function () {
      alteraValor();
  }, 700);
}

function escondeLoading() {
  document.getElementsByClassName('ldBar')[0].style.display = "none"
  document.getElementsByClassName('loading')[0].style.display = "none"
}

// When the user clicks on <div> (x), close the modal
fechar.onclick = function () {
  modal.style.display = "none";
  document.querySelector("body").style.overflow = 'visible';
}

fecharA.onclick = function () {
  modalA.style.display = "none";
  document.querySelector("body").style.overflow = 'visible';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("body").style.overflow = 'visible';
  } else if (event.target == modalA) {
    modalA.style.display = "none";
    document.querySelector("body").style.overflow = 'visible';
  }
}
// var idAnimal = 1;

function topo() {
  window.scrollTo(0, 0)
}

function queroAdotar(idAnimal) {
  getOngAnimal(idAnimal)
  modal.style.display = "block";
  document.querySelector("body").style.overflow = 'hidden';
}

function queroAjudar() {
  getOngAnimal(idAnimal)
  modalA.style.display = "block";
  document.querySelector("body").style.overflow = 'hidden';
}

function getOngAnimal(idAnimal) {
  axios.get(`http://localhost:8080/miaudote/ongs/${idAnimal}/contato-ong`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true
    },
  }).then(response => {
    document.querySelectorAll("#modal-card-logo")[0].src = response.data.urlImagem;
    document.querySelectorAll("#modal-nome-ong")[0].innerHTML = response.data.razaoSocial;
    document.querySelectorAll("#modal-ano-ong")[0].innerHTML = response.data.dataFundacao;
    document.querySelectorAll("#modal-endereco-ong")[0].innerHTML = response.data.cidade;

    document.querySelectorAll("#modal-card-logo")[1].src = response.data.urlImagem;
    document.querySelectorAll("#modal-nome-ong")[1].innerHTML = response.data.razaoSocial;
    document.querySelectorAll("#modal-ano-ong")[1].innerHTML = response.data.dataFundacao;
    document.querySelectorAll("#modal-endereco-ong")[1].innerHTML = response.data.cidade;
    telOng = response.data.telefone;
    emailOng = response.data.email;
  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao abrir a ONG escolhida',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#8675A5'
    })
  })

}

//var idAnimal = sessionStorage.getItem(idAnimal) -> ARRUMAR
function patchMetodoContato(contato) {
  axios.patch(`http://localhost:8080/miaudote/adocoes/inicia-processo-adocao/${JSON.parse(sessionStorage.login_usuario).idAdotante}/${idAnimal}/${contato}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true
    },
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao abrir a ONG escolhida',
      icon: 'warning',
      confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
    })
  })
}
var seunumerodetelefone = "11998381032"

function apiWhats(botaoModal) {
  var msg = "";
  if (botaoModal == "adotar") {
    msg = `Olá! Gostaria de adotar o pet ${nomePet} ${fotoPet}`;
  } else {
    msg = `Olá! Gostaria de apoiar a ONG! Como posso ajudar?`
  }
  window.open(`https://api.whatsapp.com/send?phone=55${seunumerodetelefone}&text=${msg}`, '_blank');
  //TODO - meotdo de api pra qndo clicar, abre o whats com MSG 
}

function apiEmail(botaoModal) {
  var assuntoEmail = "";
  var msg = "";
  if (botaoModal == "adotar") {
    assuntoEmail = "Quero adotar um pet!"
    msg = `Olá! Gostaria de adotar o pet ${nomePet} ${fotoPet}`;
  } else {
    assuntoEmail = "Quero ajudar a ONG!"
    msg = `Olá! Gostaria de apoiar a ONG! Como posso ajudar?`
  }
  window.open(`mailto:${emailOng}?subject=${assuntoEmail}&body=${msg}`);
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

function getInfosPet() {
  mostraLoading()
  axios.get(`http://localhost:8080/miaudote/animais/perfil-animal/${idAnimal}/${idAdotante}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true
    },
  }).then(response => {
    if (response.data.animal == undefined) {
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
      response.data.necessidadeEspeciais == "" ? necessidade.style.display = "none" : campo_necessidadesEspeciais.innerHTML = response.data.necessidadeEspeciais
      campo_descricao.innerHTML = response.data.descricao
      img_pet.src = response.data.especie != "Gato" ? "../../imagens/geral/dog.svg" : "../../imagens/geral/cat.svg"
      img_favorito.src = 'favoritado' in response.data == true ? "../../imagens/geral/icon-coracao-vermelho.svg" : "../../imagens/geral/coracao-cinza.svg"
      favoritado = 'favoritado' in response.data == true ? true : false;

      if (response.data.urlImagem != null) {
        fotosPet = response.data.urlImagem.split(',')
      }
      nomePet = response.data.nome.toUpperCase();
    } else {
      console.log(response.data)
      let idade = calcIdade(response.data.animal.dataNascimento)
      let sexo = response.data.animal.genero

      campo_nome.innerHTML = response.data.animal.nome.toUpperCase()
      campo_idade.innerHTML = idade == 1 ? `${idade} ano` : `${idade} anos`
      campo_porte.innerHTML = response.data.animal.porte
      campo_chegada.innerHTML = response.data.animal.dataChegada
      campo_castrado.innerHTML = response.data.animal.castrado
      campo_sexo.innerHTML = sexo == "Femea" ? "Fêmea" : "Macho"
      campo_pelagem.innerHTML = response.data.animal.tipoPelagem
      campo_comportamento.innerHTML = response.data.animal.comportamento
      campo_vacinacao.innerHTML = response.data.animal.vacinado
      response.data.animal.necessidadeEspeciais == "" ? necessidade.style.display = "none" : campo_necessidadesEspeciais.innerHTML = response.data.animal.necessidadeEspeciais
      campo_descricao.innerHTML = response.data.animal.descricao
      img_pet.src = response.data.animal.especie != "Gato" ? "../../imagens/geral/dog.svg" : "../../imagens/geral/cat.svg"
      img_favorito.src = 'favoritado' in response.data == true ? "../../imagens/geral/icon-coracao-vermelho.svg" : "../../imagens/geral/coracao-cinza.svg"
      favoritado = 'favoritado' in response.data == true ? true : false;

      if (response.data.animal.urlImagem != null) {
        fotosPet = response.data.animal.urlImagem.split(',')
      }
      nomePet = response.data.animal.nome.toUpperCase()
    }
    document.getElementById('fotoPrincipal').style.backgroundImage = fotosPet.length > 0 ? `url(${fotosPet[0]})` : "url(https://i.imgur.com/s8t0M4S.png)"
    let fotos = document.querySelectorAll('.imagem')
    for (let index = 0; index < fotosPet.length; index++) {
      if (index + 1 != fotosPet.length) {
        fotos[index].src = fotosPet[index + 1]
      }
    }
    organizaFotos()

    //envia nome e foto do animal

    fotoPet = fotosPet.length > 0 ? fotosPet[0] : ""
    escondeLoading()
    // apiWhats()
    // apiEmail()
  }).catch(function (error) {
    escondeLoading()
    Swal.fire({
      title: error.response,
      text: 'Erro ao carregar as informações da ONG',
      icon: 'warning',
      confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
    })
  })
}

function getAdotar() {
  axios.get(`http://localhost:8080/miaudote/adocoes/verifica-existencia-processo/${idAdotante}/${idAnimal}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true
    },
  }).then(response => {
    console.log(response.data)

    Swal.fire({
      title: response.data,
      // text: 'Erro ao carregar as informações da ONG',
      icon: 'info',
      confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
    })

  }).catch(error => {

    if (error.response.status == 404) {
      queroAdotar(idAnimal)
    } else {
      Swal.fire({
        title: error.response,
        text: 'Erro ao carregar as informações',
        icon: 'warning',
        confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
      })
    }

  })
}

function verificarFavorito() {

  if (favoritado) {
    desfavoritar();
    favoritado = false
  } else {
    favoritar();
    favoritado = true
  }
}

function favoritar() {
  axios.patch(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).idAdotante}/favoritar/${idAnimal}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true,
    },
  }).then(response => {
    img_favorito.src = "../../imagens/geral/icon-coracao-vermelho.svg"
  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao favoritar o animal. Tente novamente!',
      icon: 'warning',
      confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
    })
  })
}

function desfavoritar() {
  axios.patch(`http://localhost:8080/miaudote/adocoes/${JSON.parse(sessionStorage.login_usuario).idAdotante}/desfavoritar/${idAnimal}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true,
    },
  }).then(response => {
    img_favorito.src = "../../imagens/geral/coracao-cinza.svg"
  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao desfavoritar o animal. Tente novamente!',
      icon: 'warning',
      confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
    })
  })
}