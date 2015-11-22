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
router.post('/clearauth', postClearAuth);
router.get('/me', getMe);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

// TODO: Add a CSRF Token to this endpoint to discourage direct API consumption here
function postAuth(req, res, next) {
    var form = {
        grant_type: 'password',
        client_id: process.env.PONIVERSE_CLIENT_ID,
        client_secret: process.env.PONIVERSE_CLIENT_SECRET,
        username: req.body.username,
        password: req.body.password,
        scope: 'basic'
    };

    /**
     * If you are looking at this for an authorisation implementation eample,
     * then do not use this endpoint. This is only intended for the SPA on
     * Poniverse.net and not a generic endpoint for anypony to use.
     */
    request.post({
        url: process.env.PONIVERSE_API_URL + '/oauth/access_token',
        form: form
    }, function(error, response, body) {
        if (response.statusCode === 401) {
            return res.status(response.statusCode).send(body);
        }

        vault.write(req, body);

        var oauth = JSON.parse(body);

        request.get({
            url: process.env.PONIVERSE_API_URL + '/user',
            headers: {
                'Accept': 'application/vnd.api+json,application/vnd.poniverse.api.v2+json',
                'Authorization': 'Bearer ' + oauth.access_token
            }
        }, function(err, resp, reqBody) {
            var authResponse = {
                access_token: oauth.access_token,
                user: JSON.parse(reqBody)
            };

            res.status(resp.statusCode).send(authResponse);
        });
    });
}

function postClearAuth(req, res, next) {
    res.cookie('oauth-secrets', '', {maxAge: -1, httpOnly: true});

    res.status(204).send();
}

function getMe(req, res, next) {
    var body = vault.read(req);

    if (!body) {
        res.status(401).send();
    }

    var oauth = JSON.parse(body);

    var response = {
        access_token: oauth.access_token
    };

    res.status(200).send(response);
}
