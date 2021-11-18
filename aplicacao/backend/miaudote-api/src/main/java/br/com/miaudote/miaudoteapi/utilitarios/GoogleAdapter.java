package br.com.miaudote.miaudoteapi.utilitarios;

import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.dominio.Usuario;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.client.RestTemplate;

public class GoogleAdapter {

    public static Usuario registrarLatAndLong(Usuario usuario) {
        RestTemplate restTemplate = new RestTemplate();
        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

        String endereco = usuario.getEndereco().getEnderecoFormatado();

        restTemplate = restTemplateBuilder.build();
        String dadosStr = restTemplate.getForObject(String.format("https://maps.google.com/maps/api/geocode/" +
                "json?address=%s&components=country:BR" +
                "&key=AIzaSyBW_ZLgy04TjWvV9i_5HaGXG1ypQ7lsMDs", endereco), String.class);
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

    public static Endereco buscarLatAndLong(Endereco endereco) {
        RestTemplate restTemplate = new RestTemplate();
        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

        String enderecoFormatado = endereco.getEnderecoFormatado();

        restTemplate = restTemplateBuilder.build();
        String dadosStr = restTemplate.getForObject(String.format("https://maps.google.com/maps/api/geocode/" +
                "json?address=%s&components=country:BR" +
                "&key=AIzaSyBW_ZLgy04TjWvV9i_5HaGXG1ypQ7lsMDs", enderecoFormatado), String.class);
        JSONObject dados = new JSONObject(dadosStr);
        JSONArray array = dados.getJSONArray("results");
        JSONObject addressComponents = array.getJSONObject(0);
        JSONObject geometry = addressComponents.getJSONObject("geometry");
        JSONObject location = geometry.getJSONObject("location");
        Double latitude = location.getDouble("lat");
        Double longitude = location.getDouble("lng");

        endereco.setLatitude(latitude);
        endereco.setLongitude(longitude);

        return endereco;
    }

    public static double calcularDistancia(Double latitudeOng, Double longitudeOng, Double latitudeAdotante, Double longitudeAdotante) {
        double theta = longitudeOng - longitudeAdotante;
        double dist = Math.sin(deg2rad(latitudeOng)) * Math.sin(deg2rad(latitudeAdotante)) + Math.cos(deg2rad(latitudeOng)) * Math.cos(deg2rad(latitudeAdotante)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist *= 60 * 1.1515;
        dist *= 1.609344;
        dist *= 100;
        dist = ((int) dist);

        return (dist / 100);
    }

    private static Double deg2rad(Double deg) {
        return (deg * Math.PI / 180.0);
    }

    private static Double rad2deg(Double rad) {
        return (rad * 180.0 / Math.PI);
    }

}