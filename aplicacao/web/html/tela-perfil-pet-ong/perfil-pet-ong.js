function getInfosPet() {
    axios.get(`http://localhost:8080/miaudote/animais/${id}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        document.getElementById("campo_razao").value = response.data.razaoSocial;
        document.getElementById("campo_cnpj_escondido").value = formataCnpj(response.data.cnpj);
        document.getElementById("campo_cnpj").value = formataCnpjAsterisco(response.data.cnpj);
        document.getElementById("campo_fundacao").value = formataData(response.data.dataFundacao);
        document.getElementById("campo_resp").value = response.data.nomeResponsavel;
        document.getElementById("campo_telefone").value = formataTelefone(response.data.telefone);
        document.getElementById("campo_cep").value = formataCep((response.data.endereco.cep).trim());
        document.getElementById("campo_logradouro").value = response.data.endereco.logradouro;
        document.getElementById("campo_bairro").value = response.data.endereco.bairro;
        document.getElementById("campo_numero").value = response.data.endereco.numero;
        document.getElementById("campo_complemento").value = response.data.endereco.complemento;
        document.getElementById("campo_email").value = response.data.email;
        document.getElementById("campo_senha").value = response.data.senha;
        document.getElementById("campo_confirmar_senha").value = response.data.senha;
        if (response.data.urlImagem.length != 0) {
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