const Router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
//GET /api/notes should read the db.json file and return all saved notes as JSON
Router.get('/api/notes',(req,res)=>{
 res.json(
    
 )
})

/*POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).*/
Router.post('/api/notes',(req,res)=>{

})