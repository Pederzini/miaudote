package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/miaudote/adotante")
public class AdotanteCrontoller {
    @Autowired
    private AdotanteRepository adotanteRepository;

    @PostMapping
    public ResponseEntity cadastroAdotante(@RequestBody Adotante adotanteCad){
        adotanteRepository.save(adotanteCad);
        return ResponseEntity.status(201).build();
    }

//    @PostMapping("/login")
//    public ResponseEntity loginAdotante(){
//        return null;
//    }



}
