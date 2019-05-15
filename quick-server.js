const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    const template = `
<html>
    <h1>The header</h1>
    <body>
    this is the body
    <ul>
    <li>
    this is cool
</li>
</ul>
</body>
</html>`;
    res.send(template);
});
const users = ['vinson', 'jenina'];
app.get('/home', function (req, res) {
    res.sendFile(__dirname + `/quick-home.html`);
});
app.get('/get-users', function (req, res) {
   res.json(users)
});
app.post('/add-user', function (req, res) {
    console.log('req body', req.body);
    res.json(users);
    const alreadyHasUser = users.includes(req.body.user);
    if (req.body.user && !alreadyHasUser) {
        users.push(req.body.user);
    }
});
app.listen(2000, function (e) {
    console.log('e', e)
});
