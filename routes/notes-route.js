//get api/notes should read the db.json
//importing express router
const Router = require('express').Router();
//importing file system, allowing promises to be applied
const fs = require('fs').promises;
//importing path library
const path = require('path');
//string JSON
//reading db.json
async function ReadFile(){
    try{
        const Data = fs.readFile(path.join(__dirname,'../db/db.json'),"utf-8");
        console.log('dataDB',Data)
        return JSON.parse(Data); 
    }catch(error){
        console.error("An error has ocurred:",error);
    }
}
//route for reading created note
Router.get('/notes',async(req,res)=>{
  let Notes = await ReadFile();
  res.send(Notes);
});

//creating note
async function writeFile(data){
    try{
        await fs.writeFile(path.join(__dirname,'../db/db.json'),JSON.stringify(data))
    }catch(error){
        console.error('An error has ocurred:',error);
    }
}
//POST /api/notes
Router.post('/notes',async(req,res)=>{
let NoteBody = req.body;
let Notes = await writeFile();
Notes.push(NoteBody);
await writeFile(Notes);
res.json(NoteBody);
})

module.exports = Router;