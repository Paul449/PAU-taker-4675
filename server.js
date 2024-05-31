//importing express to create api routes
const express = require('express');
//initialize express in note taker app
const app = express();
//importing path
const path = require('path');
//importing file system
const fs = require('fs');
//assigning port number
const PORT = process.env.PORT || 3003;
//

//setting middleware to parse request
app.use(express.static(path.join(__dirname,"public")));
//test middleware
app.get('/',(req,res)=>{
    res.sendFile('index.html')
});
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})
//running application through port 3001
app.listen(PORT,()=>{
console.log(`listening on port:${PORT}`)
})