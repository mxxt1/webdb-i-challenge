const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


//get all accounts
server.get('/', (req,res) => {
    db.select('*').from('accounts').then(response => 
        res.status(200).json(response)
    )
    .catch(err => res.status(500).json(err));
})

//get account by id

server.get('/:id', (req,res) => {
    db.select('*')
    .from('accounts')
    .where('id','=', req.params.id)
    .then(response => 
        res.status(200).json(response)
    )
    .catch(err => res.status(500).json(err));
})



//post new account
server.post('/', (req,res) => {
    db.insert(req.body,'id')
    .into('accounts')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res.status(500).json({Error: `We were unable to add this account`})
    })
})


//delete account


server.delete('/:id', (req, res) => {

    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res.status(500).json({Error: `Failed to delete record`})
    })
})


//Update account
server.put('/:id', (req, res) => {

    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res.status(500).json({Error: `There was an error updating this account`})
    });
});





module.exports = server;