
var express = require( 'express' );
var app = express();

app.set( 'view engine', 'ejs' );
//additionals stylesheets and JS
app.use( express.static( "views/kickstartJS" ) );

var AWS = require( "aws-sdk" );

AWS.config.loadFromPath( 'config.json' );

var s3 = new AWS.S3();



// Routes 
app.get( '/', function ( req, res ) {


    res.render( 'galery', { title: "Galeria" });

});

app.get( '/getImages', function ( req, res ) {

    var params = {
        Bucket: 'kkpbucket' // required
    };

    var presignedURLs = [];

    s3.listObjects( params, function ( err, data ) {
        if ( err ) console.log( err, err.stack ); // an error occurred
        else {
            for ( var i = 0; i < data.Contents.length; i++ ) {
                var params = { Bucket: 'kkpbucket', Key: data.Contents[i].Key };
                s3.getSignedUrl( 'getObject', params, function ( err, url ) {
                    presignedURLs.push( url );
                });
            }

            res.send( presignedURLs );

        }// successful response
    });
});

app.get( '/getPutURL', function ( req, res ) {

    var params = {
        Bucket: 'kkpbucket', // required,
        Key: req.query.Key
    };

    s3.getSignedUrl( 'putObject', params, function ( err, url ) {
        res.send( url );
    });

});

app.get( '/upload', function ( req, res ) {

    res.render( 'upload', { title: "Wczytaj" });

});

app.get( '/convert', function ( req, res ) {

    res.render( 'convert', { title: "Konwertuj" });

});


app.listen( 8081 ); 