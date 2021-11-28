let feedbacks = [];

function referenciaMeuPets() {
    window.location.href = "../tela-card-adocoes/tela-card-adocoes.html"
}
function topo() {
    window.scrollTo(0, 0)
  }

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

function getFeedback() {

    let fotoAdotante = document.querySelectorAll('#fotoAdotante')
    let nomeAdotante = document.querySelectorAll('#nomeFeedback')
    let comentarioAdotante = document.querySelectorAll('.comentario')
    let starAdotante1 = document.querySelectorAll("#starFeed1")
    let starAdotante2 = document.querySelectorAll("#starFeed2")

    axios.get(`http://localhost:8080/miaudote/adocoes/feedbacks`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        console.log(response.data)

        fotoAdotante[0].src = response.data[0].adotante.urlImagem == null ? "https://i.imgur.com/s8t0M4S.png" : response.data[0].adotante.urlImagem
        nomeAdotante[0].innerHTML = response.data[0].adotante.nome
        comentarioAdotante[0].innerHTML = response.data[0].feedback
        for (let index = 0; index < response.data[0].avaliacaoSite; index++) {
            starAdotante1[index].src = "../../imagens/home-adotante/estrela.svg"
        }

        fotoAdotante[1].src = response.data[1].adotante.urlImagem == null ? "https://i.imgur.com/s8t0M4S.png" : response.data[1].adotante.urlImagem
        nomeAdotante[1].innerHTML = response.data[1].adotante.nome
        comentarioAdotante[1].innerHTML = response.data[1].feedback
        for (let index = 0; index < response.data[1].avaliacaoSite; index++) {
            starAdotante2[index].src = "../../imagens/home-adotante/estrela.svg"
        }

    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    })
}