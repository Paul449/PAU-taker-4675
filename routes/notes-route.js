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
        const Data = fs.readFileSync(db,"utf-8");
        console.log('dataDB',Data)
    }catch(error){
        console.error("An error has ocurred:",error)
    }
}
ReadFile()
Router.get('api/notes',async(req,res)=>{
   
});

//creating note
function writeFile(){

}

//POST /api/notes

Router.post('api/notes',async(req,res)=>{

})

module.exports = Router;