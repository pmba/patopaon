const express   = require('express');
const router    = express.Router();
const Twitter   = require('twitter');

const greetings = [
    'Olá Pessoas!',
    '🚌 Ônibus! ',
    '👪 👩‍👩‍👧 👨‍👨‍👦 Salve Família!',
    '🧐 Saudações caros apreciadores de uma bela stream diária.',
    '👺 Alan abriu a stream agora, cara tóxico...',
    '🕶 O que é isso que eu estou vendo aqui?',
    '🐩 Woof Woof, começou.',
    '🍓 Ei meu moranguinho, toma ai um mais docinho pra alegrar seu dia.',
    '🎮 IT\'S ALANZOKA.',
    '⌚️ Priiiiiiiiin, Acorda que começou.',
    '❤️ Amorzinhos chat.',
    '🛂 Ei! Parado ai, você foi multado por não estar vendo a stream.',
    '🚸 Atenção! Stream da família brasileira começando.',
    '🔎 Ora ora ora, vejam só o que eu encontrei aqui...'

];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
        "token": process.env.AUTH_TOKEN
    }
}

const validation = (req, res, next) => {
    let { auth } = req.body;

    if (auth === Auth.token) next();
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

// router.post('/data', (req, res) => {
//     console.log(req.body);
//     return res.status(200).send('Ok');
// });

router.post('/on', validation, (req, res) => {

    console.log(`Alan tá online: ${req.body.game}, ${Date.now()}`);
    
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