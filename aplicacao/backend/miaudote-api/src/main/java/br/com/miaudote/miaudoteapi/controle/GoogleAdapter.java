package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.dominio.Usuario;
import br.com.miaudote.miaudoteapi.repositorio.EnderecoRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/enderecos")
public class GoogleAdapter {

    @Autowired
    private EnderecoRepository enderecoRepository;


    @PostMapping
    public ResponseEntity cadastrarEndereco(@RequestBody Endereco endereco) {
        enderecoRepository.save(endereco);
        return ResponseEntity.status(201).build();
    }

    public Usuario registrarLatAndLong(Usuario usuario){

        RestTemplate restTemplate = new RestTemplate();
        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

        String endereco = usuario.getEndereco().getEnderecoFormatado();

        restTemplate = restTemplateBuilder.build();
        String dadosStr = restTemplate.getForObject(String.format("https://maps.google.com/maps/api/geocode/" +
                "json?address=%s&components=country:BR" +
                "&key=AIzaSyBW_ZLgy04TjWvV9i_5HaGXG1ypQ7lsMDs", endereco),String.class );
        JSONObject dados = new JSONObject(dadosStr);
        JSONArray array = dados.getJSONArray("results");
        JSONObject addressComponents = array.getJSONObject(0);
        JSONObject geometry = addressComponents.getJSONObject("geometry");
        JSONObject location = geometry.getJSONObject("location");
        Double latitude = location.getDouble("lat");
        Double longitude = location.getDouble("lng");

        usuario.getEndereco().setLatitude(latitude);
        usuario.getEndereco().setLongitude(longitude);
        return usuario;
    }

}