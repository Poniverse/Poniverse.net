var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var request = require('request');
var crypto = require('crypto');
var cookiee = require('cookie-encryption');
var vault = cookiee(process.env.APP_KEY, {
    cipher: 'aes-256-cbc',
    encoding: 'base64',
    cookie: 'oauth-secrets',
    httpOnly: true,
});

router.post('/auth', postAuth);
router.get('/me', getMe);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function postAuth(req, res, next) {
    var form = {
        grant_type: 'password',
        client_id: process.env.PONIVERSE_CLIENT_ID,
        client_secret: process.env.PONIVERSE_CLIENT_SECRET,
        username: req.body.username,
        password: req.body.password,
        scope: 'basic'
    };

    request.post({
        url: process.env.PONIVERSE_API_URL + '/oauth/access_token',
        form: form
    }, function(error, response, body) {
        if (response.statusCode === 401) {
            return res.status(response.statusCode).send(body);
        }

        // Credit: http://lollyrock.com/articles/nodejs-encryption/
        var cipher = crypto.createCipher('aes-256-cbc', process.env.APP_KEY);
        var crypted = cipher.update(body,'utf8','base64');
        crypted += cipher.final('base64');

        res.cookie('oauth-secrets', crypted, {maxAge: 900000, httpOnly: true});

        var oauth = JSON.parse(body);

        var authResponse = {
            token: oauth.access_token
        };

        res.status(response.statusCode).send(authResponse);
    });
}

function getMe(req, res, next) {
    var body = vault.read(req);

    if (! body) {
        res.status(401).send();
    }

    var oauth = JSON.parse(body);

    var response = {
        token: oauth.access_token
    };

    res.status(200).send(response);
}
