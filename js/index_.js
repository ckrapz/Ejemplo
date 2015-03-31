var webFocusResponsive = 0;
var webFocusResponsiveT = 0;
var isSubsector = false;
var webFocusIDEtapa=null;
var filtros = ["Subsector", "Etapa", "Fase de Proyecto", "Modalidad / PP"];
var tipoFiltro = 1; //Filtro inicial...
$(document).ready(function () {
    $('#tabs').responsiveTabs({                
                rotate: false,
                startCollapsed: 'accordion',
                collapsible: 'accordion',
            animation: 'slide'});
    /************************************************
    ** Funciones para ocultar y mostrar el menu *****
    ************************************************/
    $(".subnavbar").load("subnav.html", function () {
        $(".subnavbar-inner").slideUp(1);

        /************************************************
        ** Funciones para los botones del menu **********
        ************************************************/
        $("#E_Terminado").click(function () {
            tipoFiltro = 2;
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 1);
        });
        $("#E_Inversion").click(function () {
            tipoFiltro = 2;
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 2);
        });
        $("#E_Planeacion").click(function () {
            tipoFiltro = 2;
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 3);
        });
        $("#E_Todos").click(function () {
            tipoFiltro = 2;
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 4);
            $('body').find('#grafica').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Todos');
            $('body').find('#mapa').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Todos');
            webFocusIDEtapa = null;
        });



        $("#menu-fases").click(function () {
            isSubsector = false;
            $("#select1-p").html('<select id="Select1"></select>');
            llamarWebService(host + WebServicePath + "GetFasesProyecto", "#fasesProyecto", "#Select1");
        });
        $("#menu-etapas").click(function () {

            isSubsector = false;
            $("#select1-p").html('<select id="Select1"></select>');
            llamarWebService(host + WebServicePath + "GetEtapas", "#etapasProyecto", "#Select1");

        });

        $("#menu-subsector").click(function () {
            isSubsector = true;
            $("#select1-p").html('<select id="Select1"></select>');
            llamarWebService(host + WebServicePath + "GetSubsectores", "#subsectoresProyecto", "#Select1");

        });

        $("#menu-modalidad").click(function () {
            isSubsector = false;
            $("#select1-p").html('<select id="Select1"></select>');
            llamarWebService(host + WebServicePath + "GetProgramaPresupuestario", "#ppProyecto", "#Select1");

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
    //llamarWebService(host + WebServicePath + "GetCountEtapaTerminado", "#indicador1");
    //llamarWebService(host + WebServicePath + "GetCountEtapaInversion", "#indicador3");
    //llamarWebService(host + WebServicePath + "GetCountEtapaPlaneacionPreinversion", "#indicador5");
    llamarWebService(host + WebServicePath + "GetCountNumSubsectorMasProy", "#indicador4", "#indicador4");
    llamarWebService(host + WebServicePath + "GetCostoTotalInversion", "#indicador2", "#indicador2");
    llamarWebService(host + WebServicePath + "GetEstadoNumConMasProy", "#indicador6", "#indicador6");
    /************************************************
    ** Fin Llamada a webservice para indicadores ****
    ************************************************/

    /************************************************
    ** Llamada a metodo para cargar la grafica ******
    ************************************************/
    cargaGrafica(hostWebFocus + "proj_indicadores_g1&P_VIEW_THUMB=" + webFocusResponsive);
    /************************************************
    ** Fin Llamada a metodo para cargar la grafica **
    ************************************************/

    cargarTabla(hostWebFocus + "proj_indicadores_r1&P_VIEW_THUMB=0" + webFocusResponsiveT);

    /************************************************
    ** Llamada a metodo para cargar mapa ************
    ************************************************/
    pintaMapa(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 4);
    /************************************************
    ** Fin Llamada a metodo para cargar mapa ********
    ************************************************/

    addSwipe();
    addClickFunctionIndicador();

    /*Funciones para los selects de los filtros*/
    $("#Select1").change(function () {
        //alert($(this).val());
    });
});

/************************************************
** Función para detectar gestos de mouse/tactil *
************************************************/
function addSwipe() {
    $(".widget-header").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == "right") {
                var id_wid = $(this).parent().attr("id");
                $("#myModalLabel").html(id_wid);
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

/************************************************
** Funcion para el intercambio de posiciones ****
************************************************/
function cambiarPos(target) {
    var aux = $(target).html();
    var aux2 = $("#main-content").html();
    var isMap = false;
    var isGrafica = false;
    var isTabla = false;

    if ($(target).find("div").attr('id') == "grafica") {
        $(target).find("iframe").css('height', '400px');
        aux = $(target).html();
        webFocusResponsive = 1;
        isGrafica = true;
    }
    if ($("#main-content").find("div").attr('id') == "grafica") {
        $("#main-content").find("iframe").css('height', '100%');
        aux2 = $("#main-content").html();
        webFocusResponsive = 0;
        isGrafica = true;
    }

    if ($(target).find("div").attr('id') == "indicadores") {
        $(target).find('div[class="stats-box-all-info-widget"]').attr('class', 'stats-box-all-info');
        $("#indicadores").find('.widget-content').css('height', '100%');
        aux = $(target).html();
        if (tipoFiltro == 1) {
            llamarWebService(host + WebServicePath + "GetCountEtapaTerminado","Terminado", "#indicador1");
            llamarWebService(host + WebServicePath + "GetCountEtapaInversion","Inversi&oacute;n", "#indicador3");
            llamarWebService(host + WebServicePath + "GetCountEtapaPlaneacionPreinversion","Planeaci&oacute;n/preinversi&oacute;n", "#indicador5");
        }
    }
    if ($("#main-content").find("div").attr('id') == "indicadores") {
        $("#main-content").find('div[class="stats-box-all-info"]').attr('class', 'stats-box-all-info-widget');
        $("#indicadores").find('.widget-content').css('height','250px');
        $("#indicadores").find('.widget-content').css('overflow', 'auto');
        aux2 = $("#main-content").html();
        if (tipoFiltro == 1) {
            llamarWebService(host + WebServicePath + "GetCountEtapaTerminado", "Terminado", "#indicador1");
            llamarWebService(host + WebServicePath + "GetCountEtapaInversion", "Inversi&oacute;n", "#indicador3");
            llamarWebService(host + WebServicePath + "GetCountEtapaPlaneacionPreinversion", "Planeaci&oacute;n/preinversi&oacute;n", "#indicador5");
        }
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

    if ($(target).find("div").attr('id') == "tablas") {
        $(target).find("iframe").css('height', '400px');
        aux = $(target).html();
        webFocusResponsiveT = 1;
        isTabla = true;
    }
    if ($("#main-content").find("div").attr('id') == "tablas") {
        $("#main-content").find("iframe").css('height', '100%');
        aux2 = $("#main-content").html();
        webFocusResponsiveT = 0;
        isTabla = true;
    }

    $("#main-content").html(aux);
    $(target).html(aux2);
    if (isMap) {
        resizeMap();
        isMap = false;
    }
    if (isGrafica) {
        if (tipoFiltro == 1) {
            if (webFocusIDEtapa != null) {
                cargaGrafica(hostWebFocus + "proj_indicadores_g2&P_VIEW_THUMB=" + webFocusResponsive + "&ID_ETAPAS="+webFocusIDEtapa);
            } else {
                cargaGrafica(hostWebFocus + "proj_indicadores_g1&P_VIEW_THUMB=" + webFocusResponsive);
            }
        }
        isGrafica = false;
    }
    if (isTabla) {
        cargarTabla(hostWebFocus + "proj_indicadores_r1&P_VIEW_THUMB=" + webFocusResponsiveT);
        isTabla = false;
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
        if (tipoFiltro == 1) {
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 1);
            webFocusIDEtapa = 3;
            cargaGrafica(hostWebFocus + "proj_indicadores_g2&P_VIEW_THUMB=" + webFocusResponsive + "&ID_ETAPAS=3");
            $('body').find('#grafica').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Terminado');
            $('body').find('#mapa').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Terminado');
        }
    });
    $("#indicador3").click(function () {
        if (tipoFiltro == 1) {
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 2);
            webFocusIDEtapa = 2;
            cargaGrafica(hostWebFocus + "proj_indicadores_g2&P_VIEW_THUMB=" + webFocusResponsive + "&ID_ETAPAS=2");
            $('body').find('#grafica').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Inversi&oacute;n');
            $('body').find('#mapa').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Inversi&oacute;n');
        }
    });
    $("#indicador5").click(function () {
        if (tipoFiltro == 1) {
            pintaMarkers(host + WebServicePath + "GetMapa_EtapasProyectoFiltro/", 3);
            webFocusIDEtapa = 1;
            cargaGrafica(hostWebFocus + "proj_indicadores_g2&P_VIEW_THUMB=" + webFocusResponsive + "&ID_ETAPAS=1");
            $('body').find('#grafica').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Planeaci&oacute;n/preinversi&oacute;n');
            $('body').find('#mapa').find('#widget-header-title').html(' - ' + filtros[tipoFiltro] + ' - Planeaci&oacute;n/preinversi&oacute;n');
        }
    });
}
/************************************************
** Fin Funciones al dar click a los indicadores *
************************************************/

(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
          value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
          .appendTo(this.wrapper)
          .val(value)
          .attr("title", "")
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .autocomplete({
              delay: 0,
              minLength: 0,
              source: $.proxy(this, "_source")
          })
          .tooltip({
              tooltipClass: "ui-state-highlight"
          });

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
          wasOpen = false;

            $("<a>")
          .attr("tabIndex", -1)
          .attr("title", "Show All Items")
          .tooltip()
          .appendTo(this.wrapper)
          .button({
              icons: {
                  primary: "ui-icon-triangle-1-s"
              },
              text: false
          })
          .removeClass("ui-corner-all")
          .addClass("custom-combobox-toggle ui-corner-right")
          .mousedown(function () {
              wasOpen = input.autocomplete("widget").is(":visible");
          })
          .click(function () {
              input.focus();

              // Close if already visible
              if (wasOpen) {
                  return;
              }

              // Pass empty string as value to search for, displaying all results
              input.autocomplete("search", "");
          });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
          .val("")
          .attr("title", value + " didn't match any item")
          .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);