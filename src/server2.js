const { response } = require('express');
const express = require('express');
const app = express();
const PORT=3030

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))


app.get("/form",(req,res)=>{

    res.sendFile("public/formulario.html",{root:__dirname})
})
app.get("/",(req,res)=>{

    res.send("Holas")
})
const server = app.listen(PORT, () => {
console.log(`server is runing at http://localhost:3030`);
});

server.on('error', (err) => {
console.log(err);
});