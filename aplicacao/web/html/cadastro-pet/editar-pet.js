
function imgPlaceholder() {
  var placeholder = "../../imagens/geral/placeholder-imagem-pet.svg"
  imagePerfil.src = placeholder; 
  // imagePerfil2.src = placeholder; 
  // imagePerfil3.src = placeholder; 
  // imagePerfil4.src = placeholder; 

}

// const initApp = () => {
//   const droparea = document.querySelector('.droparea');

//   const active = () => droparea.classList.add("green-border");

//   const inactive = () => droparea.classList.remove("green-border");

//   const prevents = (e) => e.preventDefault();

//   ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
//       droparea.addEventListener(evtName, prevents);
//   });

//   ['dragenter', 'dragover'].forEach(evtName => {
//       droparea.addEventListener(evtName, active);
//   });

//   ['dragleave', 'drop'].forEach(evtName => {
//       droparea.addEventListener(evtName, inactive);
//   });

//   droparea.addEventListener("drop", handleDrop);

// }

// document.addEventListener("DOMContentLoaded", initApp);

// const handleDrop = (e) => {
//   const dt = e.dataTransfer;
//   const files = dt.files;
//   const fileArray = [...files];
//   console.log(files); // FileList
//   console.log(fileArray);
// }

filePhoto.onchange = evt => {
  const [file] = filePhoto.files
  // const [file3] = filePhoto3.files
  // const [file4] = filePhoto4.files
  if (file) {
      imagePerfil.src = URL.createObjectURL(file)
  }
 
}

filePhoto2.onchange = evt => {
  const [file2] = filePhoto2.files
  if (file2) {
    imagePerfil2.src = URL.createObjectURL(file2)
  }
}

