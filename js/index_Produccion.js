$(document).ready(function () {
    /************************************************
    ** Funciones para ocultar y mostrar el menu *****
    ************************************************/
    $(".subnavbar").load("subnav.html", function () {
        $(".subnavbar-inner").slideUp(1);

        /************************************************
        ** Funciones para los botones del menu **********
        ************************************************/
        $("#E_Terminado").click(function () {
            pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 1);
        });
        $("#E_Inversion").click(function () {
            pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 2);
        });
        $("#E_Planeacion").click(function () {
            pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 3);
        });
        $("#E_Todos").click(function () {
            pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 4);
        });
        /************************************************
        ** Fin Funciones para los botones del menu ******
        ************************************************/
    });

    $(".navbar").click(function () {
        $(".subnavbar-inner").slideToggle("slow");
    });
    /************************************************
    ** Fin Funciones para ocultar y mostrar el menu *
    ************************************************/

    /************************************************
    ** Funciones para el intercambio de posiciones **
    ************************************************/
    $("#widget-1").dblclick(function () {
        cambiarPos(this);
    });

    $("#widget-2").dblclick(function () {
        cambiarPos(this);
    });

    $("#widget-3").dblclick(function () {
        cambiarPos(this);
    });
    /****************************************************
    ** Fin Funciones para el intercambio de posiciones **
    *****************************************************/

    /************************************************
    ** Llamada a webservice para indicadores ********
    ************************************************/
    llamarWebService("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetCountEtapaTerminado", "#indicador1");
    llamarWebService("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetCountEtapaInversion", "#indicador3");
    llamarWebService("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetCountEtapaPlaneacionPreinversion", "#indicador5");
    /************************************************
    ** Fin Llamada a webservice para indicadores ****
    ************************************************/

    /************************************************
    ** Llamada a metodo para cargar la grafica ******
    ************************************************/
    cargaGrafica();
    /************************************************
    ** Fin Llamada a metodo para cargar la grafica **
    ************************************************/

    /************************************************
    ** Llamada a metodo para cargar mapa ************
    ************************************************/
    pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 4);
    /************************************************
    ** Fin Llamada a metodo para cargar mapa ********
    ************************************************/

    addSwipe();
    addClickFunctionIndicador();
});

/************************************************
** Función para detectar gestos de mouse/tactil *
************************************************/
function addSwipe() {
    $(".widget-header").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == "right") {
                $("#boton").click();
            }
            if (direction == "left") {
                var id = $(this).parent().parent().attr("id");
                if (id == "widget-1" || id == "widget-2" || id == "widget-3") {
                    cambiarPos("#" + id);
                }
            }
            //alert(direction+"\n"+duration+"\n"+distance+"\n"+fingerCount+"\n"+fingerData);
        },
        threshold: 0
    });
}
/****************************************************
** Fin Función para detectar gestos de mouse/tactil *
*****************************************************/
function cambiarPos(target) {
    var aux = $(target).html();
    var aux2 = $("#main-content").html();
    var isMap = false;

    if ($(target).find("div").attr('id') == "grafica") {
        $(target).find("iframe").css('height', '400px');
        aux = $(target).html();
    }
    if ($("#main-content").find("div").attr('id') == "grafica") {
        $("#main-content").find("iframe").css('height', '100%');
        aux2 = $("#main-content").html();
    }

    if ($(target).find("div").attr('id') == "indicadores") {
        $(target).find('div[class="stats-box-all-info-widget"]').attr('class', 'stats-box-all-info');
        aux = $(target).html();
    }
    if ($("#main-content").find("div").attr('id') == "indicadores") {
        $("#main-content").find('div[class="stats-box-all-info"]').attr('class', 'stats-box-all-info-widget');
        aux2 = $("#main-content").html();
    }

    if ($(target).find("div").attr('id') == "mapa") {
        $(target).find('div[class="map_canvas-widget"]').attr('class', 'map_canvas');
        aux = $(target).html();
        isMap = true;
    }
    if ($("#main-content").find("div").attr('id') == "mapa") {
        $("#main-content").find('div[class="map_canvas"]').attr('class', 'map_canvas-widget');
        aux2 = $("#main-content").html();
        isMap = true;
    }

    $("#main-content").html(aux);
    $(target).html(aux2);
    if (isMap) {
        resizeMap();
        isMap = false;
    }
    addSwipe();
    addClickFunctionIndicador();
}
/*************************************************
** Fin Funcion para el intercambio de posiciones *
**************************************************/

/************************************************
** Funciones al dar click a los indicadores *****
************************************************/
function addClickFunctionIndicador() {
    $("#indicador1").click(function () {
        pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 1);
    });
    $("#indicador3").click(function () {
        pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 2);
    });
    $("#indicador5").click(function () {
        pintaMapa("http://201.116.60.25/ServicioCatalogo/Service.svc/rest/GetMapa_EtapasProyectoFiltro/", 3);
    });
}
/************************************************
** Fin Funciones al dar click a los indicadores *
************************************************/