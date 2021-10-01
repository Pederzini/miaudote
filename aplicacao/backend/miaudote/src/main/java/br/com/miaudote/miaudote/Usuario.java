package br.com.miaudote.miaudote;

public abstract class Usuario {

    private String email;
    private String senha;
    private String telefone;
    private String rua;
    private Boolean autenticado;

    public Usuario(String email, String senha, String telefone, String rua) {
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.rua = rua;
        this.autenticado = false;
    }

    public abstract Boolean verificarIdentidade(String documento);

    public Boolean autenticarLogin(String email, String senha) {

        if (this.email.equals(email) && this.senha.equals(senha)) {
            this.autenticado = true;
            return true;
        } else {
            return false;
        }
    }

    public void logoff() {
        this.autenticado = false;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getRua() {
        return rua;
    }

    public Boolean getAutenticado() {
        return autenticado;
    }

}
