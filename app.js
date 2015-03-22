
/**
 * Module dependencies.
 */


/* app globals */
dbConn_str = 'mongodb://mongodb:woot@dharma.mongohq.com:10050/users';
mongoose = require('mongoose');
Schema = mongoose.Schema;
user_details = '';/* mongo.users doc, created in /routes/login.login */
auth = require('./routes/authenticate/authenticate');
bcrypt = require('bcrypt');



var express = require('express')
    , app = express()
    , routes = require('./routes/routes')
    , http = require('http').createServer(app)
    , io = require('socket.io').listen(http)
    , chat = require('./chat.io')(io)
    , fs = require('fs')
    , path = require('path');
//    , MemStore = require('connect-memcached')(express)
//    , memStore = new MemStore({hosts:'192.168.80.104:11211'});


// all environments
app.set('port', process.env.PORT || 5005);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
//app.use(express.session({store:memStore, secret:'cookie', cookie:{originalMaxAge:3600000}}));
app.use(express.session({secret:'cookie', cookie:{originalMaxAge:3600000}}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')){ app.use(express.errorHandler()); }





/* routes */
routes.routeHandlers(app);


http.listen(app.get('port'), function(err)
{
    if(err)
        { console.log(err); }
    else
        { console.log('Express server listening on port ' + app.get('port')); }

});


