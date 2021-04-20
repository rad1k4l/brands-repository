const express = require('express');
const router = express.Router();
const {URL} = require('url');
const {scan} = require('../services/logofetch/service')


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Brand fetch by url'});
});

router.post('/search/domain', async function (req, res, next) {
    if (!req.body.domain) {
        res.status(400).json({msg: 'validation error. please provide domain'}).end()
        return;
    }
    try {
        new URL(req.body.domain)
    } catch (e) {
        res.status(400).json({msg: 'validation error. please provide a valid domain'}).end()
        return;
    }

    try {
        res.status(200).json(await scan(req.body.domain)).end();
    } catch (e) {
        res.status(400).json({msg: 'Error ocurred'}).end();
        throw e;
        return;
    }
});


module.exports = router;
