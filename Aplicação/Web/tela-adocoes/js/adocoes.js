function trocaMenu(valor) {
    
    let todasDivs = document.querySelectorAll('.opcoes-adocoes');

    const divs = [document.querySelectorAll('.card-animais-favoritos'),
                  document.querySelectorAll('.card-processo-adocao'), 
                  document.querySelectorAll('.card-animais-adotados')]

    todasDivs.forEach(element => {
        let valorDiv = element.getAttribute('value') - 1
        if (valor == element.getAttribute('value')) {
            mostrarDivs(divs[valorDiv])
            element.style.backgroundColor = '#FFD8D5';
        } else {
            let div = divs[valorDiv]
            bloquearDivs(div)
            element.style.backgroundColor = '#FFFFFF';
        }
    });

    function bloquearDivs(div) {
        div.forEach(element => {
            element.style.display = 'none';
        });
    }

    function mostrarDivs(div) {
        div.forEach(element => {
            element.style.display = 'block';
        });
    }

}