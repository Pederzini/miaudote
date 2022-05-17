var map;
var arrayCoordenadas = []
var arrayDadosOng = []
var nome = "ALO ALO"

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: JSON.parse(sessionStorage.login_usuario).endereco.latitude, lng: JSON.parse(sessionStorage.login_usuario).endereco.longitude }
    });
    var markerHome = new google.maps.Marker({
        position : { lat: JSON.parse(sessionStorage.login_usuario).endereco.latitude, lng: JSON.parse(sessionStorage.login_usuario).endereco.longitude },
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Sua residência",
        icon:{
            url: "../../imagens/home-adotante/pin-mapa-casa.svg",
            scaledSize: new google.maps.Size(40, 50)
        }
    })
    for (i = 0; i < arrayCoordenadas.length; i++) {
        var latitudeMark = arrayCoordenadas[i][0]
        var longitudeMark = arrayCoordenadas[i][1]
        var marker = new google.maps.Marker({
            position: { lat: latitudeMark, lng: longitudeMark}, 
            map: map,
            animation: google.maps.Animation.DROP, 
            title: `${arrayDadosOng[i].razaoSocial} \n${arrayDadosOng[i].logradouro}, ${arrayDadosOng[i].numero}\n${arrayDadosOng[i].cep}\n`+
            `Telefone: ${arrayDadosOng[i].telefone}\n${arrayDadosOng[i].cidade}`, 
            icon: {
                url: '../../imagens/home-adotante/pin-mapa-pata.svg',
                scaledSize: new google.maps.Size(40, 50)
            }
        });

    }
}
function popularCoordenadas() {
    axios.get(`http://ec2-44-198-214-72.compute-1.amazonaws.com/miaudote/ongs/informacoes-ongs-mapa`, {
        headers: { "Access-Control-Allow-Origin": "*", "crossorigin": true },
    }).then(response => {
        for (i = 0; i < response.data.length; i++) {
            arrayCoordenadas[i] = [response.data[i].latitude, response.data[i].longitude]
            arrayDadosOng[i] = response.data[i]
        }
        initMap();
    }).catch(function (error) {
        console.log("Erro")
    })
}

