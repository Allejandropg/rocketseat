// https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs
const express = require('express');


const server = express();
server.use(express.json());
const projetos = [];

//listar todos os projetos
server.get('/projects',(req,res) => {
    return res.json(projetos);
});

//pega um projeto pelo id
server.get('/projects/:id',(req,res) => {
    const { id } = req.params;
    return res.json(projetos[id]);
});

//cadastra um projeto
server.post('/projects',(req, res) => {
    const { id, projeto } = req.body;

    projetos.push(req.body);
    console.log(projetos)
});

server.listen(3001);//localhost:3001