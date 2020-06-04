// https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs
const express = require('express');


const server = express();
server.use(express.json());
const projects = [];
let count = 0;

//list all projects
server.get('/projects', countRequests, (req,res) => {
    return res.json(projects);
});

//Middlewares
function countRequests(req, res, next){
    console.log(`Total of requests: `+(++count));
    return next();
}

function checkProjectInArray(req, res, next){
    const project = getByIndex(req.params.id);
    if(!project){
        return res.status(400).json({erro:'Project does exists!'})
    }
    req.project = project;
    return next();
}

//Add a project
server.post('/projects', countRequests, (req, res) => {
    const { id, title } = req.body;
    const project = {
        id, 
        title,
        tasks : []
    };
    projects.push(project);
    return res.send();
});

//Change a project based on id
server.put('/projects/:id', countRequests,checkProjectInArray,(req, res) =>{
    const id = req.params.id;
    const title = req.body.title;
    const project = getByIndex(id);
    project.title = title;
    return res.json(project);
});

//Delete a project based on id
server.delete('/projects/:id', countRequests, checkProjectInArray,(req, res) =>{
    const id = req.params.id;
    const index = getIndex(id);
    projects.splice(index,1);
    return res.send();
});   

//Add a task by project id
server.post('/projects/:id/tasks', countRequests, checkProjectInArray,(req,res) => {
    const id = req.params.id;
    const { title } = req.body;
    const project = getByIndex(id);
    project.tasks.push(title)
    return res.send();
});

           
//Select a project by id
server.get('/projects/:id', countRequests, (req,res) => {
    const { id } = req.params;
    return res.json(getByIndex(id));
});

const getByIndex = (id) => projects[getIndex(id)];
const getIndex = (id) => projects.findIndex(project => project.id==id);

server.listen(3001);//localhost:3001
