const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/pergunta")
// Database
async function connectDatabase (){
    await connection.authenticate()
    try{
        await connection.authenticate()
        console.log("Conexão feita com o banco de dados") 
    }catch(msgError){
        console.log(msgError)
    }
}
connectDatabase();

// Modo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", async (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    try{
        await pergunta.create({
            titulo: titulo,
            descricao: descricao
        });
        res.redirect("/");
    }
    catch(error){
        console.log(error);
    }    
});

app.listen(3333, () => {
    console.log("App rodando!");
});