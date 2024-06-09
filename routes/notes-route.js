//get api/notes should read the db.json
//importing express router
const Router = require('express').Router();
//importing file system
const fs = require('fs');
//importing path library
const path = require('path');
//import db
const db = require('../db/db.json');
//string JSON
//reading db.json
async function ReadFile(){
    try{
        const Data = fs.readFile(path.join(__dirname,db.notes),"utf-8");
        console.log('dataDB',Data)
    }catch(error){
        console.error("An error has ocurred:",error)
    }
}
readFile();
//route for reading created note
Router.get('/notes',async(req,res)=>{
  res.send(ReadFile);
});

//creating note
async function writeFile(){
    try{
        let Note = fs.writeFile(path.join(__dirname,db))
    }catch(error){

    }
}
writeFile();
//POST /api/notes
Router.post('/notes',async(req,res)=>{

})

module.exports = Router;