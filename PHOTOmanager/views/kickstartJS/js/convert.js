
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

    var keyUnique=(new Date()).getTime();

    $.ajax( {
        url: "pushConvert?key=" + id +"&convertedKey=" + keyUnique + "&conversion=" + parseParameters(),
          context: document.body
      }).done( function ( data ) {
          $('#mainImage').attr("src","/img/processing.gif");
          
           $.ajax( {
            url: "getURI?key=" + keyUnique,
             context: document.body
            }).done( function ( data ) {
            setInterval(function(){
            $('#mainImage').attr("src",data);
                }, 1*1000);
             });
          
          
          
          
          });

    
       
   

       
}