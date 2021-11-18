const express = require("express");
const path = require("path");
const app= express();
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static("public"))
app.use("/", htmlRoutes)
app.use("/api", apiRoutes)

app.listen(PORT , function(){

    if(PORT){
        console.log(`Server listening on : http://localhost:${PORT}`)
    } else {
        console.log(err)
    }
})


