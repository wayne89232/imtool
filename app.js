
/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    expressValidator = require('express-validator'),
    session = require('express-session');
    multer  = require('multer'),
    routes = require('./routes'),
    api = require('./routes/api'),
    user = require('./routes/user'),
    mission = require('./routes/mission'),
    uploadImage = require('./routes/uploadImage'),
    express_validators = require('./config').express_validators,
    ranking = require('./routes/ranking')


    
    // import routers
    // example = require('./routes/example'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();
var upload = multer({ dest: 'public/assets/images' })

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

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'IMTOOL',
  cookie: { maxAge: 60 * 1000 }
}))


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
app.post('/logout', user.logout);
app.get('/getUserInfo/:id', user.user_info);
app.get('/getUserSkill/:id', user.user_skills);
app.get('/getUserMission/:id', user.tooler_mission);
app.get('/getToolMission/:id', user.tool_mission);
app.get('/user_list', user.user_list);

app.post('/upload', upload.single('image') ,uploadImage.upload)

//mission
app.post('/createMission', mission.create_mission);
app.get('/getMissions', mission.list_mission);
app.get('/viewEvent/:id', mission.view_event);
app.get('/find_tools/:id', mission.find_tools);
app.get('/mission_skills/:id', mission.mission_skills);

//functions, ex: 
// app.post('/api/add_league', api.add_league);

//ranking
app.get('/ranking', ranking.tool_ranking);
app.get('/function_ranking', ranking.function_ranking);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
