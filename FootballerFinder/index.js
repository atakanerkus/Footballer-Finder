const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "123",
    port: 5432,
  });
db.connect();

let footballers = [];
db.query("SELECT * FROM footballers", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    footballers = res.rows;
  }
  db.end();
});
let randomNumber;
let selectedFootballer;
app.get("/", (req,res)=>{
    randomNumber = Math.floor(Math.random() * footballers.length);
    selectedFootballer = footballers[randomNumber];
    res.render("index.ejs", {
        team : selectedFootballer.team,
        nationality : selectedFootballer.nationality,
        age : selectedFootballer.age,
        position : selectedFootballer.position
    })    
})
app.get("/next", (req,res)=>{
    randomNumber = Math.floor(Math.random() * footballers.length);
    selectedFootballer = footballers[randomNumber];
    res.render("index.ejs", {
        team : selectedFootballer.team,
        nationality : selectedFootballer.nationality,
        age : selectedFootballer.age,
        position : selectedFootballer.position
    })    
})
app.get("/answer",(req,res)=>{
    res.render("index.ejs",{
        team : selectedFootballer.team,
        nationality : selectedFootballer.nationality,
        age : selectedFootballer.age,
        position : selectedFootballer.position,
        result : "Correct answer was: "+selectedFootballer.name
    })
})



app.post("/submit", (req,res)=> {
    const inputValue = req.body.userInput;
    console.log(inputValue);
    if (inputValue == footballers[randomNumber].name){
        res.render("index.ejs", {
            result : "Perfect..!",
            team : selectedFootballer.team,
            nationality : selectedFootballer.nationality,
            age : selectedFootballer.age,
            position : selectedFootballer.position
        })
    }
    else{
        res.render("index.ejs", {
            result : "Try Again..!",
            team : selectedFootballer.team,
            nationality : selectedFootballer.nationality,
            age : selectedFootballer.age,
            position : selectedFootballer.position
        })
    }


})
app.post("/next",(req,res)=>{
    console.log("next")
})

app.listen(port,()=> {
    console.log('Server started on port '+port)
})
