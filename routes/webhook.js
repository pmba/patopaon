const express   = require('express');
const router    = express.Router();
const Twitter   = require('twitter');
const Request   = require('request');

const greetings = [
    'Olá Pessoas!',
    '🚌 Ônibus! ',
    '👪 👩‍👩‍👧 👨‍👨‍👦 Salve Família!',
    '🧐 Saudações caros apreciadores de uma bela stream diária.',
    '👺 Alan abriu a stream agora, cara tóxico...',
    '🕶 O que é isso que eu estou vendo aqui?',
    '🐩 Woof Woof, começou.',
    '🍓 Ei meu moranguinho, toma ai mais um docinho pra alegrar seu dia.',
    '🎮 IT\'S ALANZOKA.',
    '⌚️ Priiiiiiiiin, Acorda que começou.',
    '❤️ Amorzinhos chat.',
    '🛂 Ei! Parado ai, você foi multado por não estar vendo a stream.',
    '🚸 Atenção! Stream da família brasileira começando.',
    '🔎 Ora ora ora, vejam só o que eu encontrei aqui...'
];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

        if (bodyR.data.length) {
            let streamInfo = bodyR.data[0];
            let greeting = greetings[getRandomArbitrary(0, greetings.length)];

            if (greeting == undefined) greeting = greetings[0];

            T.post('statuses/update', {
                status: `${greeting}
                        \n${streamInfo.title}
                        \nhttps://twitch.tv/alanzoka`
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
        }
    });
});

router.post('/on', validation, (req, res) => {

    console.log(`Tá online: ${req.body.game}, ${Date.now()}`);
    console.log(req.body);
    
    T.post('statuses/update', {
        status: `${greetings[getRandomArbitrary(0, greetings.length+1)]}
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