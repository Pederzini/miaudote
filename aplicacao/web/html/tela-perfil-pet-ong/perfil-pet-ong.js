function getInfosPet() {
    axios.get(`http://localhost:8080/miaudote/animais/${id}`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        document.getElementById("campo_idade").value = response.data.razaoSocial;
        document.getElementById("campo_porte").value = formataCnpj(response.data.cnpj);
        document.getElementById("campo_chegada").value = formataCnpjAsterisco(response.data.cnpj);
        document.getElementById("campo_castrado").value = formataData(response.data.dataFundacao);
        document.getElementById("campo_sexo").value = response.data.nomeResponsavel;
        document.getElementById("campo_pelagem").value = formataTelefone(response.data.telefone);
        document.getElementById("campo_comportamento").value = formataCep((response.data.endereco.cep).trim());
        document.getElementById("campo_vacinacao").value = response.data.endereco.logradouro;
        document.getElementById("campo_necessidades").value = response.data.endereco.bairro;
        document.getElementById("campo_descricao").value = response.data.endereco.numero;

        // if (response.data.urlImagem.length != 0) {
        //     document.getElementById("imagePerfil").src = response.data.urlImagem;
        //     document.getElementById("textoUploader").innerHTML = "";
        // }
    }).catch(function (error) {
        Swal.fire({
            title: error.response,
            text: 'Erro ao carregar as informações da ONG',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    })
}

