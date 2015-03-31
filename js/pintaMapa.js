var markers = [];
var myLatLng = new google.maps.LatLng(23.8366955, -99.4370592);
var urlIcon = "img/ICONOS/";
var iconosEtapas = {
    inversion: { icon: urlIcon + 'inversion.png', nom: "Proyectos de inversi&oacute;n" },
    terminado: { icon: urlIcon + 'terminado.png', nom: "Proyectos terminados" },
    otro: { icon: urlIcon + 'planeacion.png', nom: "Proyectos en planeaci&oacute;n" }
}
var legend = document.getElementById('legend');
var auxWebService;
var auxValor;

//variable cluster
var markerClusterer = null;

//variable de estilos para proyectos
var styles = [[{//0 terminado
    url: 'img/m1.png', //small
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m1.png', // medium
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m1.png', //large
    height: 50,
    width: 50,
    textColor: '#000000',
    textSize: 10
}], [{ //1 inversion
    url: 'img/m2.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m2.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m2.png',
    height: 50,
    width: 50,
    textColor: '#000000',
    textSize: 10
}], [{//2 otro
    url: 'img/m3.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m3.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m3.png',
    height: 50,
    width: 50,
    textColor: '#000000',
    textSize: 10
}], [{//4 todos
    url: 'img/m5.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m5.png',
    height: 50,
    width: 50,
    textColor: '#000000'
}, {
    url: 'img/m5.png',
    height: 50,
    width: 50,
    textColor: '#000000',
    textSize: 10
}]];




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
}; //fin opciones mapa

//var numMarkers = document.getElementById('filtro');


function pintaMapa(webservice, valor) {
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    map.setTilt(45);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    
    //obtener ubicacion
    ubicacion();
    
	auxWebService = webservice;
	auxValor = valor;
	pintaMarkers(webservice, valor);
	google.maps.event.addListener(map, 'zoom_changed', function () {
	    var zoomLevel = map.getZoom();
	    //console.log(zoomLevel);
	    if (zoomLevel >= 9) {
	        //nombre de leyenda
	        $("#legend").html('');
	        $("#legend").css("display", "block");
	        if (tipoFiltro == 1) {
	            for (var key in iconosEtapas) {
	                var tipo = iconosEtapas[key];
	                var name = tipo.nom;
	                var icon = tipo.icon;
	                var div = document.createElement('div');
	                if (auxValor == 4) {
	                    div.innerHTML = '<img src="' + icon + '"> ' + name;
	                } else {
	                    if (auxValor == 1 && key == "terminado") {
	                        div.innerHTML = '<img src="' + icon + '"> ' + name;
	                    } else if (auxValor == 2 && key == "inversion") {
	                        div.innerHTML = '<img src="' + icon + '"> ' + name;
	                    } else if( auxValor == 3 && key == "otro"){
	                        div.innerHTML = '<img src="' + icon + '"> ' + name;
	                    }
	                }
	                legend.appendChild(div);
	            }
	        }
	    } else {
	        $("#legend").html('');
	        $("#legend").css("display", "none");
	    }
	});
}

function clicMapa(webservice, valor, target){
	var clicIndicador = document.getElementById(target);
	google.maps.event.addDomListener(clicIndicador, 'click', pintaMarkers(webservice, valor));
	auxWebService = webservice;
	auxValor = valor;
}


function resizeMap() {
	map = null;
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	//console.log(auxWebService + "\n" + auxValor);
    pintaMapa(auxWebService,auxValor);
}
var bounds = new google.maps.LatLngBounds();

function pintaMarkers(webservice, valor) {
    auxWebService = webservice;
    auxValor = valor;

    limpiarMapa();
    markers = [];

    style = valor-1;
    style = style === -1 ? null : style;

    var url = webservice + valor;
    //variable para obtener cantidad de marcadores
    var val = valor;
    var markColor;
    $.getJSON(url).done(function (json) {

        $.each(json, function (index, item) {

            var latLng = new google.maps.LatLng(item.Latitud, item.Longitud);

            //console.log("ZOOM: " + n);
            //
            /*colores de los markers*/

            if (item.Descripcion == "1") {
                markColor = "terminado.png";
            } else if (item.Descripcion == "2") {
                markColor = "inversion.png";
            } else if (item.Descripcion == "3") {
                markColor = "planeacion.png";
            } else {
                markColor = "no entra_" + item.Descripcion;
            }
            var markImage = new google.maps.MarkerImage("img/ICONOS/" + markColor);

            var marker = new google.maps.Marker({
                //animation: google.maps.Animation.DROP,
                position: latLng,
                map: map,
                title: item.Localidad,
                icon: markImage,
                html: '<div><h1> Clave: ' + item.CvProyecto + '</h1>' +
                          '<p>Descripción: ' + item.Descripcion + '</p>' +
                          '</div>'
            }); //fin  marker

            markers.push(marker);
            bounds.extend(latLng);
            infoBox(map, marker, item,item.CvProyecto);

        }); //fin each

        markerClusterer = new MarkerClusterer(map, markers, {
            styles: styles[style]
        });
        map.fitBounds(bounds);
    });     //fin getJSON
}

var mark;
var infoBoxTabs = '<a id="expPDF" href="#" target="_blank"><input type="button" value="Exportar a PDF" /></a><div class="accordion" id="accordion2">';
function infoBox(map, marker, item,cve) {
    
    // Attaching a click event to the current marker
    google.maps.event.addListener(marker, "click", function (e) {
        //map.setZoom(8),
        map.setCenter(marker.getPosition());
        mark = marker;
        llamarWebService(host + WebServicePath + "GetDatosProyecto/" + cve, "tabs-1", "tabs-1");
        
        
    });
} //fin funcion informacion de marcador
var infoWindow;
function abrirInfoBox(infoHTML,cve) {
    if (infoWindow) {
        infoWindow.close();
    }
    //alert(infoBoxTabs + infoHTML);
    infoWindow = new google.maps.InfoWindow({
        content: infoBoxTabs+infoHTML
    });
    //infoWindow.setContent(infoBoxTabs + infoHTML);
    google.maps.event.addListener(infoWindow, 'domready', function () {
        // $("#infoBox-tabs").tabs();
        $("#infoBox-tabs").accordion({
            heightStyle: "fill"
        });
        $("#expPDF").attr("href", host+"topdf/CS.aspx?cve="+cve);
    });
        
    infoWindow.open(map, mark);
}

function limpiarMapa() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
    }
    if (markerClusterer) {
        markerClusterer.clearMarkers();
    }

}

function ubicacion(){
	if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      console.log("Ubicación: " + position.coords.latitude + " - " + position.coords.longitude);

     /* var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);*/
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: Servicio de Geolocalización falló.';
  } else {
    var content = 'Error: Su explorador web no soporta el servicio de Geolocalización.';
  }
}
