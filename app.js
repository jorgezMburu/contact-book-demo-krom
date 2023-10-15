const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./src/routes/index'))

app.listen(process.env.PORT || 2000);
console.log("server run on 2000");

module.exports = app