// MODAL
// Get the modal
let dadosCards = []

var modal = document.getElementById("modalCadastro");
// Get the <span> element that closes the modal
var fechar = document.getElementsByClassName("close")[0];

function redirecionarCadastro() {
    modal.style.display = "block"; 
    document.querySelector("body").style.overflow = 'hidden';
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

function getInfosCards() {
    axios.get(`http://localhost:8080/miaudote/animais/animais-ong/${JSON.parse(sessionStorage.login_usuario).cnpj}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "crossorigin": true
        },
    }).then(response => {
        dadosCards = []

        for (let index = 0; index < response.data.length; index++) {
            dadosCards[index] = response.data[index];
        }

        console.log("terminei")
        console.log(window[`card1`])
        console.log(window[`card2`])

        criarVetores()
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações de favoritos',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

function mostrarDivs() {
    let div = document.querySelector(".cards")
    

}

function criarVetores() {
    let i = 1;
    let numero = 0;

    for(let index = 0, indexAux = 0; index < dadosCards.length; index++, indexAux++) {
        if(i == 1 || i == 10) {
            if(i == 10) {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
                i = 1;
            } else {
                window[`card${++numero}`] = new Array()
                indexAux = 0;
            }
        }

        if (i < 10) {
            eval(`card${numero}`)[indexAux] = dadosCards[index];
            i++;
        } else {
            i = 1;
            eval(`card${numero}`)[indexAux] = dadosCards[index];
        }        
    }
   
    for(let j = 1; j <= 50; j++) {
        try {
            if (typeof window[`card${j}`] === 'object') {
                delete window[`card${j}`]
            } else {
                break;
            }
        }
        catch(err) {
            console.log("luan")
        }
    }

}