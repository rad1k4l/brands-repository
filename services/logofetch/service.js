let {Spider} = require('./spider');

async function scan(siteUrl) {
    return await (new Spider().fastScan(siteUrl));
}


module.exports = {
    scan,
}
