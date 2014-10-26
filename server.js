var config         = require('./config/config.json');
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var directory      = require('serve-index');
var passport       = require('passport');
var strategy       = require('passport-twitch').Strategy;
var session        = require('express-session');
var mongoSession   = require('connect-mongo')(session);
var mongoose       = require('mongoose');
var csrf           = require('csurf');
var app            = express();

mongoose.connect(config.mongoose.url, function(err) {
    if (!err) {
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            username: {
                type: String,
                required: true,
                trim: true
            },
            twitch: {
                type: Object,
                required: true,
                trim: true
            }
        });

        var User = mongoose.model('users', userSchema);

        function ensureAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            return res.redirect("/#/login");
        }

        passport.serializeUser(function(user, done) {
            User.findOne({
                username: user._json.display_name
            }, function(err, result) {
                if (result) {
                    result.twitch = user._json;
                    result.save();
                } else {
                    user.username = user._json.display_name;
                    user.twitch = user._json;

                    new User(user).save(function(err) {});
                }
            });
            done(null, user);
        });

        passport.deserializeUser(function(obj, done) {
            User.findOne({
                username: obj._json.display_name
            }, function(err, result) {
                if (result) {
                    obj.active = result.active;
                }
                done(null, obj);
            });
        });

        passport.use(new strategy({
                clientID: config.passport.clientID,
                clientSecret: config.passport.clientSecret,
                callbackURL: config.passport.callbackURL,
                scope: config.passport.scope
            },
            function(accessToken, refreshToken, profile, done) {
                process.nextTick(function() {
                    return done(null, profile);
                });
            }
        ));

        app.use(express.static(__dirname + '/public'));

        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(methodOverride());

        app.set('views', __dirname + '/views');
        app.engine('.html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.set('view options', {
            layout: false
        });
        app.use(express.Router());

        var sessiondb = session({
            store: new mongoSession({
                url: config.mongoose.url,
                maxAge: 300000
            }),
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
            auto_reconnect: true,
            cookie: {
                httpOnly: true
            }
        });
        app.use(sessiondb);
        app.use(passport.initialize());
        app.use(passport.session());

        var csrfValue = function(req) {
            var token = (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers['x-csrf-token']) || (req.headers['x-xsrf-token']);
            return token;
        };

        app.use(csrf({
            value: csrfValue
        }));

        app.use(function(req, res, next) {
            res.cookie('_csrf', req.csrfToken());
            next();
        });

        if (config.livereload) {
            app.use(require('connect-livereload')({
                port: 35729,
                ignore: ['.js', '.svg']
            }));
        }

        app.use(function(err, req, res, next) {
            console.error(err.stack);
            res.render('/#/error');
        });

        app.get('/', function(req, res) {
            res.render('index.html');
        });

        app.get('/api/user', function(req, res) {
            res.send(req.isAuthenticated() ? req.user : {});
        });

        app.get('/auth/twitch', passport.authenticate('twitch', {
            scope: config.passport.scopeArray
        }), function(req, res) {
            //
        });

        app.get('/auth/twitch/callback', passport.authenticate('twitch', {
            failureRedirect: '/#/login'
        }), function(req, res) {
            res.redirect('/#/homepage');
        });

        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/#/homepage');
        });

        app.get('*', ensureAuthenticated, function(req, res) {
            res.render('index.html');
        });

        var server = app.listen(config.port, function() {
            console.log('Listening on port %d', server.address().port);
        });
    }
});