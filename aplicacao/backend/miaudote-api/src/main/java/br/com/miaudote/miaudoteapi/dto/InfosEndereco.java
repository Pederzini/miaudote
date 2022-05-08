package br.com.miaudote.miaudoteapi.dto;

public class InfosEndereco {

    private String Logradouro;

    private Integer Numero;

    private String Bairro;

    private String Cep;

    private String Cidade;

    public InfosEndereco(String logradouro, Integer numero, String bairro, String cep, String cidade) {
        Logradouro = logradouro;
        Numero = numero;
        Bairro = bairro;
        Cep = cep;
        Cidade = cidade;
    }

    public String getLogradouro() {
        return Logradouro;
    }

    public void setLogradouro(String logradouro) {
        Logradouro = logradouro;
    }

    public Integer getNumero() {
        return Numero;
    }

    public void setNumero(Integer numero) {
        Numero = numero;
    }

    public String getBairro() {
        return Bairro;
    }

    public void setBairro(String bairro) {
        Bairro = bairro;
    }

    public String getCep() {
        return Cep;
    }

    public void setCep(String cep) {
        Cep = cep;
    }

    public String getCidade() {
        return Cidade;
    }

    public void setCidade(String cidade) {
        Cidade = cidade;
    }
}
