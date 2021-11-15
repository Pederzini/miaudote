package br.com.miaudote.miaudoteapi.utilitarios;

public class PilhaObj<T> {

    private int topo;
    private T[] pilha;

    public PilhaObj(int capacidade) {
        topo = -1;
        pilha =  (T[]) new Object[capacidade];
    }

    public boolean isEmpty() {
        if (topo == -1) {
            return true;
        }
        return false;
    }

    public boolean isFull() {
        if (topo == pilha.length -1) {
            return true;
        }
        return false;
    }

    public void push(T info) {
        if (!isFull()) {
            topo++;
            pilha[topo] = info;
        } else {
            System.out.println("Pilha cheia");
        }
    }

    public T pop() {
        if (!isEmpty()) {
            T elemento = pilha[topo];
            topo--;
            return elemento;
        }
        return null;
    }

    public T peek() {
        if (!isEmpty()) {
            return pilha[topo];
        }
        return null;
    }

    public void exibe() {
        if (isEmpty()) {
            System.out.println("Pilha vazia");
        } else {
            for (int i = 0; i <= topo; i++) {
                System.out.println(pilha[i]);
            }
        }
    }

    public PilhaObj<T> multiPop(int n) {
        PilhaObj<T> pilha2 = new PilhaObj<>(n);

        if (n < topo) {
            while (n > 0) {
                pilha2.push(pop());
                n--;
            }
            return pilha2;

        }
        return null;
    }

    public void multiPush(PilhaObj<T> aux) {
        aux.pop();

        while (!aux.isEmpty()) {
            push(aux.pop());
        }
    }

}
