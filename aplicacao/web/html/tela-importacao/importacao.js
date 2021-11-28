function topo() {
    window.scrollTo(0, 0)
}

var arquivo;

function readfiles(files) {
    for (var i = 0; i < files.length; i++) {
        if (files[i].type == "text/plain") {
            if (files[i].size <= 10000) { // valor certo 65535
                arquivo = files[i]
                document.getElementById('fileDragName').value = files[i].name
            } else {
                alert("Tamanho do arquivo exede o permitido")
            }
        } else {
            alert("Tipo de arquivo não permitido")
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
    if (size < 1) { //valor certo = 65535
        arquivo.upload.files[0]
        alert('Permitido'); //Abaixo do permitido
    } else {
        alert('Não permitido'); //Acima do limite
        upload.value = ""; //Limpa o campo
    }
    e.preventDefault();
});

function postCadastroArquivo() {

    if (arquivo === undefined) {
        alert("Coloca um arquivo amiguinho :D")
    } else {
        var formData = new FormData();
        formData.append("arquivo", arquivo);

        axios.post(`http://localhost:8080/miaudote/animais/importacao/${JSON.parse(sessionStorage.login_usuario).cnpj}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(response => {
            Swal.fire({
                title: 'Cadastro concluído!',
                text: 'Agora você pode receber doações! Clique em ok para fazer o login!',
                icon: 'success',
                confirmButtonText: 'Ok',
confirmButtonColor: '#8675A5'
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