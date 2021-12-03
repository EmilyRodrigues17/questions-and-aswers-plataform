const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
        const perguntas = await Pergunta.findAll({raw: true, order: [['id', 'DESC']]});
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
        await Pergunta.create({
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

    const idPergunta = await Pergunta.findOne({
        where: {id: id}
    });
    if (idPergunta != undefined){
        const respostas = await Resposta.findAll({
            where: {perguntaId: idPergunta.id},
            order: [['id', 'DESC']]
        });
        res.render("pergunta", {idPergunta: idPergunta, respostas: respostas});
    }else{
        res.redirect("/");
    }    
})

app.post("/responder", async (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;

    try{
        await Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId
        });
        res.redirect(`/pergunta/${perguntaId}`);
    }
    catch(msgError){
        console.log(msgError);
    }
});

app.listen(3333, () => {
    console.log("App rodando!");
});