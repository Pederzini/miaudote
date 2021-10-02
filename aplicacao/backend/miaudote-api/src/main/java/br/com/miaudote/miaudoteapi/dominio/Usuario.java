package br.com.miaudote.miaudoteapi.dominio;

import javax.persistence.*;

@MappedSuperclass
public abstract class Usuario {
    @Column(length = 11, nullable = false)
    private String telefone;

    @Column(length = 255, nullable = false)
    private String email;

    @Column(length = 16, nullable = false)
    private String senha;

    @Column(length = 2083, nullable = false)
    private String urlImagem;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fkEndereco", referencedColumnName ="id")
    private Endereco endereco;

    public Usuario(){

    }

    public Usuario(String telefone, String email, String senha, String urlImagem, Endereco endereco) {
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.urlImagem = urlImagem;
        this.endereco = endereco;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
}


