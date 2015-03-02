// modules =================================================
var path            = require('path');
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var session         = require('express-session');
var mongoose        = require('mongoose');
var fs              = require('fs');
var browserify      = require('browserify');
var exposify        = require('exposify');
var passport        = require('passport');
var flash           = require('flash');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

//Bring in our passport config
require('./config/passport')(passport);


// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the less middleware
app.use(require('less-middleware')(path.join(__dirname, 'public')));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'getitgotitgo' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes


exposify.config = {
  angular: 'angular',
  //jquery: '$'
};

var b = browserify({ cache: {}, packageCache: {}, fullPaths: true });

b.add('./public/js/site.js');

function bundleAssets(cb) {
  b.transform(exposify);
  b.bundle( function(err, output) {
    if(err) {
      console.error('There was an issue running browserify!');
      console.error(err);
      return cb && callback(err);
    }

    // write our new file to the public/js folder
    fs.writeFile('./public/js/bundle.js', output, function (err) {
      if(err) {
        console.error('There was an error saving the freshly-bundled front end code.');
        console.error(err);
        return cb && callback(err);
      }
      console.log('Recompiled assets.');
      return cb && cb(null);
    });
  });
}

// b.on('update', function(ids) {
//   bundleAssets();
// });

bundleAssets();

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
