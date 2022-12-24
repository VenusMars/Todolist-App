const express = require("express");
const bodyParser = require("body-parser");
const date = require( __dirname + "/date.js");

const app = express();
const items = ["Buy Food","Eat food","Cook Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");   //set a view engine and make sure you have folder "views" and create "filename.ejs" file

app.get("/",function(req,res){

    const day = date.getDate();
    res.render("list",{
        listTitle : day,
        newListItems : items,
    });

});

app.get("/work",function(req,res){
    res.render("list",{
        listTitle : "Work List",
        newListItems : workItems,
    });
});


app.get("/about",function(req,res){
    res.render("about");
});


app.post("/",function(req,res){
    const item = req.body.item;
    if (item != ""){
        if (req.body.list === "Work"){
            workItems.push(item);
            res.redirect("/work");
        }else{
            items.push(item);
            res.redirect("/");
        }
    }
});

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
});