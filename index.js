const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "Banjo"
});

app.set("view engine", "ejs");
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get("/", function(req, res){
    
    res.render("landing");
    
});

var table = [];

     con.query("SELECT * from Worlds", function(err, rows){
      if(err) {
        throw err;
      } else {
        setValue(rows);
      }
});
    
  function setValue(value) {
  table = value;
  console.log(table);
}

app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));

app.get("/worlds", function(req,res){

    //Starter data, final data will be stored in a db
    var worlds = [
        {game: "Banjo Tooie", name: "Witchyworld", image: "https://vignette.wikia.nocookie.net/banjokazooie/images/c/c6/Witchyworld_entry.png/revision/latest?cb=20080516121345"},
        {game: "Banjo Tooie", name: "Jolly Roger Lagoon", image: "https://vignette.wikia.nocookie.net/banjokazooie/images/f/f9/Jolly_Rogers_Lagoon_entry.png/revision/latest/scale-to-width-down/270?cb=20080516121748"},
        {game: "Banjo Tooie", name: "Hailfire Peak", image: "https://vignette.wikia.nocookie.net/banjokazooie/images/1/1b/Hailfire_Peaks_entry.png/revision/latest?cb=20150516031920"},
        {game: "Banjo Tooie", name: "Grunty Industries", image: "https://vignette.wikia.nocookie.net/banjokazooie/images/8/8d/Grunty_Industries_entry.png/revision/latest/scale-to-width-down/270?cb=20150515013926"}
        ];
    
    res.render("worlds", {worlds:worlds});
    
});

app.get("/games", function(req, res){
    
    res.render("games");
    
});


app.listen(3000, function(){
    
    console.log("Server running!");
});


