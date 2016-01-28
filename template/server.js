var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
// webpack
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var port = process.env.PORT || 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
});

// Parse application/json
app.use(bodyParser.json());

/*===========================================
=            Baic Authentication            =
===========================================*/

// app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Baic Authentication  ======*/

/*====================================
=            Basic Logger            =
====================================*/

// app.use(morgan('tiny'));

/*=====  End of Basic Logger  ======*/

/*===========================
=            COR            =
===========================*/

app.use(require('cors')());

/*=====  End of COR  ======*/


app.use(router);

// app.use(express.static('dist'));

var server = app.listen(port, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);

});


router.get('/', function (req, res) {
  res.sendFile('__dirname + '/index.html);
});

