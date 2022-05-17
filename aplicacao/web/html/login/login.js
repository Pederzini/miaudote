window.onload = function () {
  let inputs = document.querySelectorAll('.campos')
  inputs.forEach(element => {

    element.addEventListener('blur', function () {
      trocaCorBorda(element)
    })

  });
}


function mostraLoading() {
  document.getElementsByClassName('loading')[0].style.display = "flex"
}

function escondeLoading() {
  document.getElementsByClassName('loading')[0].style.display = "none"
}

function exibeSenha() {
  var passwordInput = document.getElementById('campo_senha');
  var passStatus = document.getElementById('status-senha');
  var iconeOlhoOn = document.getElementById('eye-icon-on');
  var iconeOlhoOff = document.getElementById('eye-icon-off');

  if (passwordInput.type == 'password') {
    passwordInput.type = 'text';
    iconeOlhoOn.style.display = 'none'
    iconeOlhoOff.style.display = 'block'

  } else {
    passwordInput.type = 'password';
    iconeOlhoOn.style.display = 'block'
    iconeOlhoOff.style.display = 'none'

  }
}

function trocaCorBorda(elemento) {
  if (elemento.value != "") {
    elemento.style.borderColor = '#949494';
  }
}

function verificaCamposVazios() {

  let inputs = document.querySelectorAll('.campos')
  let valido = true;

  inputs.forEach(element => {

    if (!element.validity.valid) {
      element.style.borderColor = '#ff0000';
      valido = false;
    }

  });

  return valido
}

function postLogin() {
  var camposVazios = verificaCamposVazios()

  if (!camposVazios) {
    Swal.fire({
      title: 'Campo(s) vazio(s)!',
      text: 'Não deixe nenhum campo vazio',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#8675A5'
    })
  } else {
    var email = document.getElementById("campo_email").value;
    var senha = document.getElementById("campo_senha").value;

    var usuario = document.getElementById("radio_ong").checked == true ? "ongs" : "adotantes"
    mostraLoading()
    axios.post(`ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/${usuario}/login`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "crossorigin": true
      },
      "email": email,
      "senha": senha,
    }).then(response => {
      sessionStorage.login_usuario = JSON.stringify(response.data)
      sessionStorage.trocaMenu = 1
      if (usuario == "ongs") {
        window.location.href = "../tela-home-ong/home-ong.html"
      } else {
        window.location.href = "../home-adotante/home-adotante.html"
      }
      escondeLoading()
    }).catch(function (error) {
      escondeLoading()
      Swal.fire({
        title: error.response.data,
        text: 'Email ou senha inválidos',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#8675A5'
      })
    })
  }
}

function linkTela(tela) {
  switch (tela) {
    case "login":
      window.location.href = '../login/index.html';
      break;
    case "ong":
      window.location.href = '../cadastro-ong/cadastro-ong.html';
      break
    case "adotante":
      window.location.href = '../cadastro-adotante/cadastro-adotante.html';
      break
    default:
      break;
  }
}