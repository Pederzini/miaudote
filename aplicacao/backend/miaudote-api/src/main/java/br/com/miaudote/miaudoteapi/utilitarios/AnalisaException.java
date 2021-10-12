package br.com.miaudote.miaudoteapi.utilitarios;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;

public class AnalisaException {

    public static String analisaErroCadastro(DataIntegrityViolationException erro) {
        if(erro.getMostSpecificCause().getMessage().contains("@")) {
            return "Email já cadastrado!";
        }

        return "CPF já cadastrado";
    }
}
