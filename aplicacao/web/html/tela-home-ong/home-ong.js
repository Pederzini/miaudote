function getQtdAnimais() {
    let qtdAnimais = document.querySelectorAll("#qtdAnimais")

    axios.get(`http://localhost:8080/miaudote/ongs/${JSON.parse(sessionStorage.login_usuario).cnpj}/numero-adotados`, {
      headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        qtdAnimais[0].innerHTML = `${response.data}`
        qtdAnimais[1].innerHTML = `${response.data}`       
    }).catch(function (error) {
        qtdAnimais[0].innerHTML = `13`
        qtdAnimais[1].innerHTML = `13`
    })
}

function referenciaMeuPets() {
    window.location.href = "../tela-card-adocoes-ong/cards-ong.html"
}