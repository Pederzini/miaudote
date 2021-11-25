let placeholder = "../../imagens/geral/placeholder-imagem-pet.svg"

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
  if (file) {
    imagePerfil1.src = URL.createObjectURL(file)
    arrayFoto[0] = file;
    postImagem(file)
  }
}

filePhoto2.onchange = evt => {
  const [file2] = filePhoto2.files

  if (file2) {
    imagePerfil2.src = URL.createObjectURL(file2)
    arrayFoto[1] = file2;
    postImagem(file2)
  }
}

filePhoto3.onchange = evt => {
  const [file3] = filePhoto3.files

  if (file3) {
    imagePerfil3.src = URL.createObjectURL(file3)
    arrayFoto[2] = file3;
    postImagem(file3)
  }
}

filePhoto4.onchange = evt => {
  const [file4] = filePhoto4.files

  if (file4) {
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
    campo_nome.value = response.data.nome;
    response.data.especie.toUpperCase() == "GATO" ? cmp_gato.checked = true : cmp_cachorro.checked = true
    campo_nascimento.value = response.data.dataNascimento
    campo_chegada.value = response.data.dataChegada
    response.data.genero.toUpperCase() == "Femea" ? cmp_fem.checked = true : cmp_masc.checked = true
    response.data.porte.toUpperCase() == "Pequeno" ? cmp_peq.checked = true : response.data.porte.toUpperCase() == "Grande" ? cmp_grande.checked = true : cmp_med.checked = true
    response.data.tipoPelagem.toUpperCase() == "Curta" ? cmp_curto.checked = true : response.data.tipoPelagem.toUpperCase() == "Longo" ? cmp_longo.checked = true : cmp_medio.checked = true
    corPelagem.value = response.data.corPelagem
    response.data.castrado.toUpperCase() == "Sim" ? cmp_cast_sim.checked = true : cmp_cast_nao.checked = true
    response.data.vacinado.toUpperCase() == "Sim" ? cmp_vac_sim.checked = true : cmp_vac_nao.checked = true
    response.data.comportamento.toUpperCase() == "Calmo" ? comp.value = 5 :
      response.data.comportamento.toUpperCase() == "Ansioso" ? comp.value = 4 :
        response.data.comportamento.toUpperCase() == "Animado" ? comp.value = 3 :
          response.data.comportamento.toUpperCase() == "Agitado" ? comp.value = 1 :
            comp.value = 2;
    response.data.necessidadeEspeciais.length > 0 ? campo_especial.value = response.data.necessidadeEspeciais : campo_especial.value = "-"
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
  axios.put(`http://localhost:8080/miaudote/animais/${idAnimal}`, {
    headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    "nome": campo_nome.value
  }).then(response => {
    
  }).catch(function (error) {
    Swal.fire({
      title: error.response,
      text: 'Erro ao carregar as informações do Pet.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  })
}