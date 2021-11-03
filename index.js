const express = require("express");
const app = express();

// Modo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

app.get("/:name/:lang", (req, res) => {
    let name = req.params.name;
    let lang = req.params.lang;
    let showMessage = true;

    let products = [
        {name: "Doritos", price: 3.14},
        {name: "Coca-cola", price: 5},
        {name: "Leite", price: 1.45},
        {name: "Carne", price: 15},
        {name: "Café", price: 6},
        {name: "Nescau", price: 3}
    ]
    res.render("index", {
        name: name,
        lang: lang,
        company: "Guia do programador",
        subscribes: 8000,
        message: showMessage,
        products: products
    });
});

app.listen(3333, () => {
    console.log("App rodando!");
});