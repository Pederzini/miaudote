package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.OngMapaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface OngRepository extends JpaRepository<Ong, Integer> {

    Ong findByEmailAndSenha(String email, String senha);

    Ong findByCnpj(String cnpj);

    @Query(value = "SELECT razao_social as razaoSocial, telefone, url_imagem as urlImagem, logradouro, numero, cep, latitude, longitude, cidade " +
            "FROM Ong INNER JOIN Endereco " +
            "ON fk_endereco = id_endereco", nativeQuery = true)
    List<OngMapaDTO> encontrarTodasAsOngs();

    @Modifying
    @Transactional
    @Query("UPDATE Ong o SET o.nomeResponsavel = ?2, " +
            "o.razaoSocial = ?3, " +
            "o.dataFundacao = ?4, " +
            "o.cnpj = ?5, " +
            "o.telefone = ?6, " +
            "o.email = ?7, " +
            "o.senha = ?8, " +
            "o.urlImagem = ?9 " +
            "WHERE o.id = ?1")
    void updateOng(
            Integer id,
            String nomeResponsavel,
            String razaoSocial,
            Date dataFundacao,
            String cnpj,
            String telefone,
            String email,
            String senha,
            String urlImagem
    );
}