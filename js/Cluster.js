$(document).ready(function () {
    //Variables
    var markers = [];
    var myLatLng = new google.maps.LatLng(23.8366955, -99.4370592);
    var urlIcon = "Imagenes/";
    var iconos = {
        proyecto: { icon: urlIcon + 'pos.png', nom: "Proyectos" }
    }
    var legend = document.getElementById('legend');

    //opciones del mapa
    var mapOptions = {
        zoom: 5,
        center: myLatLng,
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        sacaleControl: false
    };//fin opciones mapa

    //cargamos mapa
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    //var panoramaOptions = {
    //    position: myLatLng,
    //    pov: {
    //        heading: 34,
    //        pitch: 10
    //    }
    //};
    //var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
    //map.setStreetView(panorama);
    //agregamos el control de la leyenda
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    //nombre de leyend
    /*
    var icon = iconos.proyecto.icon;
    var name = iconos.proyecto.nom;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
    */
    //creamos la variable bounds
    var bounds = new google.maps.LatLngBounds();
    var markerClusterer = null;

    $("#filtro").change(function () {
        var valor = $("#filtro").val();
        map = null;
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        if (markerClusterer!=null) {
            markerClusterer.clearMarkers();
        }
        markers = [];

        //alert(valor);
        //deleteMarkers();
    var url = "http://172.29.167.140/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/"+valor;
        $.getJSON(url, function (json) {
            
            $.each(json, function (index, item) {

                var latLng = new google.maps.LatLng(item.Latitud, item.Longitud);

                //console.log("ZOOM: " + n);
                //

                 var marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    map: map,
                    title: item.Localidad,
                    html: '<div><h1> Localidad: ' + item.CvProyecto + '</h1>' +
                          '<p>Acuifero: ' + item.NomProyectoIntegral + '</p>' +
                          '</div>'
                });//fin  marker

                markers.push(marker);
                bounds.extend(latLng);
                infoBox(map, marker, item);

            });//fin each

             markerCluster = new MarkerClusterer(map, markers);
            map.fitBounds(bounds);
        });//fin getJSON
    });//fin change

    //crear funcion de informacion para marcador
    function infoBox(map, marker, item) {
        var infoWindow = new google.maps.InfoWindow();
        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function (e) {
            //map.setZoom(8),
            map.setCenter(marker.getPosition());
            infoWindow.setContent(this.html);
            infoWindow.open(map, marker);
        });




    }//fin funcion informacion de marcador



    function deleteMarkers() {
        //Loop through all the markers and remove
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    };//fin funcion deleteMarkers







});//Fin Jquery