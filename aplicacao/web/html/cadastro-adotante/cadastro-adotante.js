document.getElementById("campo_nome").focus();

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value = ("");
    document.getElementById('bairro').value = ("");
}

function endereco(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        Swal.fire({
            title: 'CEP não encontrado!',
            text: 'Verifique o número informado',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value = "...";
            document.getElementById('bairro').value = "...";

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
                confirmButtonText: 'Ok'
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
        if (v[0] == 9) {
            i.setAttribute("maxlength", "10");
            if (v.length == 5) i.value += "-";
        } else {
            i.setAttribute("maxlength", "9");
            if (v.length == 4) i.value += "-";
        }
    }
};

function exibeSenha()
{
  var passwordInput = document.getElementById('senha');
  var iconeOlhoOn = document.getElementById('eye-icon-on');
  var iconeOlhoOff = document.getElementById('eye-icon-off');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passwordInput.placeholder = 'Senha';
    iconeOlhoOn.style.display = 'none'
    iconeOlhoOff.style.display = 'block'
    
  }
  else{
    passwordInput.type='password';
    passwordInput.placeholder = '******';
    iconeOlhoOn.style.display = 'block'
    iconeOlhoOff.style.display = 'none'
   
  }
}
function exibeConfirmaSenha()
{
  var passwordInput = document.getElementById('confirmar-senha');
  var iconeOlhoOn = document.getElementById('eye-icon-on2');
  var iconeOlhoOff = document.getElementById('eye-icon-off2');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passwordInput.placeholder = 'Senha';
    iconeOlhoOn.style.display = 'none'
    iconeOlhoOff.style.display = 'block'
    
  }
  else{
    passwordInput.type='password';
    passwordInput.placeholder = '******';
    iconeOlhoOn.style.display = 'block'
    iconeOlhoOff.style.display = 'none'
   
  }
}

function cadastrar() {
    var senha = document.getElementById('senha').value;
    var senhaConfirma = document.getElementById('confirmar-senha').value;
    
    if (senha == senhaConfirma) {
    console.log("CAdastrado com sucesso")
    } else {
        console.log("Senha errada")
    }
}