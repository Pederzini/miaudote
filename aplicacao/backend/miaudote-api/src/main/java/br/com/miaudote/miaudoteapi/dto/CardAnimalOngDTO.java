package br.com.miaudote.miaudoteapi.dto;

import java.util.Date;

public interface CardAnimalOngDTO {

    Integer getId();

    String getEspecie();

    String getUrl();

    String getDescricao();

    Integer getIdadeAnimal();

    String getNome();

    Date getDataNascimento();

    String getGenero();

    Date getDataChegada();

    String getCorPelagem();

    String getTipoPelagem();

    Integer getCastrado();

    Integer getVacinado();

    Integer getAdotado();

    String getPorte();

    String getComportamento();

    String getNecessidadeEspeciais();

}
