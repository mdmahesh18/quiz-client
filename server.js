const express = require ('express')
const compression = require ('compression')
const path = require ('path')
const app = express()
require('dotenv').config();

app.use (compression())
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
res.sendFile(path.join(__dirname, 'build', 'index.html'));

});
process.env.REACT_APP_API
const PORT =process.env.port || 3000;
app.use(express.json());

app.listen (PORT, () => {
    console.log ('App is running on ${PORT}')

});