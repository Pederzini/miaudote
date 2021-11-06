package br.com.miaudote.miaudoteapi.dto;

public interface AdocaoFinalizadaDTO {

    Integer getId();

    String getDataInicioProcesso();

    String getDataAdocao();

    String getModoContato();

    Animal getAnimal();

    Adotante getAdotante();

    interface Animal {
        Integer getIdAnimal();

        String getNome();

        String getDataNascimento();

        String getGenero();

        String getUrlImagem();

        Ong getOng();
    }

    interface Ong {
        Integer getIdOng();

        String getCnpj();
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
