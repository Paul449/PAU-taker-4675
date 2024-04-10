//import express library with router
const RouterHTML = require('express').Router();
const fs = require('fs');
const path = require('path'); // locating and adding html files from develop folder
//HTML routes
//GET /notes should return the notes.html file.
RouterHTML.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'../Develop/public/notes.html'));
})

//GET * should return the index.html file.
RouterHTML.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'../Develop/public/index.html'));
})

module.exports = RouterHTML;