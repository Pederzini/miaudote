package br.com.miaudote.miaudoteapi.utilitarios;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ManipulaArquivo {

    @Autowired
    private static OngRepository ongRepository;

    public static void gravaRegistro(String registro, String nomeArq){
        BufferedWriter saida = null;

        try{
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        }
        catch (IOException erro){
            System.out.println("Erro ao subir o arquivo: " + erro.getMessage());
        }

        try{
            saida.append(registro + "\n");
            saida.close();
        }
        catch (IOException erro){
            System.out.println("Erro ao gravar no arquivo: " + erro.getMessage());
        }
    }

    public static void gravarArquivoTxt(List<Animal> lista, String nomeArq, Animal animal){
        Integer contaRegDados = 0;
        String horaAtual = DataHora.retornaDataHoraAtual().toString();
        String header = String.format("00ANIMAL%8.8s01",horaAtual);
//        Date dataDeHoje = new Date();
//        SimpleDateFormat formataData = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        gravaRegistro(header,nomeArq);

        for (Animal a : lista){
            String corpo = "02";
            corpo += String.format("%-50.50s", a.getNome());
            corpo += String.format("%-280.280s",a.getDescricao());
            corpo += String.format("%-1.1s",a.getGenero());
            corpo += String.format("%-10.10s",a.getDataChegada());
            corpo += String.format("%-10.10s",a.getCorPelagem());
            corpo += String.format("%-7.7s",a.getTipoPelagem());
            corpo += String.format("%-5.5b", (a.getCastrado().equalsIgnoreCase("sim")));
            corpo += String.format("%-5.5b",(a.getVacinado().equalsIgnoreCase("sim")));
            corpo += String.format("%-7.7s",a.getPorte());
            corpo += String.format("%-45.45s",a.getComportamento());
            corpo += String.format("%-280.280s",a.getNecessidadeEspeciais());
            corpo += String.format("%-10.10s",a.getDataNascimento());
            if (animal.getUrlImagem().trim().length() != 0 || animal.getUrlImagem() != null ){
                corpo+= String.format("03%1000.10000s", a.getUrlImagem());
            }
            gravaRegistro(corpo,nomeArq);
            contaRegDados++;
        }

        String trailer = "01";
        trailer += String.format("%05d",contaRegDados);
        gravaRegistro(trailer,nomeArq);
    }

    public static void leArquivoTxt(String nomeArq, String cnpj){
        BufferedReader entrada = null;
        String registro, tipoRegistro;
        Animal a = null;
        Ong ong = null;
        String ra, nome, curso, disciplina, descricao, genero, corPelagem, tipoPelagem, porte,
                comportamento, necessidadesEspeciais;
        Boolean castrado, vacinado;
        Integer contaRegDados;
        Integer qtdRegistrosGravados;

        List<Animal> listaLida = new ArrayList<>();

        try{
            entrada = new BufferedReader(new FileReader(nomeArq));
        }
        catch (FileNotFoundException e) {
            System.out.println("Erro ao abrir o arquivo: " + e.getMessage());
        }

        try{
            registro = entrada.readLine();
            while (registro!= null){
                tipoRegistro = registro.substring(0,2);
                if (tipoRegistro.equals("00")) {
                    ong = ongRepository.findByCnpj(cnpj);
                }else if (tipoRegistro.equals("01")){
                    qtdRegistrosGravados = Integer.valueOf(registro.substring(2,12));
                    if (qtdRegistrosGravados == listaLida.size()){
                        //?
                    }
                }else if (tipoRegistro.equals("02")){
                    a.setNome (registro.substring(2,53).trim());
                    a.setDescricao (registro.substring(53,333).trim());
                    a.setGenero (registro.substring(333,334));
                    Date dataChegada = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(registro.substring(334,344);
                    a.setDataChegada(dataChegada);
                    a.setCorPelagem (registro.substring(344,354));
                    a.setTipoPelagem (registro.substring(354,361));
                    a.setCastrado (registro.substring(361,366).trim().equalsIgnoreCase("true"));
                    a.setVacinado(registro.substring(366,371).trim().equalsIgnoreCase("true"));
                    a.setPorte(registro.substring(371,378));
                    a.setComportamento(registro.substring(378,423));
                    a.setNecessidadeEspeciais(registro.substring(423,703));
                    Date dataNascimento = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(registro.substring(423,703);
                    a.setDataNascimento(dataNascimento);


                }else if (tipoRegistro.equals("03")){
                    a.setUrlImagem(registro.substring(03,1003));
                }

                registro = entrada.readLine();
            }
            entrada.close();
        }
        catch (IOException e){
            System.out.println("Erro ao ler o arquivo: " + e.getMessage());
        }
        System.out.println("\nConteúdo lido do arquivo:");
        for (Aluno a : listaLida){
            System.out.println(a);
        }
    }
}
