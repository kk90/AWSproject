﻿

function pushItem( pictureObject ) {

    var mainIMG = $( '<img>' ).attr( {
        src: pictureObject.uri,
        class: "imageItem",
        width: 100,
        height: 100,
        imageKey: pictureObject.key
    });

    var mainA = $( '<a>', {
        href: pictureObject.uri
    })

               mainA.append( mainIMG );

    var menu1 = [
        { '<i class="icon-remove"></i> Usuń': function ( menuItem, menu ) { if ( confirm( 'Usunąć plik?' ) ) {
      //$("#gallery").empty();
      //$("#waitScreen").show();
      $( this ).parent().hide();
      $.ajax( {
          url: "deleteImage?key=" + $( this ).attr( "imagekey" ),
          context: document.body
      }).done( function ( data ) {

          });

  } } },
        $.contextMenu.separator,
        { '<i class="icon-edit"></i> Edytuj': function ( menuItem, menu ) { 
            window.open ('/convert?key='+ $( this ).attr( "imagekey" ),'_self',false) } }
    ];
    
         mainIMG.contextMenu(menu1);
    



    /* mainIMG.mousedown( function ( e ) {
if ( e.button == 2 ) {

  if ( confirm( 'Usunąć plik?' ) ) {
      //$("#gallery").empty();
      //$("#waitScreen").show();
      $( this ).parent().hide();
      $.ajax( {
          url: "deleteImage?key=" + $( this ).attr( "imagekey" ),
          context: document.body
      }).done( function ( data ) {

          });

  } else {

  }

  return false;
}
return true;
});*/

    $( "#gallery" ).append( mainA );




}


function loadImages() {

    $.ajax( {
        url: "getImages",
        context: document.body
    }).done( function ( data ) {
            imageObjects = data;
            $( "#waitScreen" ).hide();
            for ( var i = 0; i < data.length; i++ ) {
                pushItem( data[i] );
            }
        });


};


$( document ).ready( function () {
    loadImages();


});



function refresh() {
    $( "#waitScreen" ).show();
    $( "#gallery" ).empty();
    loadImages();
}

/*    <% for(var i=0; i<10; i++){ %>
 <a href="http://placehold.it/1x450/4D99E0/ffffff.png&text=600x450"><img src="http://placehold.it/100x100/4D99E0/ffffff.png&text=100x100" width="100" height="100" /></a>
    <%} %>*/