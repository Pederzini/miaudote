package br.com.miaudote.miaudoteapi.dto;

public interface AnimaisAdotadosDTO {
    Integer getId();

    String getDataAdocao();

    String getModoContato();

    String getFeedback();

    Animal getAnimal();

    interface Animal {
        Integer getIdAnimal();

        String getNome();

        String getDataNascimento();

        String getGenero();

        String getUrlImagem();

        String getEspecie();

        Ong getOng();
    }

    interface Ong {
        Integer getIdOng();

        String getRazaoSocial();
    }

    interface Endereco {
        String getCidade();
    }

}
