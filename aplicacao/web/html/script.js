let login_usuario;

function redirecionar_login() {
    console.log("Redirecionado para a tela de login")
    window.location.href = '../login/login.html';
}

function validarSessao() {
    login_usuario = sessionStorage.login_usuario;

    if (login_usuario == undefined) {
        logoff();
    } else {
        let nomeResponsa = JSON.parse(login_usuario).nomeResponsavel;
        let nome = document.getElementById("nome");
        if (nomeResponsa == undefined) {
            nome.innerHTML = `${JSON.parse(login_usuario).nome}`;
        } else {
            nome.innerHTML = `${JSON.parse(login_usuario).nomeResponsavel}`;  
        }        
    } 
}

function logoff() {
    sessionStorage.clear();
    redirecionar_login();
}
