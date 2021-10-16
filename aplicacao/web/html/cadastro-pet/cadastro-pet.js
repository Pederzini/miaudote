function fotoPet() {
  // se banco estiver vazio de foto, mostrar placeholder
  image = "../../geral/placeholder-imagem-pet.svg";
}

function postCadastroPet() {
  // var camposVazios = verificaCamposVazios()
  // senhas = validaSenhas()

  // if (!camposVazios) {
  //     Swal.fire({
  //         title: 'Campo(s) vazio(s)!',
  //         text: 'Não deixe nenhum campo vazio',
  //         icon: 'warning',
  //         confirmButtonText: 'Ok'
  //     })
  // } else if (!senhas) {
  //     Swal.fire({
  //         title: 'Senhas não são iguais!',
  //         text: 'Verifique as senhas digitadas para serem iguais',
  //         icon: 'warning',
  //         confirmButtonText: 'Ok'
  //     })
  // } else {


  var nome = document.getElementById("formulario").elements["cmp_nome"].value
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
  var comportamento = document.getElementById("formulario").elements['comportamento'].value
  var necessidadesEspeciais = document.getElementById('campo_especial').value
  var imagem = null
  var descricao = document.getElementById("campo_desc").value

  axios.post('http://localhost:8080/miaudote/animal', {
    headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    "nome": nome,
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
    "urlImagem": "urlImagem",
    "ong": null,
  }).then(response => {
    putOng(response.data.idAnimal)
  }).catch(function (error) {
    Swal.fire({
      title: error.response.data,
      text: 'Verifique as informações digitadas',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  })
  // }
}

function putOng(idAnimal) {

  axios.put(`http://localhost:8080/miaudote/animal/${JSON.parse(sessionStorage.login_usuario).cnpj}/${idAnimal}`, {
    headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
  }).then(response => {
    Swal.fire({
      title: 'Cadastro concluído!',
      text: 'Agora você pode receber doações! Clique em ok para fazer o login!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }).catch(function (error) {
    Swal.fire({
      title: "Erro",
      text: 'Verifique as informações digitadas',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  })


}