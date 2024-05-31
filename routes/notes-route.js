//get api/notes should read the db.json
//importing express router
const Router = require('express').Router();
//importing file system
const fs = require('fs');
//importing path library
const path = 'db.json';
//reading db.json
Router.get('api/notes',async(req,res)=>{
    try{

    }catch{

    }
});

//POST /api/notes

Router.post('api/notes',async(req,res)=>{

})

module.exports = Router;