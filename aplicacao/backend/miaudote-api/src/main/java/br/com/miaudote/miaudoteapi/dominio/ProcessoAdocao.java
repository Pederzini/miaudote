package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="ProcessoAdocao")
public class ProcessoAdocao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAdocao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    @Column(nullable = false)
    private Date dataAdocao;

    @Column(nullable = false)
    private Boolean favoritado;

    private String feedback;

    private Integer avaliacaoSite;

    @ManyToOne
    private Adotante adotante;

    @ManyToOne
    private Animal animal;

    public ProcessoAdocao() {
    }

    public ProcessoAdocao(Date dataAdocao, Boolean favoritado, String feedback,
                          Integer avaliacaoSite, Adotante adotante, Animal animal) {
        this.dataAdocao = dataAdocao;
        this.favoritado = favoritado;
        this.feedback = feedback;
        this.avaliacaoSite = avaliacaoSite;
        this.adotante = adotante;
        this.animal = animal;
    }

    public Integer getIdAdocao() {
        return idAdocao;
    }

    public void setIdAdocao(Integer idAdocao) {
        this.idAdocao = idAdocao;
    }

    public Date getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(Date dataAdocao) {
        this.dataAdocao = dataAdocao;
    }

    public Boolean getFavoritado() {
        return favoritado;
    }

    public void setFavoritado(Boolean favoritado) {
        this.favoritado = favoritado;
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

    public Adotante getAdotante() {
        return adotante;
    }

    public void setAdotante(Adotante adotante) {
        this.adotante = adotante;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
