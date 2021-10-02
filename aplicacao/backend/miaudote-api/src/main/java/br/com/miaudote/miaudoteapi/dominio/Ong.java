package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Ong")
public class Ong extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ong")
    private Integer id;

    @Column(length = 60, nullable = false)
    private String nomeResponsavel;

    @Column(length = 45, nullable = false)
    private String razaoSocial;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date dataFundacao;

    @Column(length = 14, nullable = false)
    private String cnpj;

    public Ong(){

    }

    public Ong(String telefone, String email, String senha, String urlImagem, Endereco endereco, String nomeResponsavel, String razaoSocial, Date dataFundacao, String cnpj) {
        super(telefone, email, senha, urlImagem, endereco);
        this.nomeResponsavel = nomeResponsavel;
        this.razaoSocial = razaoSocial;
        this.dataFundacao = dataFundacao;
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public Integer getIdOng() {
        return id;
    }

    public void setIdOng(Integer id) {
        this.id = id;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public Date getDataFundacao() {
        return dataFundacao;
    }

    public void setDataFundacao(Date dataFundacao) {
        this.dataFundacao = dataFundacao;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
}
