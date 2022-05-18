let fotos = "";

function mostraLoading() {
  document.getElementsByClassName('loading')[0].style.display = "flex"
}

function escondeLoading() {
  document.getElementsByClassName('loading')[0].style.display = "none"
}


function forFoto() {
  for (let index = 0; index < urlImagem.length; index++) {
    const element = urlImagem[index];
    if (index != arrayFoto.length - 1) {
      fotos += `${element},`
    } else {
      fotos += element
    }
  }
}

function verificaCamposVazios() {
  contador = 0;

  let campos = document.querySelectorAll(".campos")

  campos.forEach(element => {
    if (element.id != 'campo_especial') {
      element.style.borderColor = '#949494';
      if (!element.validity.valid) {
        element.style.borderColor = '#ff0000';
        contador++;
      }
    }
  });

  return contador;
}

function postCadastroPet() {

  let camposVazios = verificaCamposVazios()

  if (camposVazios != 0) {
    Swal.fire({
      title: 'Campo(s) vazio(s)!',
      text: 'Não deixe nenhum campo vazio',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#8675A5'
    })
  } else {
    var nome = document.getElementById("formulario").elements["cmp_nome"].value
    var especie = document.getElementById("cmp_gato").checked ? "Gato" : "Cachorro";
    var nascimento = (document.getElementById("formulario").elements['cmp_nasc'].value).split('-').reverse().join('/');
    var chegada = (document.getElementById("formulario").elements['cmp_chegada'].value).split('-').reverse().join('/');
    var sexo = document.getElementById("cmp_fem").checked ? "f" : "m"
    var porte;
    if (document.getElementById("cmp_peq").checked) {
      porte = "Pequeno"
    } else if (document.getElementById("cmp_med").checked) {
      porte = "Medio"
    } else {
      porte = "Grande"
    }
    var pelagem = document.getElementById("cmp_curto").checked ? "Curto" : "Longo"
    var cor = document.getElementById("formulario").elements['cmp_cor'].value
    var castrado = document.getElementById("cmp_cast_sim").checked ? true : false
    var vacinado = document.getElementById("cmp_vac_sim").checked ? true : false
    var comportamento = document.getElementById("formulario").elements['comportamento']
    comportamento = comportamento.options[comportamento.selectedIndex].text
    var necessidadesEspeciais = document.getElementById('campo_especial').value
    var descricao = document.getElementById("campo_desc").value

    forFoto()
    mostraLoading()
    axios.post('ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/animais', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "crossorigin": true
      },
      "nome": nome,
      "especie": especie,
      "descricao": descricao,
      "dataNascimento": nascimento,
      "genero": sexo,
      "dataChegada": chegada,
      "corPelagem": cor,
      "castrado": castrado,
      "porte": porte,
      "tipoPelagem": pelagem,
      "vacinado": vacinado,
      "comportamento": comportamento,
      "adotado": false,
      "necessidadeEspeciais": necessidadesEspeciais,
      "urlImagem": fotos == "" ? null : fotos,
      "ong": null,
    }).then(response => {
      putOng(response.data.idAnimal)
      escondeLoading()
    }).catch(function (error) {
      escondeLoading()
      Swal.fire({
        title: "ERRO",
        text: 'Verifique as informações digitadas',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#8675A5'
      })
    })
  }
}

function putOng(idAnimal) {
  mostraLoading()
  axios.put(`ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/animais/${JSON.parse(sessionStorage.login_usuario).cnpj}/${idAnimal}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true
    },
  }).then(response => {
    escondeLoading()
    Swal.fire({
      title: 'Cadastro concluído!',
      text: 'Animal cadastrado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#8675A5'
    })
  }).catch(function (error) {
    escondeLoading()
    Swal.fire({
      title: "Erro",
      text: 'Verifique as informações digitadas',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#8675A5'
    })
  })
}

var placeholder = "../../imagens/geral/placeholder-imagem-pet.svg"
let fotosPet = []

function topo() {
  window.scrollTo(0, 0)
}

function imgPlaceholder() {
  imagePerfil1.src = placeholder;
  imagePerfil2.src = placeholder;
  imagePerfil3.src = placeholder;
  imagePerfil4.src = placeholder;
}

var arrayFoto = [];


filePhoto.onchange = evt => {
  const [file] = filePhoto.files

  if (file != placeholder && file) {
    imagePerfil1.src = URL.createObjectURL(file)
    arrayFoto[0] = file;
    postImagem(file)
  }
}

filePhoto2.onchange = evt => {
  const [file2] = filePhoto2.files

  if (file2 != placeholder && file2) {
    imagePerfil2.src = URL.createObjectURL(file2)
    arrayFoto[1] = file2;
    postImagem(file2)
  }
}

filePhoto3.onchange = evt => {
  const [file3] = filePhoto3.files

  if (file3 != placeholder && file3) {
    imagePerfil3.src = URL.createObjectURL(file3)
    arrayFoto[2] = file3;
    postImagem(file3)
  }
}

filePhoto4.onchange = evt => {
  const [file4] = filePhoto4.files

  if (file4 != placeholder && file4) {
    imagePerfil4.src = URL.createObjectURL(file4)
    arrayFoto[3] = file4;
    postImagem(file4)
  }
}

var urlImagem = [];

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
    urlImagem.push(data.data.link)
  })
}