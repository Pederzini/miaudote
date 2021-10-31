package br.com.miaudote.miaudoteapi.dto;

public interface AdocaoEmProcessoDTO {

    String getModoContato();

    Animal getAnimal();

    Adotante getAdotante();

    Integer getId();

    interface Animal {
        Integer getIdAnimal();

        String getNome();

        String getDataNascimento();

        String getGenero();

        String getUrlImagem();
    }

    interface Adotante {
        Integer getIdAdotante();

        String getNome();

        String getDataNascimento();

        String getUrlImagem();

        Endereco getEndereco();
    }

    interface Endereco {
        String getBairro();
    }

}