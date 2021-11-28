function getQtdAnimais() {
    mostraLoading();
    let qtdAnimais = document.querySelectorAll("#qtdAnimais")

    axios.get(`http://localhost:8080/miaudote/ongs/${JSON.parse(sessionStorage.login_usuario).cnpj}/numero-adotados`, {
      headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        escondeLoading();
        qtdAnimais[0].innerHTML = `${response.data}`
        qtdAnimais[1].innerHTML = `${response.data}`       
    }).catch(function (error) {
        escondeLoading();
        qtdAnimais[0].innerHTML = `13`
        qtdAnimais[1].innerHTML = `13`
    })
}

function referenciaMeuPets() {
    window.location.href = "../tela-card-adocoes-ong/cards-ong.html"
}

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
        if (progresso == 100) {
            progresso = 0;
        } else {
            progresso += 20;
        }
    }

    window.setInterval(function () {
        alteraValor();
    }, 500);
}

function escondeLoading() {
    document.getElementsByClassName('ldBar')[0].style.display = "none"
    document.getElementsByClassName('loading')[0].style.display = "none"
}