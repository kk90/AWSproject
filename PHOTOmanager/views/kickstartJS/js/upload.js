﻿$( document ).ready( function ( e ) {
    $( "#uploadForm" ).on( 'submit', ( function ( e ) {
        e.preventDefault();
        console.log( 'teest' );

        var daata = new FormData( this );
        var uri = "https://kkpbucket.s3.amazonaws.com/test?AWSAccessKeyId=AKIAJRWXVR2NWJKFN4EA&Expires=1403209578&Signature=zJUO3pmF7%2FzG5jyx1qmuPWnvr9Y%3D";
        /* $.ajax( {
             url: "/getPutURL?Key=" + "test",
             context: document.body
         }).done( function ( data ) {
             console.log( 'getURL'+data);
                 $.ajax( {

                     url: data, // the presigned URL
                     type: 'PUT',
                     data: daata,
                     success: function () { console.log( 'Uploaded data successfully.' ); }
                 });



             });*/


        $.ajax( {
            url: uri,
            type: "PUT",
            data: new FormData( this ),
            contentType: false,
            cache: false,
            processData: false,
            success: function ( data ) {
                consile.log("shit");
            },
            error: function () { }
        });



    }) );
});