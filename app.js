const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

var Config = {};

const Port    = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/patopaon', require('./routes/webhook'));

app.listen(Port, () => console.log('Salve galerinha!'));
