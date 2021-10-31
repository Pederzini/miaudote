package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Processo_Adocao")
public class ProcessoAdocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adocao")
    private Integer id;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date dataAdocao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date dataInicioProcesso;

    private Boolean favoritado;

    private String feedback;

    private Integer avaliacaoSite;

    private String modoContato;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_adotante", referencedColumnName = "id_adotante")
    private Adotante adotante;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_animal", referencedColumnName = "id_animal")
    private Animal animal;

    public ProcessoAdocao() {
    }

    public ProcessoAdocao(Date dataAdocao, Date dataInicioProcesso, Boolean favoritado, String feedback,
                          Integer avaliacaoSite, String modoContato, Adotante adotante, Animal animal) {
        this.dataAdocao = dataAdocao;
        this.dataInicioProcesso = dataInicioProcesso;
        this.favoritado = favoritado;
        this.feedback = feedback;
        this.avaliacaoSite = avaliacaoSite;
        this.modoContato = modoContato;
        this.adotante = adotante;
        this.animal = animal;
    }

    public Integer getIdAdocao() {
        return id;
    }

    public void setIdAdocao(Integer id) {
        this.id = id;
    }

    public Date getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(Date dataAdocao) {
        this.dataAdocao = dataAdocao;
    }

    public Date getDataInicioProcesso() {
        return dataInicioProcesso;
    }

    public void setDataInicioProcesso(Date dataInicioProcesso) {
        this.dataInicioProcesso = dataInicioProcesso;
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

    public String getModoContato() {
        return modoContato;
    }

    public void setModoContato(String modoContato) {
        this.modoContato = modoContato;
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