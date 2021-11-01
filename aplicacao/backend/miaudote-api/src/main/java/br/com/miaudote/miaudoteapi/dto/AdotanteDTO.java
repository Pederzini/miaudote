package br.com.miaudote.miaudoteapi.dto;

public interface AdotanteDTO {
    Integer getId();

    String getNome();

    String getDataNascimento();

    String getEmail();

    String getTelefone();

    String getUrlImagem();

    Endereco getEndereco();

    interface Endereco {
        String getBairro();
    }

}
