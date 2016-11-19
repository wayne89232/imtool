
/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    expressValidator = require('express-validator'),
    routes = require('./routes'),
    api = require('./routes/api'),
    user = require('./routes/user'),
    mission = require('./routes/mission'),
    express_validators = require('./config').express_validators,
    
    // import routers
    // example = require('./routes/example'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
    customValidators: express_validators
}));
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//user
app.post('/register', user.register);
app.post('/login', user.login);
app.get('/getUserInfo/:id', user.user_info);
app.get('/getUserMission/:id', user.tooler_mission);

//mission
app.post('/createMission', mission.create_mission);
app.get('/getMissions', mission.list_mission);
app.get('/getMissions/:state', mission.list_mission);


//functions, ex: 
// app.post('/api/add_league', api.add_league);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
