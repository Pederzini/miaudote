package br.com.miaudote.miaudoteapi.dto;

public interface InfosAdotanteDTO {

    Boolean getFavoritado();

    Adotante getAdotante();

    Animal getAnimal();

    interface Animal {
        Integer getId();
    }

    interface Adotante {
        Endereco getEndereco();
    }

    interface Endereco {

        Double getLatitude();

        Double getLongitude();

    }

}
