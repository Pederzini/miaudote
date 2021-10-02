package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Ong")
public class Ong extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOng;

    @Column(length = 60, nullable = false)
    private String nomeResponsavel;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date dataFundacao;

    @Column(length = 14, nullable = false)
    private String cnpj;

    public Ong(){

    }

    public Ong(String telefone, String email, String senha, String urlImagem, Endereco endereco,
               String nomeResponsavel, Date dataFundacao, String cnpj) {
        super(telefone, email, senha, urlImagem, endereco);
        this.nomeResponsavel = nomeResponsavel;
        this.dataFundacao = dataFundacao;
        this.cnpj = cnpj;
    }

    public Integer getIdOng() {
        return idOng;
    }

    public void setIdOng(Integer idOng) {
        this.idOng = idOng;
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
