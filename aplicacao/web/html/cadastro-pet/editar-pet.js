let placeholder = "../../imagens/geral/placeholder-imagem-pet.svg"
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
    imagePerfil2.src = URL.createObjectURL(file)
    arrayFoto[0] = file;
    postImagem(file)
  }

  // if (file) {
  //   imagePerfil1.src = URL.createObjectURL(file)
  //   arrayFoto[0] = file;
  //   postImagem(file)
  // }
}

filePhoto2.onchange = evt => {
  const [file2] = filePhoto2.files

  if (file2 != placeholder && file2) {
    imagePerfil2.src = URL.createObjectURL(file2)
    arrayFoto[1] = file2;
    postImagem(file2)
  }

  // if (file2) {
  //   imagePerfil2.src = URL.createObjectURL(file2)
  //   arrayFoto[1] = file2;
  //   postImagem(file2)
  // }
}

filePhoto3.onchange = evt => {
  const [file3] = filePhoto3.files

  if (file3 != placeholder && file3) {
    imagePerfil3.src = URL.createObjectURL(file3)
    arrayFoto[2] = file3;
    postImagem(file3)
  }

  // if (file3) {
  //   imagePerfil3.src = URL.createObjectURL(file3)
  //   arrayFoto[2] = file3;
  //   postImagem(file3)
  // }
}

filePhoto4.onchange = evt => {
  const [file4] = filePhoto4.files

  if (file4 != placeholder && file4) {
    imagePerfil4.src = URL.createObjectURL(file4)
    arrayFoto[3] = file4;
    postImagem(file4)
  }

  // if (file4) {
  //   imagePerfil4.src = URL.createObjectURL(file4)
  //   arrayFoto[3] = file4;
  //   postImagem(file4)
  // }
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

let idAnimal = sessionStorage.idEdicao;

let myVars = {
  imgPerfil1: imagePerfil1,
  imgPerfil2: imagePerfil2,
  imgPerfil3: imagePerfil3,
  imgPerfil4: imagePerfil4
};

function getInfosPet() {
  axios.get(`http://localhost:8080/miaudote/animais/${idAnimal}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "crossorigin": true,
    },
  }).then(response => {
    console.log(response.data)
    campo_nome.value = response.data.nome;
    response.data.especie.toUpperCase() == "GATO" ? cmp_gato.checked = true : cmp_cachorro.checked = true
    campo_nascimento.value = response.data.dataNascimento
    campo_chegada.value = response.data.dataChegada
    response.data.genero.toUpperCase() == "FEMEA" ? cmp_fem.checked = true : cmp_masc.checked = true
    response.data.porte.toUpperCase() == "PEQUENO" ? cmp_peq.checked = true : response.data.porte.toUpperCase() == "GRANDE" ? cmp_grande.checked = true : cmp_med.checked = true
    response.data.tipoPelagem.toUpperCase() == "CURTA" ? cmp_curto.checked = true : response.data.tipoPelagem.toUpperCase() == "LONGO" ? cmp_longo.checked = true : cmp_medio.checked = true
    response.data.castrado.toUpperCase() == "SIM" ? cmp_cast_sim.checked = true : cmp_cast_nao.checked = true
    response.data.vacinado.toUpperCase() == "SIM" ? cmp_vac_sim.checked = true : cmp_vac_nao.checked = true
    response.data.corPelagem.toUpperCase() == "BEGE" ? corPelagem.value = 1 :
      response.data.corPelagem.toUpperCase() == "BRANCO" ? corPelagem.value = 2 :
        response.data.corPelagem.toUpperCase() == "CARAMELO" ? corPelagem.value = 3 :
          response.data.corPelagem.toUpperCase() == "CINZA" ? corPelagem.value = 4 :
            response.data.corPelagem.toUpperCase() == "MALHADO" ? corPelagem.value = 5 :
                corPelagem.value = 6;
    response.data.comportamento.toUpperCase() == "CALMO" ? comp.value = 5 :
      response.data.comportamento.toUpperCase() == "ANSIOSO" ? comp.value = 4 :
        response.data.comportamento.toUpperCase() == "ANIMADO" ? comp.value = 3 :
          response.data.comportamento.toUpperCase() == "AGITADO" ? comp.value = 1 :
            comp.value = 2;
    campo_desc.value = response.data.descricao
    response.data.necessidadeEspeciais.length > 0 ? campo_especial.value = response.data.necessidadeEspeciais : campo_especial.value = "-"
    if (response.data.urlImagem != null) {
      fotosPet = response.data.urlImagem.split(',')
      if (fotosPet[0].length > 0) {
        for (let index = 0; index < fotosPet.length; index++) {
          if (fotosPet[index].length > 0) {
            myVars[`imgPerfil${index + 1}`].src = fotosPet[index]
          } else {
            myVars[`imgPerfil${index + 1}`].src = placeholder
          }
        }
      }
    }

  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao carregar as informações do Pet.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  })
}

function atualizaInfosPet() {
  let comportamento;

  switch (comp.value) {
    case "5":
      comportamento = "Calmo"
      break;
    case "4":
      comportamento = "Ansioso"
      break;
    case "3":
      comportamento = "Animado"
      break;
    case "2":
      comportamento = "Brincalhão"
      break;
    case "1":
      comportamento = "Agitado"
      break;

    default:
      break;
  }

  let pelagem;

  switch (comp.value) {
    case "6":
      pelagem = "Preto"
      break;
    case "5":
      pelagem = "Malhado"
      break;
    case "4":
      pelagem = "Cinza"
      break;
    case "3":
      pelagem = "Caramelo"
      break;
    case "2":
      pelagem = "Branco"
      break;
    case "1":
      pelagem = "Bege"
      break;
    default:
      break;
  }

  let fotos = ""

  for (let index = 0; index < urlImagem.length; index++) {
    const element = urlImagem[index];
    if (index != arrayFoto.length - 1) {
      fotos += `${element},`
    } else {
      fotos += element
    }
  }

  axios.put(`http://localhost:8080/miaudote/animais/${idAnimal}`, {
    headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    "nome": campo_nome.value,
    "descricao": campo_desc.value,
    "especie": cmp_gato.checked ? "Gato" : "Cachorro",
    "dataNascimento": campo_nascimento.value,
    "genero": cmp_fem.checked ? "f" : "m",
    "dataChegada": campo_chegada.value.split('-').reverse().join('/'),
    "corPelagem": pelagem,
    "castrado": cmp_cast_sim.checked ? true : false,
    "porte": cmp_peq.checked ? "Pequeno" : cmp_grande.checked ? "Grande" : "Médio",
    "tipoPelagem": cmp_curto.checked ? "Curta" : cmp_longo.checked ? "Longo" : "Médio",
    "vacinado": cmp_vac_sim.checked ? true : false,
    "comportamento": comportamento,
    "adotado": false,
    "necessidadeEspeciais": campo_especial.value == "-" ? "" : campo_especial.value,
    "urlImagem": fotos

  }).then(response => {
    Swal.fire({
      title: 'Dados atualizados com sucesso!',
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
      title: error.response,
      text: 'Erro ao carregar as informações do Pet.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  })
}