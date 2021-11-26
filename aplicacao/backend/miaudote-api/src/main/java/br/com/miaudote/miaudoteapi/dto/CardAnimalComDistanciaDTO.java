package br.com.miaudote.miaudoteapi.dto;

import br.com.miaudote.miaudoteapi.utilitarios.GoogleAdapter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CardAnimalComDistanciaDTO {

    private Boolean favoritado;
    private int idAnimal;
    private String nome;
    private int idade;
    private String urlImagem;
    private String especie;
    private String descricao;
    private Double distancia;
    private Date dataChegada;
    private Boolean castrado;
    private String porte;
    private String tipoPelagem;
    private Boolean vacinado;
    private String comportamento;
    private Boolean adotado;
    private String necessidadeEspeciais;

    public CardAnimalComDistanciaDTO(Boolean favoritado, int idAnimal, String nome, Date dataNascimento, String urlImagem, String especie, String descricao, double latitudeOng, double longitudeOng, double latitudeAdotante, double longitudeAdotante) {
        this.favoritado = favoritado;
        this.idAnimal = idAnimal;
        this.nome = nome;
        this.idade = calculaIdade(dataNascimento, new Date());
        this.urlImagem = urlImagem;
        this.especie = especie;
        this.descricao = descricao;
        this.distancia = GoogleAdapter.calcularDistancia(latitudeOng, longitudeOng, latitudeAdotante, longitudeAdotante);
    }

    public CardAnimalComDistanciaDTO(
            Boolean favoritado,
            int idAnimal,
            String nome,
            Date dataNascimento,
            String urlImagem,
            String especie,
            String descricao,
            double latitudeOng,
            double longitudeOng,
            double latitudeAdotante,
            double longitudeAdotante,
            Date dataChegada,
            Boolean castrado,
            String porte,
            String tipoPelagem,
            Boolean vacinado,
            String comportamento,
            Boolean adotado,
            String necessidadeEspeciais
    ){
        this.favoritado = favoritado;
        this.idAnimal = idAnimal;
        this.nome = nome;
        this.idade = calculaIdade(dataNascimento, new Date());
        this.urlImagem = urlImagem;
        this.especie = especie;
        this.descricao = descricao;
        this.distancia = GoogleAdapter.calcularDistancia(latitudeOng, longitudeOng, latitudeAdotante, longitudeAdotante);
        this.dataChegada = dataChegada;
        this.castrado = castrado;
        this.porte = porte;
        this.tipoPelagem = tipoPelagem;
        this.vacinado = vacinado;
        this.comportamento = comportamento;
        this.adotado = adotado;
        this.necessidadeEspeciais = necessidadeEspeciais;
    }

    public static int calculaIdade(Date birthday, Date date) {
        DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        int d1 = Integer.parseInt(formatter.format(birthday));
        int d2 = Integer.parseInt(formatter.format(date));
        return (d2 - d1) / 10000;
    }

    public Boolean getFavoritado() {
        return favoritado;
    }

    public void setFavoritado(Boolean favoritado) {
        this.favoritado = favoritado;
    }

    public int getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(int idAnimal) {
        this.idAnimal = idAnimal;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getDistancia() {
        return distancia;
    }

    public void setDistancia(Double distancia) {
        this.distancia = distancia;
    }

    public Date getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(Date dataChegada) {
        this.dataChegada = dataChegada;
    }

    public Boolean getCastrado() {
        return castrado;
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

    public Boolean getVacinado() {
        return vacinado;
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

    public Boolean getAdotado() {
        return adotado;
    }

    public void setAdotado(Boolean adotado) {
        this.adotado = adotado;
    }

    public String getNecessidadeEspeciais() {
        return necessidadeEspeciais;
    }

    public void setNecessidadeEspeciais(String necessidadeEspeciais) {
        this.necessidadeEspeciais = necessidadeEspeciais;
    }
}
