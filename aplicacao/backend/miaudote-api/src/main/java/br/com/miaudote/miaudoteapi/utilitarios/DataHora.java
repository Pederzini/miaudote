package br.com.miaudote.miaudoteapi.utilitarios;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DataHora {

    public static Date retornaDataHoraAtual() {
        Date data = new Date();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(data.toInstant(), ZoneId.of("America/Sao_Paulo"));
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

}