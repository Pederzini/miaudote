package br.com.miaudote.miaudoteapi.dto;

import java.util.Date;

public interface CardAnimalSemDistanciaDTO {

    String getNome();

    Date getDataNascimento();

    String getDescricao();

    Integer getId();

    String getUrlImagem();

    String getEspecie();

    Ong getOng();

    interface Ong {
        Endereco getEndereco();
    }

    interface Endereco {

        Double getLatitude();

        Double getLongitude();

    }

}
