package br.com.miaudote.miaudoteapi.exportacao;

import br.com.miaudote.miaudoteapi.dominio.Animal;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Formatter;
import java.util.FormatterClosedException;

public class Exportacao {

    public static Integer contarAnimaisAdotados(ListaObj<Animal> lista) {
        Integer contador = 0;

        for (int i = 0; i < lista.getTamanho(); i++) {
            if (lista.getElemento(i).getAdotado().equalsIgnoreCase("Sim")) {
                contador++;
            }
        }

        return contador;
    }

    public static Integer contarAnimaisVelhos(ListaObj<Animal> lista) {
        Integer contador = 0;

        for (int i = 0; i < lista.getTamanho(); i++) {
            if (lista.getElemento(i).getAdotado().equalsIgnoreCase("Sim")) {
                contador++;
            }
        }

        return contador;
    }

    public static String gravaArquivoCsv(ListaObj<Animal> lista, String nomeDoArquivo) {
        FileWriter arquivo = null;
        Formatter saida = null;
        nomeDoArquivo += ".csv";
        Boolean deuRuim = false;
        String corpoDoArquivo = "";

        // Bloco try-catch para abrir o arquivo
        try {
            arquivo = new FileWriter(nomeDoArquivo);
            saida = new Formatter(arquivo);
        } catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo");
            System.exit(1);
        }

        // Bloco try-catch para percorrer a lista e gravar no arquivo
        try {
            saida.format("RELATORIO DE ANIMAIS\n");
            saida.format("Animais adotados: %d\n", contarAnimaisAdotados(lista));
            saida.format("Animais sem lar: %d\n\n", lista.getTamanho() - contarAnimaisAdotados(lista));
            corpoDoArquivo += "RELATORIO DE ANIMAIS\n";
            corpoDoArquivo += String.format("Animais adotados: %d\n", contarAnimaisAdotados(lista));
            corpoDoArquivo += String.format("Animais sem lar: %d\n\n", lista.getTamanho() - contarAnimaisAdotados(lista));
            saida.format("ID;NOME;GENERO;DATA NASC;DATA CHEGADA;ADOTADO;CASTRADO;VACINADO;COR PELAGEM;PORTE;TIPO PELAGEM;COMPORTAMENTO;DESCRICAO;NECESSIDADES ESPECIAIS\n");
            corpoDoArquivo += "ID;NOME;GENERO;DATA NASC;DATA CHEGADA;ADOTADO;CASTRADO;VACINADO;COR PELAGEM;PORTE;TIPO PELAGEM;COMPORTAMENTO;DESCRICAO;NECESSIDADES ESPECIAIS\n";
            for (int i = 0; i < lista.getTamanho(); i++) {
                Animal animal = lista.getElemento(i);
                saida.format("%d;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s\n",
                        animal.getIdAnimal(),
                        animal.getNome(),
                        animal.getGenero(),
                        animal.getDataNascimento(),
                        animal.getDataChegada(),
                        animal.getAdotado(),
                        animal.getCastrado(),
                        animal.getVacinado(),
                        animal.getCorPelagem(),
                        animal.getPorte(),
                        animal.getTipoPelagem(),
                        animal.getComportamento(),
                        animal.getDescricao(),
                        animal.getNecessidadeEspeciais()
                );

                corpoDoArquivo += String.format("%d;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s\n",
                        animal.getIdAnimal(),
                        animal.getNome(),
                        animal.getGenero(),
                        animal.getDataNascimento(),
                        animal.getDataChegada(),
                        animal.getAdotado(),
                        animal.getCastrado(),
                        animal.getVacinado(),
                        animal.getCorPelagem(),
                        animal.getPorte(),
                        animal.getTipoPelagem(),
                        animal.getComportamento(),
                        animal.getDescricao(),
                        animal.getNecessidadeEspeciais()
                );
            }
        } catch (FormatterClosedException erro) {
            System.out.println("Erro ao gravar no arquivo");
            deuRuim = true;
        } finally {
            saida.close();
            try {
                arquivo.close();
                return corpoDoArquivo;
            } catch (IOException erro) {
                System.out.println("Erro ao fechar o arquivo");
                deuRuim = true;
            }

            if (deuRuim) {
                System.exit(1);
            }
        }

        return null;

    }

}