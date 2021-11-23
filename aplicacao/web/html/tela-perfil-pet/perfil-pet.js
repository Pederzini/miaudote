// MODAL
// Get the modal
var modal = document.getElementById("modalCartao");
var modalA = document.getElementById("modalAjuda");
// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("close")[0];
var fecharA = document.getElementsByClassName("closeA")[0];

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
  } else if (event.target == modalA){
    modalA.style.display = "none";
      document.querySelector("body").style.overflow = 'visible';
  }
}
var idAnimal = 1;

function queroAdotar() {
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
  axios.get(`http://localhost:8080/miaudote/animais/perfil-animal/${JSON.parse(sessionStorage.login_usuario).idAdotante}/${idAnimal}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
      console.log(response)
      document.getElementById("modal-card-logo").src = response.data.urlImagem;
      document.getElementById("modal-nome-ong").innerHTML = response.data.razaoSocial;
      document.getElementById("modal-ano-ong").innerHTML = response.data.dataFundacao;
      document.getElementById("modal-endereco-ong").innerHTML = response.data.cidade;
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao abrir a ONG escolhida',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
  
}

//var idAnimal = sessionStorage.getItem(idAnimal) -> ARRUMAR
function patchMetodoContato(contato) {
  // ver como pegar o idAnimal 
  axios.patch(`http://localhost:8080/miaudote/adocoes/inicia-processo-adocao/${JSON.parse(sessionStorage.login_usuario).idAdotante}/${idAnimal}/${contato}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
      console.log(response)
      
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao abrir a ONG escolhida',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function apiWhats() {
  //TODO - meotdo de api pra qndo clicar, abre o whats com MSG 
}

function apiEmail(params) {
  //TODO - meotdo de api pra qndo clicar, abre o email com MSG 
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

// primeiro caso: idAdotante 1 idAnimal 26
// segundo caso: idAdotante: 1 idAnimal 17
// terceiro caso: idAdotante: 1 idAnimal 6

let idAdotante = 1
let idAnimalTeste = 26

function getInfosPet() {
  axios.get(`http://localhost:8080/miaudote/animais/perfil-animal/${idAnimalTeste}/${idAdotante}`, {
      headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
  }).then(response => {
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
      response.data.animal.necessidadeEspeciais  == "" ? necessidade.style.display = "none" : campo_necessidadesEspeciais.innerHTML = response.data.animal.necessidadeEspeciais
      campo_descricao.innerHTML = response.data.animal.descricao
      img_pet.src = response.data.animal.especie != "Gato" ? "../../imagens/geral/dog-rosa.svg" : "../../imagens/geral/cat-rosa.svg"
      img_favorito.src = 'favoritado' in response.data == true ? "../../imagens/geral/icon-coracao-vermelho.svg" : "../../imagens/geral/coracao-cinza.svg"

      fotosPet = response.data.animal.urlImagem.split(',')
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

