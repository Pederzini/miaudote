package br.com.miaudote.miaudoteapi.dto;

public interface AdotanteQueFavoritouDTO {

    String getDataInicioProcesso();

    Animal getAnimal();

    Adotante getAdotante();

    interface Animal {
        Integer getIdAnimal();

        String getNome();
    }

    interface Adotante {
        Integer getIdAdotante();

        String getNome();

        String getDataNascimento();

        String getUrlImagem();

        Endereco getEndereco();
    }

    interface Endereco {
        String getCidade();
    }

}