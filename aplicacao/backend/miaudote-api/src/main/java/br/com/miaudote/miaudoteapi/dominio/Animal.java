package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "Animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_animal")
    private Integer id;

    @Column(length = 45, nullable = false)
    private String nome;

    private String descricao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date dataNascimento;

    @Column(length = 1, nullable = false)
    private String genero;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date dataChegada;

    @Column(length = 20)
    private String corPelagem;

    @Column(nullable = false)
    private Boolean castrado;

    @Column(length = 7, nullable = false)
    private String porte;

    @Column(length = 7, nullable = false)
    private String tipoPelagem;

    @Column(nullable = false)
    private Boolean vacinado;

    @Column(length = 45, nullable = false)
    private String comportamento;

    @Column(nullable = false)
    private Boolean adotado;

    private String necessidadeEspeciais;

    @Column(length = 2083)
    private String urlImagem;

    @Column(length = 8, nullable = false)
    private String especie;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_ong", referencedColumnName = "id_ong")
    private Ong ong;

    public Animal() {

    }

    public Animal(String nome, String descricao, Date dataNascimento, String genero,
                  Date dataChegada, String corPelagem, Boolean castrado, String porte,
                  String tipoPelagem, Boolean vacinado, String comportamento,
                  Boolean adotado, String necessidadeEspeciais, String urlImagem, String especie) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.dataChegada = dataChegada;
        this.corPelagem = corPelagem;
        this.castrado = castrado;
        this.porte = porte;
        this.tipoPelagem = tipoPelagem;
        this.vacinado = vacinado;
        this.comportamento = comportamento;
        this.adotado = adotado;
        this.necessidadeEspeciais = necessidadeEspeciais;
        this.urlImagem = urlImagem;
        this.especie = especie;
    }

    public Animal(String nome, String descricao, Date dataNascimento, String genero, Date dataChegada,
                  String corPelagem, Boolean castrado, String porte, String tipoPelagem,
                  Boolean vacinado, String comportamento, Boolean adotado, String necessidadeEspeciais,
                  String urlImagem, String especie, Ong ong) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.dataChegada = dataChegada;
        this.corPelagem = corPelagem;
        this.castrado = castrado;
        this.porte = porte;
        this.tipoPelagem = tipoPelagem;
        this.vacinado = vacinado;
        this.comportamento = comportamento;
        this.adotado = adotado;
        this.necessidadeEspeciais = necessidadeEspeciais;
        this.urlImagem = urlImagem;
        this.especie = especie;
        this.ong = ong;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public Integer getIdAnimal() {
        return id;
    }

    public void setIdAnimal(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataNascimento() {
        SimpleDateFormat formatoCerto = new SimpleDateFormat("dd/MM/yyyy");
        return formatoCerto.format(dataNascimento);
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getGenero() {
        if (genero.equals("f")) {
            return "Femea";
        }

        return "Macho";
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDataChegada() {
        SimpleDateFormat formatoCerto = new SimpleDateFormat("dd/MM/yyyy");
        return formatoCerto.format(dataChegada);
    }

    public void setDataChegada(Date dataChegada) {
        this.dataChegada = dataChegada;
    }

    public String getCorPelagem() {
        return corPelagem;
    }

    public void setCorPelagem(String corPelagem) {
        this.corPelagem = corPelagem;
    }

    public String getCastrado() {
        if (castrado) {
            return "Sim";
        }

        return "Nao";
    }

    public void setCastrado(Boolean castrado) {
        this.castrado = castrado;
    }

    public String getPorte() {
        return porte;
    }

    public void setPorte(String porte) {
        this.porte = porte;
    }

    public String getTipoPelagem() {
        return tipoPelagem;
    }

    public void setTipoPelagem(String tipoPelagem) {
        this.tipoPelagem = tipoPelagem;
    }

    public String getVacinado() {
        if (vacinado) {
            return "Sim";
        }

        return "Nao";
    }

    public void setVacinado(Boolean vacinado) {
        this.vacinado = vacinado;
    }

    public String getComportamento() {
        return comportamento;
    }

    public void setComportamento(String comportamento) {
        this.comportamento = comportamento;
    }

    public String getAdotado() {
        if (adotado) {
            return "Sim";
        }

        return "Nao";
    }

    public void setAdotado(Boolean adotado) {
        this.adotado = adotado;
    }

    public String getNecessidadeEspeciais() {
        if (necessidadeEspeciais == null) {
            return "-";
        }

        return necessidadeEspeciais;
    }

    public void setNecessidadeEspeciais(String necessidadeEspeciais) {
        this.necessidadeEspeciais = necessidadeEspeciais;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public Ong getOng() {
        return ong;
    }

    public void setOng(Ong ong) {
        this.ong = ong;
    }

}