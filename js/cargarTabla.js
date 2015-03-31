function cargarTabla(url) {
    /*$("#iframeTabla").attr("src", '');
    $("#iframeTabla").attr("src", url);
    //$("#tabla-content").html('<iframe border="0" style="border:0px;" src="' + url + '" width="100%" scrolling="no" id="iframeTabla"></iframe>');
    $("#iframeTabla").contents().find('td').click(function () {
        alert($(this).attr());
    });*/
    var htmlOriginal = $.fn.html;

    // redefine the `.html()` function to accept a callback
    $.fn.html = function (html, callback) {
        // run the old `.html()` function with the first parameter
        var ret = htmlOriginal.apply(this, arguments);
        // run the callback (if it is defined)
        if (typeof callback == "function") {
            callback();
        }
        // make sure chaining is not broken
        return ret;
    }
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        xhrFields: {
            withCredentials: false
        },
        beforeSend: function () {
            //alert("Procesando, espere por favor...");
        },
        success: function (response) {
            $("#tabla-content").html(response, function () {
                $.getScript("http://201.116.60.29:8080/approot/primary_proj/js/fexClass.jq.js");
                $.getScript("http://201.116.60.29:8080/approot/primary_proj/js/fexClass.js.js");
            });
            $("#tabla-content").contents().find('td').click(function () {
                //alert($(this).html());
            });
            
        }
    });
}
