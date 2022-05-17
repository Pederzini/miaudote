window.onload = function () {
    let inputs = document.querySelectorAll('.campos')
    inputs.forEach(element => {

        let id = element.getAttribute('id')
        if (id != "campo_cnpj" && id != "campo_cep") {
            element.addEventListener('blur', function () { trocaCorBorda(element) })
        }

    });
}

function topo() {
    window.scrollTo(0, 0)
}

function mostraLoading() {
    document.getElementsByClassName('loading')[0].style.display = "flex"
}
  
function escondeLoading() {
    document.getElementsByClassName('loading')[0].style.display = "none"
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('campo_logradouro').value = ("");
    document.getElementById('campo_bairro').value = ("");
}

function login() {
    window.location.href = '../login/index.html'
}

function endereco(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('campo_logradouro').value = (conteudo.logradouro);
        document.getElementById('campo_bairro').value = (conteudo.bairro);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        Swal.fire({
            title: 'CEP não encontrado!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }
}

function pesquisacep(elemento, valor) {
    trocaCorBorda(elemento);

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('campo_logradouro').value = "...";
            document.getElementById('campo_bairro').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=endereco';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            Swal.fire({
                title: 'Este CEP não existe!',
                text: 'Verifique o número informado',
                icon: 'error',
                confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
            })
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function trocaCorBorda(elemento) {
    if (elemento.value != "") {
        elemento.style.borderColor = '#949494';
    }
}

function verificaCamposVazios() {

    let inputs = document.querySelectorAll('.campos')
    let valido = true;

    inputs.forEach(element => {

        if (!element.validity.valid) {
            element.style.borderColor = '#ff0000';
            valido = false;
        }

    });

    return valido
}

function mascara(i, t) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    if (t == "data") {
        i.setAttribute("maxlength", "10");
        if (v.length == 2 || v.length == 5) i.value += "/";
    }

    if (t == "cnpj") {
        i.setAttribute("maxlength", "18");
        i.value = formataCnpj(v);
    }

    if (t == "cep") {
        i.setAttribute("maxlength", "9");
        i.value = formataCep(v);
    }

    if (t == "tel") {
        i.value = formataTelefone(v);
    }
}

function formataData(data) {
    return data.substring(0, 2) + "/" + data.substring(3, 5) + "/" + data.substring(6, 10);
}

function formataCep(cep) {
    return cep.replace(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/, "$1$2-$3");
}

function formataTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ""); //Remove tudo o que não é dígito
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos

    return telefone
}

function formataCnpjAsterisco(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.***.***/****-$5");
}

function formataCnpj(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function validarCNPJ(elemento, cnpj) {
    trocaCorBorda(elemento);
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
        Swal.fire({
            title: 'Este CNPJ não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }

    if (cnpj.length != 14) {
        Swal.fire({
            title: 'Este CNPJ não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        Swal.fire({
            title: 'Este CNPJ não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        Swal.fire({
            title: 'Este CNPJ não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        Swal.fire({
            title: 'Este CNPJ não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    }

}

function exibeSenha() {
    var passwordInput = document.getElementById('campo_senha');
    var iconeOlhoOn = document.getElementById('eye-icon-on');
    var iconeOlhoOff = document.getElementById('eye-icon-off');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passwordInput.placeholder = 'Senha';
        iconeOlhoOn.style.display = 'none'
        iconeOlhoOff.style.display = 'block'

    }
    else {
        passwordInput.type = 'password';
        passwordInput.placeholder = '******';
        iconeOlhoOn.style.display = 'block'
        iconeOlhoOff.style.display = 'none'

    }
}

function exibeConfirmaSenha() {
    var passwordInput = document.getElementById('campo_confirmar_senha');
    var iconeOlhoOn = document.getElementById('eye-icon-on2');
    var iconeOlhoOff = document.getElementById('eye-icon-off2');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passwordInput.placeholder = 'Senha';
        iconeOlhoOn.style.display = 'none'
        iconeOlhoOff.style.display = 'block'

    }
    else {
        passwordInput.type = 'password';
        passwordInput.placeholder = '******';
        iconeOlhoOn.style.display = 'block'
        iconeOlhoOff.style.display = 'none'

    }
}

function validaSenhas() {
    var senha = document.getElementById('campo_senha').value
    var confirmarSenha = document.getElementById('campo_confirmar_senha').value

    if (senha != confirmarSenha) {
        return false
    } else {
        return true
    }
}

var urlImagem = "";

function postImagem(arquivo) {
    const formdata = new FormData()
    formdata.append("image", arquivo)
    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID 6dae79a908f004d"
        },
        body: formdata
    }).then(data => data.json()).then(data => {
        urlImagem = data.data.link
    })
}

function getInfosOng() {
    mostraLoading()
    axios.get(`ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/ongs/${JSON.parse(sessionStorage.login_usuario).idOng}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        document.getElementById("campo_razao").value = response.data.razaoSocial;
        document.getElementById("campo_cnpj_escondido").value = formataCnpj(response.data.cnpj);
        document.getElementById("campo_cnpj").value = formataCnpjAsterisco(response.data.cnpj);
        document.getElementById("campo_fundacao").value = formataData(response.data.dataFundacao);
        document.getElementById("campo_resp").value = response.data.nomeResponsavel;
        document.getElementById("campo_telefone").value = formataTelefone(response.data.telefone);
        document.getElementById("campo_cep").value = formataCep((response.data.endereco.cep).trim());
        document.getElementById("campo_logradouro").value = response.data.endereco.logradouro;
        document.getElementById("campo_bairro").value = response.data.endereco.bairro;
        document.getElementById("campo_numero").value = response.data.endereco.numero;
        document.getElementById("campo_complemento").value = response.data.endereco.complemento;
        document.getElementById("campo_email").value = response.data.email;
        document.getElementById("campo_senha").value = response.data.senha;
        document.getElementById("campo_confirmar_senha").value = response.data.senha;
        if (response.data.urlImagem.length != 0) {
            document.getElementById("imagePerfil").src = response.data.urlImagem;
            document.getElementById("textoUploader").innerHTML = "";
        }
        escondeLoading()
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    })
}

function patchCadastroOng() {
    var camposVazios = verificaCamposVazios()
    senhas = validaSenhas()

    if (!camposVazios) {
        Swal.fire({
            title: 'Campo(s) vazio(s)!',
            text: 'Não deixe nenhum campo vazio',
            icon: 'warning',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    } else if (!senhas) {
        Swal.fire({
            title: 'Senhas não são iguais!',
            text: 'Verifique as senhas digitadas para serem iguais',
            icon: 'warning',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        })
    } else {
        mostraLoading()
        var razao = document.getElementById("campo_razao").value;
        var cnpj = (document.getElementById("campo_cnpj_escondido").value).replace(".", "").replace(".", "").replace("/", "").replace("-", "");
        var dataFundacao = document.getElementById("campo_fundacao").value;
        var nomeResponsavel = document.getElementById("campo_resp").value;
        var telefone = (document.getElementById("campo_telefone").value).replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        var email = document.getElementById("campo_email").value;
        var senha = document.getElementById("campo_senha").value;

        axios.patch(`ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/ongs/${JSON.parse(sessionStorage.login_usuario).idOng}`, {
            headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
            "razaoSocial": razao,
            "cnpj": cnpj,
            "dataFundacao": dataFundacao,
            "nomeResponsavel": nomeResponsavel,
            "telefone": telefone,
            "email": email,
            "senha": senha,
            "urlImagem": urlImagem == "" ? document.getElementById("imagePerfil").src : urlImagem,
        }).then(response => {
            atualizaEndereco()
        }).catch(function (error) {
            Swal.fire({
                title: error.response.data,
                text: 'Verifique as informações digitadas',
                icon: 'warning',
                confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
            })
        })
    }
}

function atualizaEndereco() {
    var cep = (document.getElementById("campo_cep").value).replace("-", "");
    var logradouro = document.getElementById("campo_logradouro").value;
    var bairro = document.getElementById("campo_bairro").value;
    var numero = document.getElementById("campo_numero").value;
    var complemento = document.getElementById("campo_complemento").value;

    axios.patch(`ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/enderecos/${JSON.parse(sessionStorage.login_usuario).endereco.id}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
        "cep": cep,
        "logradouro": logradouro,
        "bairro": bairro,
        "numero": numero,
        "complemento": complemento,
        "cidade": "São Paulo",
    }).then(response => {
        escondeLoading()
        Swal.fire({
            title: 'Perfil atualizado com sucesso!',
            text: 'Clique em ok para atualizar a página',
            icon: 'success',
            confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
        }).then((result) => {
            if (result.value) {
                topo();
                window.location.reload;
            }
        })
    }).catch(function (error) {
        escondeLoading()
        Swal.fire({
            title: error.response.data,
            text: 'Verifique as informações digitadas',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    })
}
