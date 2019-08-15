const Twitter       = require('twitter');
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

const Config  = require('./config') || {
    consumer_key        : process.env.CONSUMER_KEY,
    consumer_secret     : process.env.CONSUMER_SECRET,
    access_token_key    : process.env.ACCESS_TOKEN_KEY,
    access_token_secret : process.env.ACCESS_TOKEN_SECRET
};

const T       = new Twitter(Config);
const Port    = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/alanzoka', require('./routes/webhook'));

app.listen(Port, () => console.log('Olá Amigos!'));