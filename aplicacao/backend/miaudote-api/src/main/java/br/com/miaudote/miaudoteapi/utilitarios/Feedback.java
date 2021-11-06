package br.com.miaudote.miaudoteapi.utilitarios;

public class Feedback {

    String feedback;

    Integer avaliacaoSite;

    public Feedback(String feedback, Integer avaliacaoSite) {
        this.feedback = feedback;
        this.avaliacaoSite = avaliacaoSite;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Integer getAvaliacaoSite() {
        return avaliacaoSite;
    }

    public void setAvaliacaoSite(Integer avaliacaoSite) {
        this.avaliacaoSite = avaliacaoSite;
    }

}
