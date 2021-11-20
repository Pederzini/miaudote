let login_usuario;

function redirecionar_login() {
    console.log("Redirecionado para a tela de login")
    window.location.href = '../login/login.html';
}

function validarSessao() {

    // login_usuario = localStorage.getItem('login_usuario');
    login_usuario = sessionStorage.login_usuario

    if (login_usuario == undefined) {
        logoff();
    } else {
        let nome = document.getElementById("nome")
        nome.innerHTML = `${JSON.parse(login_usuario).nomeResponsavel}`
        console.log(JSON.parse(login_usuario).nomeResponsavel)
    }

        
}

function logoff() {
    sessionStorage.clear();
    redirecionar_login();
}

// MODAL
// Get the modal
var modal = document.getElementById("modalCadastro");
// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("close")[0];

function redirecionarCadastro() {
    modal.style.display = "block"; 
    document.querySelector("body").style.overflow = 'hidden';
    // Abrir MODAL
    //modal -> 1 pra escolher o importação
    // -> outro pra cadastro animal link embaixo
    // window.location.href= "../cadastro-pet/cadastro-pet.html"
}

function cadastroForm() {
    window.location.href= "../cadastro-pet/cadastro-pet.html"
}

function cadastroArq() {
    window.location.href= "../tela-importacao/importacao.html"
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
    window.location.href= `http://localhost:8080/miaudote/animais/relatorio/${cnpj}`
}
