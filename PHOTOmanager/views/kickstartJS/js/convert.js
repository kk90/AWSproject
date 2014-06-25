
function parseParameters() {

    var conversionquery = "";
    if ($('#check1')[0].checked) {
        conversionquery+="negatyw|"
    }

    if ($('#check2')[0].checked) {
        conversionquery += "sepia|"
    }
    if ($('#check3')[0].checked) {
        conversionquery += "fantazja|"
    }
    return conversionquery;
}


function convertFile(id){
    $.ajax( {
        url: "pushConvert?key=" + id + "&conversion=" + parseParameters(),
          context: document.body
      }).done( function ( data ) {
          $('#mainImage').attr("src","/img/processing.gif")
          });
}