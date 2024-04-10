const RouterAPI = require('express').Router();
const { v1: uuidv1 } = require('uuid');
const fs = require('fs');
const path = require('path')
//GET /api/notes should read the db.json file and return all saved notes as JSON

RouterAPI.get('/api/notes',(req,res)=>{
 let jsonFile =  JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf-8')) // converting to JSON format
 res.json(jsonFile);
})
/*POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).*/
RouterAPI.post('/api/notes',(req,res)=>{
    let jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf-8'))
    let note ={
        title: req.body.title,
        text: req.body.text,
        id: uuidv1()
    }
    jsonFile.push(note);
    fs.writeFileSync(path.join(__dirname,'../db/db.json'),JSON.stringify(jsonFile))
    res.json(note)
})

module.exports = RouterAPI;