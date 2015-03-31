var maxVal = 0;
var htmlBox = "";
var val = 0;
var cvProyecto = 0;
var arrayDatos = "[";

function llamarWebService(webservice, opcion, target) {
    var tabla = "";
    var infoBoxIsComplete = false;

    if (target == "tabs-4") {
        htmlBox += '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseCuatro">Financiamiento e inversiones</a></div><div id="collapseCuatro" class="accordion-body collapse in"><div class="accordion-inner">';
    }
    if (opcion == "#fasesProyecto" || opcion == "#etapasProyecto" || opcion == "#subsectoresProyecto" || opcion == "#catTiposProyectos" || opcion == "#ppProyecto" || opcion == "#catEstados" || opcion == "#catMunicipios") {
        //$(target).append('<option value="">Escriba o seleccione una opci&oacute;n</option>');
    }

    $.getJSON(webservice, function (json) {
        $.each(json, function (index, item) {
            switch (opcion) {
                case "#indicador6":
                    {
                        $(target).html('<span style="font-size:20px;">' + item.NombreEstado + "</span><br><br>" + item.Count + "");
                        $(target + "-title").html('Estado con m&aacute;s Proyectos');
                        maxVal = item.Count;
                        if (tipoFiltro == 1) {
                            llamarWebService(host + WebServicePath + "GetCountEtapaTerminado", "Terminado", "#indicador1");
                            llamarWebService(host + WebServicePath + "GetCountEtapaInversion", "Inversi&oacute;n", "#indicador3");
                            llamarWebService(host + WebServicePath + "GetCountEtapaPlaneacionPreinversion", "Planeaci&oacute;n/preinversi&oacute;n", "#indicador5");
                        }
                        break;
                    }
                case "#indicador4":
                    {
                        $(target).html('<span style="font-size:20px;">' + item.NombreSubsector + "</span><br><br>" + item.Count + "");
                        $(target + "-title").html('Subsector con m&aacute;s Proyectos');
                        break;
                    }
                case "#indicador2":
                    {

                        $(target).html(item.costoTotal + ' <span style="font-size:20px;">MDP</span>');
                        $(target + "-title").html('Costo Total de Inversi&oacute;n');
                        break;
                    }
                case "#fasesProyecto":
                    {
                        $(target).append('<option value="' + item.PK_FaseProyecto + '">' + item.Descripcion + '</option>');
                        //arrayDatos.push({ text: item.Descripcion, value: item.PK_FaseProyecto });
                        //arrayDatos += "{text: '" + item.Descripcion + "', value: '" + item.PK_FaseProyecto + "' },";
                        break;
                    }
                case "#etapasProyecto":
                    {
                        $(target).append('<option value="' + item.PK_Etapa + '">' + item.Descripcion + '</option>');
                        break;
                    }
                case "#subsectoresProyecto":
                    {
                        $(target).append('<option value="' + item.PK_SubSector + '">' + item.Descripcion + '</option>');
                        break;
                    }
                case "#catTiposProyectos":
                    {
                        $(target).append('<option value="' + item.PK_TipoProyecto + '">' + item.Descripcion + '</option>');
                        break;
                    }
                case "#ppProyecto":
                    {
                        $(target).append('<option value="' + item.PK_ProgramaPresupuestario + '">' + item.Descripcion + '</option>');
                        break;
                    }
                case "#catEstados":
                    {
                        $(target).append('<option value="' + item.PK_Estado + '">' + item.descripcion + '</option>');
                        break;
                    }
                case "#catMunicipios":
                    {
                        $(target).append('<option value="' + item.PK_Municipio + '">' + item.descripcion + '</option>');
                        break;
                    }
                case "tabs-1":
                    {
                        htmlBox = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Datos del proyecto</a></div>' +
                                    '<div id="collapseOne" class="accordion-body collapse in"><div class="accordion-inner"><table id="tabla-infoBox">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Clave del proyecto</th>' +
                                            '<td>' + item.clave + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Proyecto Integral</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.proyectoIntegral)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Descripci&oacute;n del proyecto</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.descripcionProyecto)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Riesgos en la ejecuci&oacute;n del proyecto</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.riesgoEjecucionProyecto)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Subsector</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.subSector)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Fase</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.fase)) + '</td>' +
                                        '</tr>' +
                                            '<th nowrap align="left">Medida (acci&oacute;n)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.medida)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Etapa</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.etapa)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Tipo</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.tipo)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left"></th>' +
                                            '<td></td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '</table>' +
                                    '</div></div></div>' +
                                    '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseDos">Ubicaci&oacute;n del proyecto</a></div>' +
                                    '<div id="collapseDos" class="accordion-body collapse in"><div class="accordion-inner"><table id="tabla-infoBox">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Regi&oacute;n Hidrol&oacute;gica-Admninistrativa</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.rha)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Estado</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.estado)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Unidad de planeaci&oacute;n (UP)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.celula)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Municipio</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.municipio)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Localidad</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.localidad)) + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '</table>' +
                                    '</div></div></div>' +
                                    '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTres">Estructura Program&aacute;tica</a></div>' +
                                    '<div id="collapseTres" class="accordion-body collapse in"><div class="accordion-inner"><table id="tabla-infoBox">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Ramo (RA)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.ramo)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Modalidad/Programa Presupuestario (PP)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.programaPresupuestario)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Finalidad (FI)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.finalidad)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Funci&oacute;n (FU)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.funcion)) + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '</table>' +
                                    '</div></div></div>';
                        infoBoxIsComplete = false;
                        cvProyecto = item.clave;
                        break;
                        //alert(tabla);

                    }
                case "tabs-4":
                    {
                        htmlBox += '<table id="tabla-infoBox">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th nowrap align="left">' + utf8_decode(utf8_encode(item.descripcion)) + '</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.importes)) + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '</table>';
                        //alert(tabla);
                        infoBoxIsComplete = false;
                        cvProyecto = item.CvProyecto;
                        break;
                    }
                case "tabs-5":
                    {
                        htmlBox += '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseCinco">Datos para la priorizaci&oacute;n, meta, beneficios.</a></div>' +
                                    '<div id="collapseCinco" class="accordion-body collapse in"><div class="accordion-inner"><table id="tabla-infoBox">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Meta</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.Meta)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Beneficios</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.Beneficios)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Categor&iacute;a de impacto</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.CI)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Costo adicional por uso ($)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.CAU)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Costo operativo neto anual ($) (ahorros)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.CONA)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Costo del agua ($/m3)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.CA)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Fuente</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.Fuente)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Requerimiento para que se ejecute el proyecto</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.REP)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Subtema de necesidad</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.SubNecesidad)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">&iquest;Existe soluci&oacute;n?</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.Solucion)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Descripci&oacute;n</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.Descripcion)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Recursos financieros necesarios para vencer barrera($)</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.RFNVB)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Dificultad para vencer barrera</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.DVB)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">Momento en que barrera frena ejecuci&oacute;n</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.MBFE)) + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th nowrap align="left">&Aacute;rea responsable en vencer la barrera</th>' +
                                            '<td>' + utf8_decode(utf8_encode(item.ARVB)) + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                    '</table>' +
                                    '</div></div></div>';
                        //alert(tabla);
                        infoBoxIsComplete = true;
                        break;
                    }
                default:
                    {
                        val = item.Count;
                        var cat = target.split('#');
                        //$(target).html('<div class="' + cat[1] + ' circle"><strong></strong></div>');
                        $(target).html('<div id="' + cat[1] + 'Porcent"></div> <div id="'+cat[1]+'rate" data-score="1"></div>');
                        $(target + "-title").html(opcion);
                        pintarIndicador3(cat[1]);
                        pintaRating(cat[1]);
                        break;
                    }
            }
        });

        if (opcion == "#fasesProyecto") {
            //$(target).jAutochecklist();
            //arrayDatos = arrayDatos.substring(0, arrayDatos.length - 1);
            //arrayDatos += "]";
            //console.info(arrayDatos + "\n" + target);
            //$("#botonModalFiltros").click();
            $(target).combobox();
            $("#modalFiltros").dialog({
                modal: true,
                height: 350,
                buttons: {
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
            mostraSelect2();
        }
        if (opcion == "#etapasProyecto") {
            $(target).combobox();
            $("#modalFiltros").dialog({
                modal: true,
                height: 350,
                buttons: {
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
            mostraSelect2();/*
            $(target).jAutochecklist();
            $("#botonModalFiltros").click();
            mostraSelect2();*/
        }

        if (opcion == "#subsectoresProyecto") {
            $(target).combobox();
            $("#modalFiltros").dialog({
                modal: true,
                height: 350,
                buttons: {
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
            mostraSelect2();/*
            $(target).jAutochecklist();
            $("#botonModalFiltros").click();
            mostraSelect2();*/
        }

        if (opcion == "#ppProyecto") {
            $(target).combobox();
            $("#modalFiltros").dialog({
                modal: true,
                height: 350,
                buttons: {
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
            mostraSelect2();/*
            $(target).jAutochecklist();
            $("#botonModalFiltros").click();
            mostraSelect2();*/
        }

        if (opcion == "#catEstados") {
            $(target).jAutochecklist();
        }

        if (opcion == "#catMunicipios") {
            $(target).jAutochecklist();
        }

        if (opcion == "#catTiposProyectos") {
            $(target).jAutochecklist();
        }

        if (target == "tabs-1") {
            llamarWebService(host + WebServicePath + "GetFinanciamietoInversiones/" + cvProyecto, "tabs-4", "tabs-4");
        }
        if (target == "tabs-4") {
            htmlBox += '</div></div></div>';
            llamarWebService(host + WebServicePath + "GetDatosPriorizacion/" + cvProyecto, "tabs-5", "tabs-5");
        }
        if (infoBoxIsComplete) {
            htmlBox += '</div>';
            abrirInfoBox(htmlBox, cvProyecto);
            infoBoxIsComplete = false;
        }
    });

}

function mostraSelect2() {

    $("#select2-p").html('');
    $("#select3-p").html('');
    $("#subtipo-p").html('');
    /*Funciones para los selects de los filtros*/
    $("#Select1").change(function () { //alert($(this).val());
        //console.log($(this).val());
        if ($(this).val() != null && $(this).val() != "") {

            $("#select2-p").html('<select id="Select2"></select>');
            llamarWebService(host + WebServicePath + "GetEstados", "#catEstados", "#Select2");

            if (isSubsector) {
                $("#subtipo-p").html('<select id="Select4"></select>');
                llamarWebService(host + WebServicePath + "GetTiposProyecto/" + $(this).val(), "#catTiposProyectos", "#Select4");

            } else {
                $("#subtipo-p").html('');
                //alert("Entre");
            }

        } else {
            $("#select2-p").html('');
            $("#select3-p").html('');
            $("#subtipo-p").html('');

        }


        $("#Select2").change(function () {
            if ($(this).val() != null && $(this).val() != "") {
                $("#select3-p").html('<select id="Select3"></select>');
                llamarWebService(host + WebServicePath + "GetMunicipios/" + $(this).val(), "#catMunicipios", "#Select3");
            } else {
                $("#select3-p").html('');
            }
        });


    });
}

function pintarIndicador() {
    
    $(".dial").knob({
        max: maxVal,
        readOnly: true,
        width: 100,
        height: 100
    });
}

function pintarIndicador2(t) {
	//$('#circle').html('');
    $('.' + t + '.circle').circleProgress({
    value: val/maxVal,
	reverse: false
}).on('circle-animation-progress', function(event, animationProgress, stepValue) {
	var valor = stepValue*3805;
    $(this).find('strong').html(valor.toFixed(0).substr(0));
	//find('strong').text(String(stepValue.toFixed(0)).substr(0));
});
}

function pintarIndicador3(t){
    var $topLoader = $('#'+t+'Porcent').percentageLoader({width: 150, height: 150, progress : 0});
    var topLoaderRunning = false;
    if (topLoaderRunning) {
        return false;
    }
    topLoaderRunning = true;
            $topLoader.setProgress(0);
            $topLoader.setValue('0');
            var animacion = 0;
            var proyecto = val;
            var totalProyecto = maxVal;
            
            var animateFunc = function() {
              animacion += 30;
              $topLoader.setProgress(animacion/totalProyecto);
              $topLoader.setValue(animacion.toString());
              
              if (animacion < proyecto) {
                setTimeout(animateFunc, 25);
              } else {
                topLoaderRunning = false;
                $topLoader.setValue(proyecto.toString());
              }
            }
            
            setTimeout(animateFunc, 25);
}

function pintaRating(id)
{
        $('#'+id+'rate').raty({ 
        score: 3,
        half: true  });
}