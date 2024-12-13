const express = require("express");
const mongoose = require("mongoose");;
const cors = require("cors");

const app = express();
const port = 5000;

const router = require('./router');

app.use( cors() );
app.use( express.json() );

mongoose.connect("mongodb://127.0.0.1:27017/Staff-Management")
.then( () =>
{
    console.log("Database connected");
})
.catch( () =>
{
    console.log("Database Failed to connected");
})

app.use('/admin', router);

app.listen(port, () => {
    console.log("Server running on port :" , port)
});


