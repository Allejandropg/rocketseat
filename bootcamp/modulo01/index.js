const express = require('express');

const server = express();
server.use(express.json())

// localhost:3000/teste

// Query params = ?teste=1
//  Route params = /users/1
//  request body = { 'nome': 'Allejandro', email : "alle401@gmail.com"}

//CRUD: CREATE READ UPDATE DELETE

const users = ['Diego', 'Allejandro', 'Thamires'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();

    console.timeEnd('Request');
});

function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({erro:'User not found on request body!'})
    }
    return next();
}

function checkUserInArray(req, res, next){
    const user = users[req.params.index];
    if(!user){
        return res.status(400).json({erro:'User does exists!'})
    }
    req.user = user;
    return next();
}

server.get('/users/',(req, res) => {
    return res.json(req.user)
});


server.get('/users/:index', checkUserInArray, (req, res) => {
    // const nome = req.query.nome;//buscando query
    // return res.json({ message : `Hello ${nome}!`})
    const index = req.params.index;//buscando param separado por barra(lembrar de adicionar na url com :[nomeparam])
    // return res.json({ message : `Buscando o usuário ${index}!`})
    return res.json(users[index]);
});

server.post('/users',(req, res) =>{
    const { name } = req.body;
    users.push(name);
    
    return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req,res) =>{
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', checkUserInArray,(req, res) => {
    const index = req.params.index;
    users.splice(index, 1);
    return res.send();
});

server.listen(3000);

//FIXME nodemon sere para auto-reload