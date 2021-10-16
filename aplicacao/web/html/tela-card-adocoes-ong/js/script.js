let login_usuario;

function redirecionar_login() {
    console.log("Redirecionado para a tela de login")
    // window.location.href = '../Institucional/login.html';
}

function validarSessao() {

    // login_usuario = localStorage.getItem('login_usuario');
    login_usuario = sessionStorage.login_usuario

    if (login_usuario == undefined) {
        logoff();
    }

    let nome = document.getElementById("nome")

    nome.innerHTML = `${JSON.parse(login_usuario).nomeResponsavel}`
    console.log(JSON.parse(login_usuario).nomeResponsavel)    
}

function logoff() {
    sessionStorage.clear();
    redirecionar_login();
}

function redirecionarCadastro() {
    window.location.href= "../cadastro-pet/cadastro-pet.html"
}

function gerarRelatorio() {
    let cnpj = JSON.parse(login_usuario).cnpj
    window.location.href= `http://localhost:8080/miaudote/animal/relatorio/${cnpj}`
}