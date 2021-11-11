package br.com.miaudote.miaudoteapi.utilitarios;

import br.com.miaudote.miaudoteapi.dominio.Usuario;
import org.json.JSONArray;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;


public class GoogleAdapter {
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