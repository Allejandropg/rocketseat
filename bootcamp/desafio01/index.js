// https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs
const express = require('express');


const server = express();
server.use(express.json());
const projetos = [];

//listar todos os projetos
server.get('/projects',(req,res) => {
    return res.json(projetos);
});
//Middlewares
function checkProjetoExists(req, res, next){
    let { id, title } = req.body;
    if(!id){
        id = req.params;
    }
    console.log(id, title)
    if(!id || !title){
        return res.status(400).json({erro:'Project not found on request body!'})
    }
    return next();
}

function checkProjetoInArray(req, res, next){
    const projeto = getByIndex(req.params.id);
    if(!projeto){
        return res.status(400).json({erro:'Project does exists!'})
    }
    req.projeto = projeto;
    return next();
}

//cadastra um projeto
server.post('/projects', checkProjetoExists,checkProjetoExists, (req, res) => {
    const { id, title } = req.body;
    const projeto = {
        id, 
        title,
        tasks : []
    };
    projetos.push(projeto);
    return res.send();
});

//altera um projeto com base no id
server.put('/projects/:id', checkProjetoExists, checkProjetoInArray,(req, res) =>{
    const id = req.params.id;
    const title = req.body.title;
    const projeto = getByIndex(id);
    projeto.title = title;
    return res.json(projeto);
});

//deleta um projeto com base no id
server.delete('/projects/:id', checkProjetoInArray,(req, res) =>{
    const id = req.params.id;
    const index = getIndex(id);
    projetos.splice(index,1);
    return res.send();
});   

//cadastra uma task pelo id do projeto
server.post('/projects/:id/tasks', checkProjetoInArray,(req,res) => {
    const id = req.params.id;
    const { task } = req.body;
    const projeto = getByIndex(id);
    projeto.tasks.push(task)
    return res.send();
});

           
//pega um projeto pelo id
server.get('/projects/:id',(req,res) => {
    const { id } = req.params;
    return res.json(getByIndex(id));
});

const getByIndex = (id) => {
    return projetos[getIndex(id)];
}
const getIndex = (id) => {
    return projetos.findIndex(projeto => projeto.id==id)
}
server.listen(3001);//localhost:3001
