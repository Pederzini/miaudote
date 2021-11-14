function getQtdAnimais() {

    let qtdAnimais = document.querySelectorAll("#qtdAnimais")

    axios.get(`http://localhost:8080/miaudote/animais/numero-adotados`, {
      headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        qtdAnimais[0].innerHTML = `${response.data}`
        qtdAnimais[1].innerHTML = `${response.data}`
    }).catch(function (error) {
        console.log("Erro")
        qtdAnimais[0].innerHTML = `13`
        qtdAnimais[1].innerHTML = `13`
    })
}