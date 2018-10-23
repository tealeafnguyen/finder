var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser')

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:8080'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'app')))


require("./app/routing/htmlRoutes")(app);
require('./app/routing/apiRoutes')(app);