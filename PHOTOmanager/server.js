
var express = require( 'express' );
var app = express();

app.set('view engine', 'ejs');
//additionals stylesheets and JS
app.use(express.static("views/kickstartJS"));

var AWS = require("aws-sdk");
// Configuration 



// Routes 
app.get( '/', function ( req, res ) {
    
    res.render('index', { title:"Lista folderów" });
   
});

app.listen( 8080 ); 