const { Sequelize } = require("sequelize");
const connection = require("./database");

// criando uma tabela com model sequelize
const pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT, // textos grandes
        allowNull: false
    }
});

pergunta.sync({force: false}).then(() => {});

module.exports = pergunta;