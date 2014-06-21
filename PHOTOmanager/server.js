var crypto = require( 'crypto' );
var express = require( 'express' );
var app = express();

app.set( 'view engine', 'ejs' );
//additionals stylesheets and JS
app.use( express.static( "views/kickstartJS" ) );

var AWS = require( "aws-sdk" );

AWS.config.loadFromPath( 'config.json' );

var s3 = new AWS.S3();
var config = require( "./config.json" );

var AWS_ACCESS_KEY = config.accessKeyId;
var AWS_SECRET_KEY = config.secretAccessKey;



var BUCKETkk = 'kkpbucket';

// Routes 
app.get( '/', function ( req, res ) {


    res.render( 'galery', { title: "Galeria" });

});

app.get( '/getImages', function ( req, res ) {

    var params = {
        Bucket: BUCKETkk // required
    };

    var presignedURLs = [];

    s3.listObjects( params, function ( err, data ) {
        if ( err ) console.log( err, err.stack ); // an error occurred
        else {
            for ( var i = 0; i < data.Contents.length; i++ ) {
                var params = { Bucket: BUCKETkk, Key: data.Contents[i].Key };
                s3.getSignedUrl( 'getObject', params, function ( err, url ) {
                    presignedURLs.push(
                        {
                            uri: url,
                            key: params.Key
                        });
                });
            }

            res.send( presignedURLs );

        }// successful response
    });
});


app.get( '/deleteImage', function ( req, res ) {
    console.log(req.query.key);
    var params = {
        Bucket: BUCKETkk, // required
        Key: req.query.key, // required
    };
    s3.deleteObject( params, function ( err, data ) {
        if ( err ){ console.log( err, err.stack );
                    res.send("FAIL");
            } // an error occurred
        else res.send("OK");          // successful response
    });

});


app.get( '/upload', function ( req, res ) {

    res.render( 'upload', { title: "Wczytaj" });

});

app.get( '/convert', function ( req, res ) {
       var params = { Bucket: BUCKETkk, Key: req.query.key };
                s3.getSignedUrl( 'getObject', params, function ( err, url ) {
                   res.render( 'convert', { title: "Konwertuj",uri:url });
                });

    

});


app.get( '/sign_s3', function ( req, res ) {
    var object_name = req.query.s3_object_name;
    var mime_type = req.query.s3_object_type;

    var now = new Date();
    var expires = Math.ceil( ( now.getTime() + 10000 ) / 1000 ); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";

    var put_request = "PUT\n\n" + mime_type + "\n" + expires + "\n" + amz_headers + "\n/" + "kkpbucket" + "/" + object_name;

    var signature = crypto.createHmac( 'sha1', AWS_SECRET_KEY ).update( put_request ).digest( 'base64' );
    signature = encodeURIComponent( signature.trim() );
    signature = signature.replace( '%2B', '+' );

    var url = 'https://' + "kkpbucket" + '.s3.amazonaws.com/' + object_name;

    var credentials = {
        signed_request: url + "?AWSAccessKeyId=" + AWS_ACCESS_KEY + "&Expires=" + expires + "&Signature=" + signature,
        url: url
    };
    res.write( JSON.stringify( credentials ) );
    res.end();
});





app.listen( 8081 ); 