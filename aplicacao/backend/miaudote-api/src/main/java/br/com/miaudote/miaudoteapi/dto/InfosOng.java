package br.com.miaudote.miaudoteapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class InfosOng {
    private Integer idOng;

    private String razaoSocial;

    private String urlImagem;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private String dataFundacao;

    private String telefone;

    private String email;

    private String nomeResponsavel;

    private InfosEndereco infosEndereco;

    public InfosOng(
            Integer idOng,
            String razaoSocial,
            String urlImagem,
            String dataFundacao,
            String telefone,
            String email,
            String nomeResponsavel,
            InfosEndereco infosEndereco
    ) {
        this.idOng = idOng;
        this.razaoSocial = razaoSocial;
        this.urlImagem = urlImagem;
        this.dataFundacao = dataFundacao;
        this.telefone = telefone;
        this.email = email;
        this.nomeResponsavel = nomeResponsavel;
        this.infosEndereco = infosEndereco;
    }

    public Integer getIdOng() {
        return idOng;
    }

    public void setIdOng(Integer idOng) {
        this.idOng = idOng;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public String getDataFundacao() {
        return dataFundacao;
    }

    public void setDataFundacao(String dataFundacao) {
        this.dataFundacao = dataFundacao;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public InfosEndereco getInfosEndereco() {
        return infosEndereco;
    }

    public void setInfosEndereco(InfosEndereco infosEndereco) {
        this.infosEndereco = infosEndereco;
    }
}
