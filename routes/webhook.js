const express   = require('express');
const router    = express.Router();
const Twitter   = require('twitter');
const Request   = require('request');
const moment    = require('moment-timezone');

function toBrasilHourDateFormat(date) {
    let format = "DD/MM/YYYY HH:mm";
    
    return moment(date, format).tz("America/Fortaleza").format(format);
}

const greetings = [
    '🦆 Boa noite pato',
    'Boa noite chat',
    '🐂 Alô Boizão',
    'Sim pirilim',
    'Toin, Fuom, Ploinnn',
    'IAE BLZ?',
    'b0a n0it3 ch4t 🤖',
    'EXTRA, EXTRA, NOTÍCIA URGENTE @PatoPanews',
    '🤖 Be3p B0op'
];

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * (max + 1));
}

try {
    Config = require('../config');
} catch (error) {
    Config = {
        consumer_key        : process.env.CONSUMER_KEY,
        consumer_secret     : process.env.CONSUMER_SECRET,
        access_token_key    : process.env.ACCESS_TOKEN_KEY,
        access_token_secret : process.env.ACCESS_TOKEN_SECRET
    };
}

const T = new Twitter(Config);

var Auth = {};

try {
    Auth = require('../config.auth');
} catch (error) {
    Auth = {
        "auth": true,
        "token": process.env.AUTH_TOKEN
    }
}

const validation = (req, res, next) => {
    let { auth } = req.body;

    if (!Auth.auth || auth === Auth.token) next();
    else return res.json({
        statusCode: 401,
        statusMsg: "Invalid Token"
    });
};

router.get('/status', (req, res) => {
    res.json({
        statusCode: 200,
        statusMsg: "To Online"
    });
});

router.post('/check', validation, (req, res) => {
    let options = {
        method: 'GET',
        url: 'https://api.twitch.tv/helix/streams',
        qs: { user_login: 'patopapao' },
        headers: {   
            'Cache-Control': 'no-cache',
            'Client-ID': process.env.TWITCH_ID 
        }
    };

    Request(options, async (err, resR, bodyR) => {
        if (err) console.error(err);

        bodyR = JSON.parse(bodyR);

        console.log(bodyR);

        var currentDate = new Date();
        var dateToString = toBrasilHourDateFormat(currentDate);

        if (bodyR.data.length) {

            T.post('statuses/update', {
                status: `${dateToString} e o pato ta on! \n https://www.twitch.tv/patopapao`
            }, (error, tweet, response) => {
                if (error) throw error;
                else {

                    res.json({
                        statusCode: 200,
                        statusMsg: `${dateToString} - Pato Online`,
                        time: tweet.created_at
                    });
                }
            });

        } else {

            T.post('statuses/update', {
                status: `${dateToString} e o pato não ta on.`
            }, (error, tweet, response) => {
                if (error) throw error;
                else {

                    res.json({
                        statusCode: 200,
                        statusMsg: `${dateToString} - Pato Offline`,
                        time: tweet.created_at
                    });
                }
            });

        }
    });
});

router.post('/on', validation, (req, res) => {

    console.log(`Tá online: ${req.body.game}, ${Date.now()}`);
    console.log(req.body);
    
    T.post('statuses/update', {
        status: `@PatoPapao \n${greetings[getRandomArbitrary(greetings.length)]}
                \n${req.body.game}
                \n${req.body.channelUrl}`
    }, (error, tweet, response) => {
        if (error) throw error;
        else {
            
            res.json({
                statusCode: 200,
                statusMsg: "Postado no Twitter",
                time: tweet.created_at
            });
        }
    });
});

module.exports = router;