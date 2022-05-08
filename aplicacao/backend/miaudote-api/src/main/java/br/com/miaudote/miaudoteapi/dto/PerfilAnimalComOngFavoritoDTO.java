package br.com.miaudote.miaudoteapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PerfilAnimalComOngFavoritoDTO {

    private Integer idAnimal;

    private String nome;

    private String dataNascimento;

    private String genero;

    private String tipoPelagem;

    private String corPelagem;

    private String porte;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private String dataChegada;

    private String comportamento;

    private String castrado;

    private String vacinado;

    private String urlImagem;

    private String descricao;

    private String necessidadeEspeciais;

    private String especie;

    private Boolean favoritado;

    private InfosOng infosOng;

    public PerfilAnimalComOngFavoritoDTO(
            Integer idAnimal,
            String nome,
            String dataNascimento,
            String genero,
            String tipoPelagem,
            String corPelagem,
            String porte,
            String dataChegada,
            String comportamento,
            String castrado,
            String vacinado,
            String urlImagem,
            String descricao,
            String necessidadeEspeciais,
            String especie,
            Boolean favoritado,
            InfosOng infosOng) {
        this.idAnimal = idAnimal;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.tipoPelagem = tipoPelagem;
        this.corPelagem = corPelagem;
        this.porte = porte;
        this.dataChegada = dataChegada;
        this.comportamento = comportamento;
        this.castrado = castrado;
        this.vacinado = vacinado;
        this.urlImagem = urlImagem;
        this.descricao = descricao;
        this.necessidadeEspeciais = necessidadeEspeciais;
        this.especie = especie;
        this.favoritado = favoritado;
        this.infosOng = infosOng;
    }

    public Integer getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(Integer idAnimal) {
        this.idAnimal = idAnimal;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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

    public String getTipoPelagem() {
        return tipoPelagem;
    }

    public void setTipoPelagem(String tipoPelagem) {
        this.tipoPelagem = tipoPelagem;
    }

    public String getCorPelagem() {
        return corPelagem;
    }

    public void setCorPelagem(String corPelagem) {
        this.corPelagem = corPelagem;
    }

    public String getPorte() {
        return porte;
    }

    public void setPorte(String porte) {
        this.porte = porte;
    }

    public String getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(String dataChegada) {
        this.dataChegada = dataChegada;
    }

    public String getComportamento() {
        return comportamento;
    }

    public void setComportamento(String comportamento) {
        this.comportamento = comportamento;
    }

    public String getCastrado() {
        return castrado;
    }

    public void setCastrado(String castrado) {
        this.castrado = castrado;
    }

    public String getVacinado() {
        return vacinado;
    }

    public void setVacinado(String vacinado) {
        this.vacinado = vacinado;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNecessidadeEspeciais() {
        return necessidadeEspeciais;
    }

    public void setNecessidadeEspeciais(String necessidadeEspeciais) {
        this.necessidadeEspeciais = necessidadeEspeciais;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public Boolean getFavoritado() {
        return favoritado;
    }

    public void setFavoritado(Boolean favoritado) {
        this.favoritado = favoritado;
    }

    public InfosOng getInfosOng() {
        return infosOng;
    }

    public void setInfosOng(InfosOng infosOng) {
        this.infosOng = infosOng;
    }

}