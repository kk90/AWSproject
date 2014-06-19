
var express = require( 'express' );
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("views/kickstartJS"));
var AWS = require("aws-sdk");
// Configuration 



// Routes 
app.get( '/', function ( req, res ) {
    
    res.render('layout', { list: list,title:"Lista folderów" });
   
});

app.listen( 8080 ); 