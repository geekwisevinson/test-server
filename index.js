const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3000;

const app = express();
const uri = process.env.MONGO_URI;
console.log('env',  uri)
mongoose.connect(uri,  { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connect to db')
});

const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World  Yo!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
