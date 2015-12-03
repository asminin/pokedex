var express = require('express');
var app = express();
//app.use(express.static('app/dist'));
app.use(express.static('app/src'));
app.listen(5000);
