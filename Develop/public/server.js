//Import express library
const express = require('express');
//import router files
const APIRoutes = require('../public/routes/API-routes');
const HTMLRoutes = require('../public/routes/HTML-routes');
//calling express function to use it in our app
const app = express();
//Assigning port number
const PORT = 3005;
//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.use(APIRoutes);
app.use(HTMLRoutes);
//execute note taker app (final output)
app.listen(PORT,`Note taker app listening on port:${PORT}`);