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