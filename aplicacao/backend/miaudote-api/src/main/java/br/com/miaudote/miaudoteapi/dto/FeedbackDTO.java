package br.com.miaudote.miaudoteapi.dto;

public interface FeedbackDTO {

    Long getAvaliacaoSite();

    String getFeedback();

    Adotante getAdotante();

    interface Adotante {
        String getNome();

        String getUrlImagem();
    }

}