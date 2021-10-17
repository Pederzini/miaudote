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

        // se no storage tiver CNPJ, mostrar nomeResponsavel, senao mosstrar nome
        let nome = document.getElementById("nome")

        nome.innerHTML = `${JSON.parse(login_usuario).nomeResponsavel}`
        console.log(JSON.parse(login_usuario).nomeResponsavel)    
    } 
}

function logoff() {
    sessionStorage.clear();
    redirecionar_login();
}
