var contador = 0;
var senhas = false;

function mostraLoading() {
    document.getElementsByClassName('loading')[0].style.display = "flex"
  }
  
  function escondeLoading() {
    document.getElementsByClassName('loading')[0].style.display = "none"
  }

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('campo-logradouro').value = ("");
    document.getElementById('campo-bairro').value = ("");
}

function login() {
    window.location.href = '../login/login.html'
}

function endereco(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('campo-logradouro').value = (conteudo.logradouro);
        document.getElementById('campo-bairro').value = (conteudo.bairro);
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

function validaCpf(elemento, cpf) {
    trocaCorBorda(elemento);

    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
        Swal.fire({
            title: 'Este CPF não é válido!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    }

    [9, 10].forEach(function (j) {
        var soma = 0,
            r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) {
            Swal.fire({
                title: 'Este CPF não é válido!',
                text: 'Verifique o número informado',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#8675A5'
            })
            document.getElementById('campo-cpf').value = "";
        }
    });
}

function trocaCorBorda(elemento) {
    if (elemento.value != "") {
        elemento.style.borderColor = '#949494';
    }
}

function verificaCamposVazios() {
    contador = 0;

    var nome = document.getElementById("campo-nome")
    var nascimento = document.getElementById("campo-nascimento")
    var cpf = document.getElementById("campo-cpf")
    var telefone = document.getElementById("campo-telefone")
    var cep = document.getElementById("campo-cep")
    var logradouro = document.getElementById("campo-logradouro")
    var bairro = document.getElementById("campo-bairro")
    var numero = document.getElementById("campo-numero")
    var complemento = document.getElementById("campo-complemento")
    var email = document.getElementById("campo-email")
    var senha = document.getElementById("campo-senha")
    var confirmarSenha = document.getElementById("campo-confirmar-senha")

    nome.style.borderColor = '#949494';
    nascimento.style.borderColor = '#949494';
    cpf.style.borderColor = '#949494';
    telefone.style.borderColor = '#949494';
    cep.style.borderColor = '#949494';
    logradouro.style.borderColor = '#949494';
    bairro.style.borderColor = '#949494';
    numero.style.borderColor = '#949494';
    complemento.style.borderColor = '#949494';
    email.style.borderColor = '#949494';
    senha.style.borderColor = '#949494';
    confirmarSenha.style.borderColor = '#949494';

    if (!nome.validity.valid) {
        nome.style.borderColor = '#ff0000';
        contador++;
    }
    if (!nascimento.validity.valid) {
        nascimento.style.borderColor = '#ff0000';
        contador++;
    }
    if (!cpf.validity.valid) {
        cpf.style.borderColor = '#ff0000';
        contador++;
    }
    if (!telefone.validity.valid) {
        telefone.style.borderColor = '#ff0000';
        contador++;
    }
    if (!cep.validity.valid) {
        cep.style.borderColor = '#ff0000';
        contador++;
    }
    if (!logradouro.validity.valid) {
        logradouro.style.borderColor = '#ff0000';
        contador++;
    }
    if (!bairro.validity.valid) {
        bairro.style.borderColor = '#ff0000';
        contador++;
    }
    if (!numero.validity.valid) {
        numero.style.borderColor = '#ff0000';
        contador++;
    }
    if (!complemento.validity.valid) {
        complemento.style.borderColor = '#ff0000';
        contador++;
    }
    if (!email.validity.valid) {
        email.style.borderColor = '#ff0000';
        contador++;
    }
    if (!senha.validity.valid) {
        senha.style.borderColor = '#ff0000';
        contador++;
    }
    if (!confirmarSenha.validity.valid) {
        confirmarSenha.style.borderColor = '#ff0000';
        contador++;
    }

    return contador;
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
            document.getElementById('campo-logradouro').value = "...";
            document.getElementById('campo-bairro').value = "...";

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

    if (t == "cpf") {
        i.setAttribute("maxlength", "14");
        if (v.length == 3 || v.length == 7) i.value += ".";
        if (v.length == 11) i.value += "-";
    }

    if (t == "cnpj") {
        i.setAttribute("maxlength", "18");
        if (v.length == 2 || v.length == 6) i.value += ".";
        if (v.length == 10) i.value += "/";
        if (v.length == 15) i.value += "-";
    }

    if (t == "cep") {
        i.setAttribute("maxlength", "9");
        if (v.length == 5) i.value += "-";
    }

    if (t == "tel") {
        v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        i.value = v;
    }
};

function exibeSenha() {
    var passwordInput = document.getElementById('campo-senha');
    var iconeOlhoOn = document.getElementById('eye-icon-on');
    var iconeOlhoOff = document.getElementById('eye-icon-off');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passwordInput.placeholder = 'Senha';
        iconeOlhoOn.style.display = 'none'
        iconeOlhoOff.style.display = 'block'

    } else {
        passwordInput.type = 'password';
        passwordInput.placeholder = '******';
        iconeOlhoOn.style.display = 'block'
        iconeOlhoOff.style.display = 'none'

    }
}

function exibeConfirmaSenha() {
    var passwordInput = document.getElementById('campo-confirmar-senha');
    var iconeOlhoOn = document.getElementById('eye-icon-on2');
    var iconeOlhoOff = document.getElementById('eye-icon-off2');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passwordInput.placeholder = 'Senha';
        iconeOlhoOn.style.display = 'none'
        iconeOlhoOff.style.display = 'block'

    } else {
        passwordInput.type = 'password';
        passwordInput.placeholder = '******';
        iconeOlhoOn.style.display = 'block'
        iconeOlhoOff.style.display = 'none'

    }
}

function validaSenhas() {
    var senha = document.getElementById('campo-senha').value
    var confirmarSenha = document.getElementById('campo-confirmar-senha').value

    if (senha != confirmarSenha) {
        return false
    } else {
        return true
    }
}

function postCadastroAdotante() {
    var camposVazios = verificaCamposVazios()
    senhas = validaSenhas()

    if (camposVazios != 0) {
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
        var nome = document.getElementById("campo-nome").value;
        var nascimento = (document.getElementById("campo-nascimento").value).split('-').reverse().join('/');
        var cpf = (document.getElementById("campo-cpf").value).replace(".", "").replace(".", "").replace("-", "");
        var telefone = (document.getElementById("campo-telefone").value).replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        var cep = (document.getElementById("campo-cep").value).replace("-", "");
        var logradouro = document.getElementById("campo-logradouro").value;
        var bairro = document.getElementById("campo-bairro").value;
        var numero = document.getElementById("campo-numero").value;
        var complemento = document.getElementById("campo-complemento").value;
        var email = document.getElementById("campo-email").value;
        var senha = document.getElementById("campo-senha").value;

       
        axios.post('http://localhost:8080/miaudote/adotantes', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "crossorigin": true
            },
            "nome": nome,
            "dataNascimento": nascimento,
            "cpf": cpf,
            "telefone": telefone,
            "email": email,
            "senha": senha,
            "endereco": {
                "cep": cep,
                "logradouro": logradouro,
                "bairro": bairro,
                "numero": numero,
                "complemento": complemento,
            },
        }).then(response => {          
            Swal.fire({
                title: 'Cadastro concluído!',
                text: 'Agora você pode receber doações! Clique em ok para fazer o login!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#8675A5'
            }).then((result) => {
                if (result.value) {
                    window.location.href = '../login/login.html'
                }
            })
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