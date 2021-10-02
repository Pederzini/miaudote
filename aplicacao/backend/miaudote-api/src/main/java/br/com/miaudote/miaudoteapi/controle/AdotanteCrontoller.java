package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Usuario;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adotante")
public class AdotanteCrontoller {
    @Autowired
    private AdotanteRepository adotante;

    @PostMapping
    public Usuario loginAdotante(@RequestBody Adotante adotanteLog){
//        adotante.
        return null;
    }
}
