package br.com.miaudote.miaudoteapi.dto;

import java.util.Date;

public class ContatoOngDTO {

    private Integer id;
    private String razaoSocial;
    private Date dataFundacao;
    private String cidade;
    private String urlImagem;
    private String email;
    private String telefone;

    public ContatoOngDTO(Integer id,
                         String razaoSocial,
                         Date dataFundacao,
                         String cidade,
                         String urlImagem,
                         String email,
                         String telefone) {
        this.id = id;
        this.razaoSocial = razaoSocial;
        this.dataFundacao = dataFundacao;
        this.cidade = cidade;
        this.urlImagem = urlImagem;
        this.email = email;
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public Date getDataFundacao() {
        return dataFundacao;
    }

    public void setDataFundacao(Date dataFundacao) {
        this.dataFundacao = dataFundacao;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

}
