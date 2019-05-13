const express = require('express');
const graphqlHTTP = require('express-graphql');

const port = 3000;

const app = express();


const schema = require('./schema/schema');


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World  Yo!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
