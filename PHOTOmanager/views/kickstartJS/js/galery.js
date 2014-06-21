function loadImages() {
    $.ajax( {
        url: "getImages",
        context: document.body
    }).done( function (data) {
        console.log(data);
           $("#waitScreen").hide();
           for(var i=0;i<data.length ;i++){
               
               var mainIMG = $('<img>').attr({
			    src : data[i],
                width:100,
                height:100
		        });

               var mainA = $('<a>', {
			        href:data[i]
		        });

               mainA.append(mainIMG);
              

               $("#gallery").append(mainA);
               }
        });


};


$( document ).ready(function() {
  loadImages();
});

/*    <% for(var i=0; i<10; i++){ %>
 <a href="http://placehold.it/1x450/4D99E0/ffffff.png&text=600x450"><img src="http://placehold.it/100x100/4D99E0/ffffff.png&text=100x100" width="100" height="100" /></a>
    <%} %>*/