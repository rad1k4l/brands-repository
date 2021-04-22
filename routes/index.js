const express = require('express');
const router = express.Router();
const {URL} = require('url');
const {scan} = require('../services/logofetch/service')

const messages = require('../generated/protos/google_pb');
const services = require('../generated/protos/google_grpc_pb');

const grpc = require('@grpc/grpc-js');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Brand fetch by url'});
});

router.post('/search/domain', async function (req, res, next) {

    if (!req.body.domain) {
        res.status(400).json({msg: 'validation error. please provide domain'}).end()
        return;
    }
    const searchQuery = req.body.domain;

    let client = new services.GoogleSearcherClient("localhost:42420", grpc.credentials.createInsecure());
    let request = new messages.GoogleSearchRequest();
    request.setQuery(searchQuery);
    const results = await new Promise(resolve => {
        client.search(request, function (err, response) {
            resolve(response.getResultsList());
        });
    });

    let domain = results[0];
    if (!domain) {
        res.status(400).json({msg: 'validation error. please provide domain'}).end()
        return;
    }
    try {
        new URL(domain)
    } catch (e) {
        res.status(400).json({msg: 'validation error. please provide a valid domain'}).end()
        return;
    }

    try {
        res.status(200).json(await scan(domain)).end();
    } catch (e) {
        res.status(400).json({msg: 'Error ocurred'}).end();
        throw e;
        return;
    }
});


module.exports = router;
