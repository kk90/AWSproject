function loadImages() {
    $.ajax( {
        url: "getImages",
        context: document.body
    }).done( function (data) {
        console.log(data);
           $("#waitScreen").hide();
           for(var i=0;i<data.length ;i++){
               
               var mainIMG = $('<img>').attr({
			    src : data[i].uri,
                class:"imageItem",
                width:100,
                height:100,
                imageKey:data[i].key
		        });

               var mainA = $('<a>', {
			        href:data[i].uri
		        })

               mainA.append(mainIMG);
              

               $("#gallery").append(mainA);
               }

               $(".imageItem").mousedown(function(e){ 
    if( e.button == 2 ) { 
        
        if (confirm('Usunąć plik?')) {
            $("#gallery").empty();
            $("#waitScreen").show();
            $.ajax( {
            url: "deleteImage?key="+$(this).attr("imagekey"),
            context: document.body
            }).done( function (data) {
                loadImages();
        });

        } else {
    
        }

      return false; 
    } 
    return true; 
  }); 

        });


};


$( document ).ready(function() {
  loadImages();
});

/*    <% for(var i=0; i<10; i++){ %>
 <a href="http://placehold.it/1x450/4D99E0/ffffff.png&text=600x450"><img src="http://placehold.it/100x100/4D99E0/ffffff.png&text=100x100" width="100" height="100" /></a>
    <%} %>*/