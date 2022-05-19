function topo() {
    window.scrollTo(0, 0)
}

var arquivo;

function mostraLoading() {
    document.getElementsByClassName('loading')[0].style.display = "flex"
}
  
function escondeLoading() {
    document.getElementsByClassName('loading')[0].style.display = "none"
}

function readfiles(files) {
    for (var i = 0; i < files.length; i++) {
        if (files[i].type == "text/plain") {
            if (files[i].size <= 65535) {
                arquivo = files[i]
                document.getElementById('fileDragName').value = files[i].name
            } else {
                Swal.fire({
                    title: "Tamanho de arquivo excede o permitido",
                    text: 'Faça o upload de um arquivo com tamanho até 65Kb',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#8675A5'
                })
            }
        } else {
            Swal.fire({
                title: "Arquivo inválido!",
                text: 'Faça o upload de um tipo de arquivo válido (.txt)',
                icon: 'warning',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#8675A5'
            })
        }

        reader = new FileReader();
    }
}

var holder = document.getElementById('holder');
holder.ondragover = function () {
    this.className = 'hover';
    return false;
};
holder.ondragend = function () {
    this.className = '';
    return false;
};
holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
    console.log
}

var $input = document.getElementById('input-file'),
    $fileName = document.getElementById('fileDragName');

$input.addEventListener('change', function () {
    $fileName.value = this.value;
});


var upload = document.getElementById("input-file");
upload.addEventListener("change", function (e) {
    var size = upload.files[0].size;
    if (size < 65535) {
        arquivo.upload.files[0]
    } else {
        Swal.fire({
            title: error.response.data,
            text: 'Tamanho do arquivo exede o permitido',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
        upload.value = "";
    }
    e.preventDefault();
});

function postCadastroArquivo() {
    if (arquivo === undefined) {
        Swal.fire({
            title: error.response.data,
            text: 'Coloca um arquivo amiguinho :D',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#8675A5'
        })
    } else {
        mostraLoading();
        var formData = new FormData();
        formData.append("arquivo", arquivo);

        axios.post(`https://ec2-44-198-214-72.compute-1.amazonaws.com:8443/miaudote/animais/importacao/${JSON.parse(sessionStorage.login_usuario).cnpj}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(response => {
            document.getElementById('fileDragName').value = ""
            escondeLoading()
            Swal.fire({
                title: 'Cadastro concluído!',
                text: 'Agora seu animalzinho poderá ser adotado! Clique em ok para concluir!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#8675A5'
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

}