package br.com.miaudote.miaudoteapi.dominio;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.boot.jackson.JsonComponent;

import javax.persistence.*;

@Entity
@JsonComponent
@Table(name = "Endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = false)
    private String logradouro;

    @Column(nullable = false)
    private Integer numero;

    @Column(length = 45, nullable = false)
    private String complemento;

    @Column(length = 45, nullable = false)
    private String bairro;

    @Column(length = 9, nullable = false)
    private String cep;

    public Endereco() {
    }

    public Endereco(String logradouro, Integer numero, String complemento, String bairro, String cep) {
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cep = cep;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
}
