function exportarPDF() {
    $.ajax({
        url: 'http://172.29.167.140/topdf/',
        data: {
            // format: 'json'
        },
        error: function () {

        },
        //dataType: 'jsonp',
        success: function (data) {
            alert();
        },
        type: 'POST'
    });
}