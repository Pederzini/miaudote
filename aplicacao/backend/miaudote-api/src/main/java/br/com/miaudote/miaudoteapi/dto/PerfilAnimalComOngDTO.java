package br.com.miaudote.miaudoteapi.dto;

public interface PerfilAnimalComOngDTO {

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

        Ong getOng();
    }

    interface Ong {
        Integer getIdOng();

        String getRazaoSocial();

        String getUrlImagem();

        String getDataFundacao();

        String getTelefone();

        String getEmail();

        String getNomeResponsavel();

        Endereco getEndereco();
    }

    interface Endereco {
        String getLogradouro();

        Integer getNumero();

        String getBairro();

        String getCep();

        String getCidade();
    }

}