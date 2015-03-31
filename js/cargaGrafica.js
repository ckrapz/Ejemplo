function cargaGrafica(url) {
    //$("#graph-content").html('<iframe border="0" style="border:0px;" src="' + url + '" width="100%" scrolling="no" id="iframeGrafica"></iframe>');
    //console.log(url);
    $("#iframeGrafica").attr("src", '');
    $("#iframeGrafica").attr("src", url);
}
