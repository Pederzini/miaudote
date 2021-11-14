function carregar() {
  let inputs = document.querySelectorAll('.campos')
  inputs.forEach(element => {

      let id = element.getAttribute('id')
      if (id != "campo_cpf" && id != "campo_cep") {
          element.addEventListener('blur', function () { trocaCorBorda(element) })
      }

  });
}

function topo() {
  window.scrollTo(0, 0)
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('campo_logradouro').value = ("");
  document.getElementById('campo_bairro').value = ("");
}

function login() {
  window.location.href = '../login/login.html'
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
          confirmButtonText: 'Ok'
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
              confirmButtonText: 'Ok'
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

function formataCpfAsterisco(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.***-**");
}

function formataCpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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

function validaCpf(elemento, cpf){
  trocaCorBorda(elemento);

  cpf = cpf.replace(/\D/g, '');
  if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
      Swal.fire({
          title: 'Este CPF não é válido!',
          text: 'Verifique o número informado',
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }

  [9,10].forEach(function(j){
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
          soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r != cpf.substring(j, j+1)) {
          Swal.fire({
              title: 'Este CPF não é válido!',
              text: 'Verifique o número informado',
              icon: 'error',
              confirmButtonText: 'Ok'
          })
          document.getElementById('campo-cpf').value = "";
      }
  });
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

function getInfosAdotante() {
  axios.get(`http://localhost:8080/miaudote/adotantes/${JSON.parse(sessionStorage.login_usuario).idAdotante}`, {
      headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
  }).then(response => {
      document.getElementById("campo_nome").value = response.data.nome;
      document.getElementById("campo_cpf_escondido").value = formataCpf(response.data.cpf);
      document.getElementById("campo_cpf").value = formataCpfAsterisco(response.data.cpf);
      document.getElementById("campo_nasc").value = formataData(response.data.dataNascimento);
      document.getElementById("campo_telefone").value = formataTelefone(response.data.telefone);
      document.getElementById("campo_cep").value = formataCep((response.data.endereco.cep).trim());
      document.getElementById("campo_logradouro").value = response.data.endereco.logradouro;
      document.getElementById("campo_bairro").value = response.data.endereco.bairro;
      document.getElementById("campo_numero").value = response.data.endereco.numero;
      document.getElementById("campo_complemento").value = response.data.endereco.complemento;
      document.getElementById("campo_email").value = response.data.email;
      document.getElementById("campo_senha").value = response.data.senha;
      document.getElementById("campo_confirmar_senha").value = response.data.senha;
      if(response.data.urlImagem.length != 0) {
          document.getElementById("imagePerfil").src = response.data.urlImagem;
          document.getElementById("textoUploader").innerHTML = "";
      }
  }).catch(function (error) {
      Swal.fire({
          title: error.response,
          text: 'Erro ao carregar as informações da ONG',
          icon: 'warning',
          confirmButtonText: 'Ok'
      })
  })
}

function patchAdotante() {
  var camposVazios = verificaCamposVazios()
  senhas = validaSenhas()

  if (!camposVazios) {
      Swal.fire({
          title: 'Campo(s) vazio(s)!',
          text: 'Não deixe nenhum campo vazio',
          icon: 'warning',
          confirmButtonText: 'Ok'
      })
  } else if (!senhas) {
      Swal.fire({
          title: 'Senhas não são iguais!',
          text: 'Verifique as senhas digitadas para serem iguais',
          icon: 'warning',
          confirmButtonText: 'Ok'
      })
  } else {
      var nome = document.getElementById("campo_nome").value;
      var cpf = (document.getElementById("campo_cpf_escondido").value).replace(".", "").replace(".", "").replace("/", "").replace("-", "");
      var dataNascimento = document.getElementById("campo_nasc").value;
      var telefone = (document.getElementById("campo_telefone").value).replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
      var email = document.getElementById("campo_email").value;
      var senha = document.getElementById("campo_senha").value;

      axios.patch(`http://localhost:8080/miaudote/adotantes/${JSON.parse(sessionStorage.login_usuario).idAdotante}`, {
          headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
          "nome": nome,
          "cpf": cpf,
          "dataNascimento": dataNascimento,
          "telefone": telefone,
          "email": email,
          "senha": senha,
          "urlImagem": urlImagem == "" ? document.getElementById("imagePerfil").src : urlImagem
      }).then(response => {
        atualizaEndereco()
      }).catch(function (error) {
          Swal.fire({
              title: error.response.data,
              text: 'Verifique as informações digitadas',
              icon: 'warning',
              confirmButtonText: 'Ok'
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

    axios.patch(`http://localhost:8080/miaudote/enderecos/${JSON.parse(sessionStorage.login_usuario).endereco.id}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
        "cep": cep,
        "logradouro": logradouro,
        "bairro": bairro,
        "numero": numero,
        "complemento": complemento,
        "cidade": "São Paulo",
    }).then(response => {
        Swal.fire({
            title: 'Cadastro atualizado com sucesso!',
            text: 'Clique em ok para atualizar a página',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                topo();
                window.location.reload;
            }
        })
    }).catch(function (error) {
        Swal.fire({
            title: error.response.data,
            text: 'Verifique as informações digitadas',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}
