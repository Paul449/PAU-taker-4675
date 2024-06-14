const PATH = require('path');
//Router
const Router = require('express').Router();
//get main root
Router.get('/',(req,res)=>{
    res.sendFile(PATH.join(__dirname,'../../public/index.html'))
})
//get notes
Router.get('/notes',(req,res)=>{
    res.sendFile(PATH.join(__dirname,'../../public/notes.html'))
})
//export router
module.exports = Router;