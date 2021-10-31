package br.com.miaudote.miaudoteapi.exportacao;

public class ListaObj<T> {

    // Atributos
    private T[] vetor;
    private Integer nroElem;

    // Construtor
    public ListaObj(Integer tamanho) {
        vetor = (T[]) new Object[tamanho];
        nroElem = 0;
    }

    // Métodos
    public boolean adiciona(T elemento) {
        if (nroElem >= vetor.length) {
            System.out.println("Lista está cheia");
            return false;
        }

        vetor[nroElem++] = elemento;
        return true;
    }

    public void exibe() {
        if (nroElem == 0) {
            System.out.println("\nA lista está vazia.");
        } else {
            System.out.println("\nElementos da lista:");
            for (int i = 0; i < nroElem; i++) {
                System.out.println(vetor[i]);
            }
        }
    }

    public int busca(T elementoBuscado) {
        for (int i = 0; i < nroElem; i++) {
            if (vetor[i].equals(elementoBuscado)) {
                return i;
            }
        }

        return -1;
    }

    public boolean removePeloIndice(int indice) {
        if (indice < 0 || indice >= nroElem) {
            System.out.println("\nÍndice inválido!");
            return false;
        }

        for (int i = indice; i < nroElem - 1; i++) {
            vetor[i] = vetor[i + 1];
        }

        nroElem--;
        return true;
    }

    public boolean removeElemento(T elementoARemover) {
        return removePeloIndice(busca(elementoARemover));
    }

    public int getTamanho() {
        return nroElem;
    }

    public T getElemento(int indice) {
        if (indice < 0 || indice >= nroElem) {
            return null;
        }

        return vetor[indice];
    }

    public void limpa() {
        nroElem = 0;
    }

    public boolean adicionaNoInicio(T elemento) {
        if (nroElem >= vetor.length) {
            System.out.println("Lista está cheia");
            return false;
        }

        for (int i = nroElem - 1; i >= 0; i--) {
            vetor[i + 1] = vetor[i];
        }

        vetor[0] = elemento;
        nroElem++;
        return true;
    }

}