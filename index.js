const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/pergunta");

// Database
async function connectDatabase (){
    try{
        await connection.authenticate();
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
app.get("/", async (req, res) => {
    try{
        const perguntas = await pergunta.findAll({raw: true, order: [['id', 'DESC']]});
        res.render("index", {perguntas : perguntas});
    }catch(msgError){
        console.log(msgError);
    }
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", async (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    try{
        await pergunta.create({
            titulo: titulo,
            descricao: descricao
        });
        res.redirect("/");
    }
    catch(msgError){
        console.log(msgError);
    }    
});

app.get("/pergunta/:id", async (req, res) => {
    const id = req.params.id;

    const idPergunta = await pergunta.findOne({
        where: {id: id}
    });
    if (idPergunta != undefined){
        res.render("pergunta", {idPergunta: idPergunta});
    }else{
        res.redirect("/");
    }    
})

app.listen(3333, () => {
    console.log("App rodando!");
});