
function imgPlaceholder() {
  var placeholder = "../../imagens/geral/placeholder-imagem-pet.svg"
  imagePerfil.src = placeholder; 
  imagePerfil2.src = placeholder; 
  imagePerfil3.src = placeholder; 
  imagePerfil4.src = placeholder; 

}

var arrayFoto = [];

filePhoto.onchange = evt => {
  const [file] = filePhoto.files
  if (file) {
      imagePerfil.src = URL.createObjectURL(file)
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

// salva os links das fotos em um Array(urlImagem)
// como manda pro back? array ou texto separado por "," ?
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
        // console.log(urlImagem)
    })
}


