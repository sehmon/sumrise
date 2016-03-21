var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var app = express();

var config = require('./config'); // get our config file

//Request Controllers
var userController = require('./app/controllers/user');
var articleController = require('./app/controllers/article');
var authController = require('./app/controllers/auth');

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

//Secret Variables
app.set('superSecret', config.secret);
app.set('apiKey', config.apiKey);
app.set('appId', config.appId);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
app.post('/login', authController.login);
app.post('/signup', authController.signup);

//Api Header Routes
var apiRoutes = express.Router();
apiRoutes.use(authController.verifyToken);

//localhost:8080/api/user
apiRoutes.route('/user')
    .get(userController.getUser);

//localhost:8080/api/users
apiRoutes.route('/users')
    .get(userController.getUsers);

//localhost:8080/api/article
apiRoutes.route('/article')
    .post(articleController.postArticle);

//localhost:8080/api/article/483p021u80yrhfjdkh01
apiRoutes.route('/article/:article_id')
    .get(articleController.getArticle)
    .delete(articleController.deleteArticle);

//localhost:8080/api/articles
apiRoutes.route('/articles')
    .get(articleController.getArticles);

//localhost:8080/api/user
app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
