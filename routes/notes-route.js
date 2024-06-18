//get api/notes should read the db.json
//importing express router
const Router = require('express').Router();
//importing file system, allowing promises to be applied
const fs = require('fs').promises;
//importing path library
const path = require('path');
//Notes
const dbJson = path.join(__dirname,'../db/db.json')
//reading db.json
async function ReadFile(){
    try{
        const Data = await fs.readFile(dbJson,"utf-8");
        return JSON.parse(Data)
       // console.log('dataDB',Data)
    }catch(error){
        console.error("An error has ocurred:",error);
    }
}
//route for reading created note
Router.get('/api/notes',async(req,res)=>{
  let Notes = await ReadFile();
  res.send(Notes);
});

//creating note
async function writeFile(data){
    try{
        await fs.writeFile(dbJson,JSON.stringify(data))
    }catch(error){
        console.error('An error has ocurred:',error);
    }
}
//POST /api/notes
Router.post('/api/notes',async(req,res)=>{
    try{
        let NoteBody = req.body;
        let Notes = await ReadFile();
        Notes.push(NoteBody);
        await writeFile(Notes);
        res.send(NoteBody);
    }catch(error){
        console.error('something unexpectedly happened',error)
    }

})
/*delete note by id */

module.exports = Router;
