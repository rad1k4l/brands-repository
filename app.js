const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRouter = require('./routes/index');
const {conf : config} = require('./conf')

const app = express()
const port = 3000



app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use('/', indexRouter);


app.listen(config.listen.port, config.listen.ip, () => {
    console.log(`App listening at ${config.listen.ip}:${config.listen.port}`)
})
