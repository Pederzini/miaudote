function topo() {
    window.scrollTo(0, 0)
  }

function getQtdAnimais() {
    let qtdAnimais = document.querySelectorAll("#qtdAnimais")

    axios.get(`https://ec2-44-198-214-72.compute-1.amazonaws.com:8443/miaudote/ongs/${JSON.parse(sessionStorage.login_usuario).cnpj}/numero-adotados`, {
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
    window.location.href = "../cards-ong.html"
}