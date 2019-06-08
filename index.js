const express = require('express');
const path = require('path');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
const uri = process.env.MONGO_URI;
mongoose.connect(uri,  { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connect to db')
});

const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', (req, res) => res.sendFile(__dirname + '/home.html'));

app.get('/pages/:page', (req, res) => {

    console.log('req.params', req.params);
    if(req.params && req.params.page) {
        res.sendFile(__dirname + '/pages/' + req.params.page)
    }

});

app.get('/json/data/:file', (req, res) => {
    if(req.params && req.params.file) {
        const fullPath = __dirname + '/json-data/' + req.params.file;
        fs.readFile(fullPath, (err, data) => {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            res.json(parsedData)
        });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


function getModels() {
    fs.readdirSync('./models').forEach( dir => {
        const name = dir.substring(0, 1).toUpperCase() +  dir.substring(0, dir.indexOf('.')).substr(1);
        console.log('dir', name);

    })
}

getModels();
