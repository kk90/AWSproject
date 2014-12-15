
function parseParameters() {

    var conversionquery = "";
    if ($('#check1')[0].checked) {
        conversionquery+="sepia_"+$('#range').val()+"|"
    }

    if ($('#check2')[0].checked) {
        conversionquery += "negatyw|"
    }
    if ($('#check3')[0].checked) {
        conversionquery += "jasnosc_"+$('#range').val()+"|"
    }
    if ($('#check4')[0].checked) {
        conversionquery += "kontrast_"+$('#range').val()+"|"
    }
    console.log(conversionquery);
    return conversionquery;
}


function convertFile(id){

    var keyUnique=(new Date()).getTime();
    var murl="pushConvert?key=" + id +"&convertedKey=" + keyUnique + "&conversion=" + parseParameters();
    console.log(murl);
    $.ajax( {
        url: murl,
          context: document.body
      }).done( function ( data ) {
          $('#mainImage').attr("src","/img/processing.gif");
          
           $.ajax( {
            url: "getURI?key=" + keyUnique,
             context: document.body
            }).done( function ( data ) {
            setInterval(function(){
                
                $('#mainImage').attr("src",data);
                
                }, 7*1000);
             });
          
          
          
          
          });

    
       
   

       
}