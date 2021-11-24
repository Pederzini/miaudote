package br.com.miaudote.miaudoteapi.dto;

public interface PerfilAnimalDTO {

    Boolean getFavoritado();

    Animal getAnimal();

    interface Animal {
        Integer getIdAnimal();

        String getNome();

        String getDataNascimento();

        String getGenero();

        String getTipoPelagem();

        String getCorPelagem();

        String getPorte();

        String getDataChegada();

        String getComportamento();

        String getCastrado();

        String getVacinado();

        String getUrlImagem();

        String getDescricao();

        String getNecessidadeEspeciais();

        String getEspecie();
    }

}