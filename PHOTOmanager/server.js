
var express = require( 'express' );
var app = express();

app.set('view engine', 'ejs');
//additionals stylesheets and JS
app.use(express.static("views/kickstartJS"));

var AWS = require("aws-sdk");




// Routes 
app.get( '/', function ( req, res ) {
    
    res.render('galery', { title:"Galeria" });
   
});

app.get( '/upload', function ( req, res ) {
    
    res.render('upload', { title:"Wczytaj" });
   
});

app.get( '/convert', function ( req, res ) {
    
    res.render('convert', { title:"Konwertuj" });
   
});


app.listen( 8080 ); 