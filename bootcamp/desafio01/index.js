// https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs
const express = require('express');


const server = express();
server.use(express.json());
const projetos = [];

//listar todos os projetos
server.get('/projects',(req,res) => {
    return res.json(projetos);
});

//cadastra um projeto
server.post('/projects',(req, res) => {
    const aux = req.body;
    aux.tasks = [];
    projetos.push(aux);
    return res.send();
});

//altera um projeto com base no id
server.put('/projects/:id',(req, res) =>{
    const id = req.params.id;
    const title = req.body.title;
    const projeto = getByIndex(id);
    projeto.title = title;
    return res.send();
});
//altera um projeto com base no id
server.delete('/projects/:id',(req, res) =>{
    const id = req.params.id;
    const index = getIndex(id);
    projetos.splice(index,1);
    return res.send();
});   
//pega um projeto pelo id
server.post('/projects/:id/tasks',(req,res) => {
    const id = req.params.id;
    const { task } = req.body;
    const projeto = getByIndex(id);
    projeto.task.push(task)
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
