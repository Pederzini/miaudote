package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessoAdocaoRepository extends JpaRepository<ProcessoAdocao, Integer> {
}
