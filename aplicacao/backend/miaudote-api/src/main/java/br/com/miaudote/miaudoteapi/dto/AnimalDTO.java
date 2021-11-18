package br.com.miaudote.miaudoteapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AnimalDTO {
    private String nome;

    private String descricao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private String dataNascimento;

    private String genero;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private String dataChegada;

    private String corPelagem;

    private String castrado;

    private String porte;

    private String tipoPelagem;

    private String vacinado;

    private String comportamento;

    private String adotado;

    private String necessidadeEspeciais;

    private String urlImagem;

    private String especie;

    public AnimalDTO(String nome, String descricao, String dataNascimento, String genero, String dataChegada,
                     String corPelagem, String castrado, String porte, String tipoPelagem, String vacinado,
                     String comportamento, String adotado, String necessidadeEspeciais,
                     String urlImagem, String especie) {
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
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(String dataChegada) {
        this.dataChegada = dataChegada;
    }

    public String getCorPelagem() {
        return corPelagem;
    }

    public void setCorPelagem(String corPelagem) {
        this.corPelagem = corPelagem;
    }

    public String getCastrado() {
        return castrado;
    }

    public void setCastrado(String castrado) {
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
        return vacinado;
    }

    public void setVacinado(String vacinado) {
        this.vacinado = vacinado;
    }

    public String getComportamento() {
        return comportamento;
    }

    public void setComportamento(String comportamento) {
        this.comportamento = comportamento;
    }

    public String getAdotado() {
        return adotado;
    }

    public void setAdotado(String adotado) {
        this.adotado = adotado;
    }

    public String getNecessidadeEspeciais() {
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

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }
}
