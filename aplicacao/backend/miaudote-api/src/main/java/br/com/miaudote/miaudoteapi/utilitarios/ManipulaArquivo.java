package br.com.miaudote.miaudoteapi.utilitarios;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ManipulaArquivo {

    @Autowired
    private static OngRepository ongRepository;

    public static void gravaRegistro(String registro, String nomeArq) {
        BufferedWriter saida = null;

        try {
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        } catch (IOException erro) {
            System.out.println("Erro ao subir o arquivo: " + erro.getMessage());
        }

        try {
            saida.append(registro + "\n");
            saida.close();
        } catch (IOException erro) {
            System.out.println("Erro ao gravar no arquivo: " + erro.getMessage());
        }
    }

    public static String gravarArquivoTxt(List<Animal> lista, String cnpj) {
        Ong ong = ongRepository.findByCnpj(cnpj);
        Integer contaRegDados = 0;
        String horaAtual = DataHora.retornaDataHoraAtual().toString();
        String exportacao = "";
        exportacao += String.format("00ANIMAL%-45.45s%-14.14s%8.8s01\n", ong.getRazaoSocial(), ong.getCnpj(), horaAtual);

        for (Animal animal : lista) {
            String corpo = "02";
            corpo += String.format("%-50.50s", animal.getNome());
            corpo += String.format("%-8.8s", animal.getEspecie());
            corpo += String.format("%-280.280s", animal.getDescricao());
            corpo += String.format("%-1.1s", animal.getGenero());
            corpo += String.format("%-10.10s", animal.getDataChegada());
            corpo += String.format("%-10.10s", animal.getCorPelagem());
            corpo += String.format("%-7.7s", animal.getTipoPelagem());
            corpo += String.format("%-5.5b", (animal.getCastrado().equalsIgnoreCase("sim")));
            corpo += String.format("%-5.5b", (animal.getVacinado().equalsIgnoreCase("sim")));
            corpo += String.format("%-7.7s", animal.getPorte());
            corpo += String.format("%-45.45s", animal.getComportamento());
            corpo += String.format("%-280.280s", animal.getNecessidadeEspeciais());
            corpo += String.format("%-10.10s", animal.getDataNascimento());
            if (animal.getUrlImagem().trim().length() != 0 || animal.getUrlImagem() != null) {
                corpo += String.format("03%1000.10000s", animal.getUrlImagem());
            }
            exportacao += corpo + "\n";
            contaRegDados++;
        }

        String trailer = "01";
        trailer += String.format("%05d", contaRegDados);
        exportacao += trailer;

        return exportacao;
    }

    public static List<Animal> leArquivoTxt(String conteudo) {
        BufferedReader entrada = null;
        String tipoRegistro;
        Animal a = null;
        Integer contaRegDados;
        Integer qtdRegistrosGravados;
        String[] conteudoVetorizado = conteudo.split(System.lineSeparator());
        List<Animal> listaLida = new ArrayList<>();

        try {
            entrada = new BufferedReader(new FileReader(conteudo));
        } catch (FileNotFoundException e) {
            System.out.println("Erro ao abrir o arquivo: " + e.getMessage());
        }

        try {
            for (int i = 0; i < conteudoVetorizado.length; i++) {
                tipoRegistro = conteudoVetorizado[i].substring(0, 2);
                if (tipoRegistro.equals("01")) {
                    qtdRegistrosGravados = Integer.valueOf(conteudoVetorizado[i].substring(2, 12));
                    if (qtdRegistrosGravados == listaLida.size()) {
                        //?
                    }
                } else if (tipoRegistro.equals("02")) {
                    a.setNome(conteudoVetorizado[i].substring(2, 53).trim());
                    a.setEspecie(conteudoVetorizado[i].substring(53, 61));
                    a.setDescricao(conteudoVetorizado[i].substring(61, 341).trim());
                    a.setGenero(conteudoVetorizado[i].substring(341, 342));
                    Date dataChegada = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(conteudoVetorizado[i].substring(342, 352));
                    a.setDataChegada(dataChegada);
                    a.setCorPelagem(conteudoVetorizado[i].substring(352, 362));
                    a.setTipoPelagem(conteudoVetorizado[i].substring(362, 369));
                    a.setCastrado(conteudoVetorizado[i].substring(369, 374).trim().equalsIgnoreCase("true"));
                    a.setVacinado(conteudoVetorizado[i].substring(374, 379).trim().equalsIgnoreCase("true"));
                    a.setPorte(conteudoVetorizado[i].substring(379, 386));
                    a.setComportamento(conteudoVetorizado[i].substring(386, 431));
                    a.setNecessidadeEspeciais(conteudoVetorizado[i].substring(431, 711));
                    Date dataNascimento = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(conteudoVetorizado[i].substring(711, 721));
                    a.setDataNascimento(dataNascimento);

                }
                if (conteudoVetorizado[i + 1].equals("03")) {
                    a.setUrlImagem(conteudoVetorizado[i].substring(03, 1003));
                    i++;
                }

                listaLida.add(a);
                a = null;

            }
        } catch (ParseException e) {
            System.out.println("Erro ao ler o arquivo: " + e.getMessage());
        }

        return listaLida;
    }
}
