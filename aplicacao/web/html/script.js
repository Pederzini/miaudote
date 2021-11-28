let login_usuario;

function redirecionar_login() {
    console.log("Redirecionado para a tela de login")
    window.location.href = '../login/login.html';
}

function validarSessao() {
    login_usuario = sessionStorage.login_usuario;

    let login = document.querySelectorAll('.btn-login')
    login.forEach(element => {
        element.addEventListener('click', () => {
            if ('nomeResponsavel' in JSON.parse(login_usuario)) {
                window.location.href = '../tela-edicao-ong/edicao-ong.html'
            } else {
                window.location.href = '../tela-edicao-adotante/tela-edicao-adotante.html'
            }
        })
    });

    if (login_usuario == undefined) {
        logoff();
    } else {
        let nomeResponsa = JSON.parse(login_usuario).nomeResponsavel;
        let nome = document.querySelectorAll("#nome");
        if (nomeResponsa == undefined) {
            nome.forEach(element => {
                element.innerHTML = `${JSON.parse(login_usuario).nome.split(" ")[0]}}`;
            });
        } else {
            nome.forEach(element => {
                element.innerHTML = `${JSON.parse(login_usuario).nomeResponsavel.split(" ")[0]}}`;
            });
        }
    }
}

function logoff() {
    sessionStorage.clear();
    redirecionar_login();
}
