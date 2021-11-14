package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dto.AdotanteDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface AdotanteRepository extends JpaRepository<Adotante, Integer> {

    Adotante findByEmailAndSenha(String email, String senha);

    AdotanteDTO findByIdEquals(Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE Adotante a SET a.nome = ?2, " +
            "a.dataNascimento = ?3, " +
            "a.cpf = ?4, " +
            "a.telefone = ?5, " +
            "a.email = ?6, " +
            "a.senha = ?7, " +
            "a.urlImagem = ?8 " +
            "WHERE a.id = ?1")
    void updateAdotante(
            Integer id,
            String nome,
            Date dataNascimento,
            String cpf,
            String telefone,
            String email,
            String senha,
            String urlImagem
    );
}