package br.com.miaudote.miaudoteapi.dto;

import java.util.Date;

public interface CardAnimalSemDistanciaDTO {

    String getNome();

    Date getDataNascimento();

    String getDescricao();

    Integer getId();

    String getUrlImagem();

    String getEspecie();

    Date getDataChegada();

    Boolean getCastrado();

    String getPorte();

    String getTipoPelagem();

    Boolean getVacinado();

    String getComportamento();

    Boolean getAdotado();

    String getNecessidadesEspeciais();

    Ong getOng();

    interface Ong {
        Endereco getEndereco();
    }

    interface Endereco {
        Double getLatitude();

        Double getLongitude();
    }

}
