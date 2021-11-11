package br.com.miaudote.miaudoteapi.dto;

public interface AnimalCardsFavoritadoDTO {
    String getFavoritado();

    Animal getAnimal();

    interface Animal {
        Integer getIdAnimal();

        String getNome();

        String getDataNascimento();

        String getUrlImagem();

        String getEspecie();

        String getDescricao();
    }
    }
