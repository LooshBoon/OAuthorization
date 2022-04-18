const express = require("express");
require('dotenv').config();
const passport = require('passport')
const cookieParser = require('cookie-parser');
const util = require('util')
const session = require('express-session')
const SteamStrategy = require('./passport-steam/index.js').Strategy;
const BnetStrategy = require('passport-bnet').Strategy;
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const db = require("./app/models");
const app = express()


const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:4200"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get('/', (req, res) =>  {
    res.render('pages/front')
})
  

// force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
   //console.log('Drop and Resync Database with { force: true }');
   //initial();
 //});

 //--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:9000/auth/steam/return',
    realm: 'http://localhost:9000/',
    apiKey: 'A5D1EEA6B31DF18AA63EF66F714AE49A'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));


app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),

  
  async function(req, res) {
    console.log(req.user)
    const steam_name = req.user.displayName
    const steamId = req.user.steamid
    const oauth_id = 1

  
    await fetch(`http://localhost:9000/api/steam/${oauth_id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
          steam_name
      })
  })

  res.redirect("http://localhost:4200/#/ESPL")



  });



  function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/');
  }



//-----------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------

const BNET_ID = process.env.BNET_OAUTH_CLIENT_ID;
const BNET_SECRET = process.env.BNET_OAUTH_CLIENT_SECRET;
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || "http://localhost:9000/oauth/battlenet/callback";
// Review full list of available scopes here: https://develop.battle.net/documentation/guides/using-oauth
const OAUTH_SCOPES = process.env.OAUTH_SCOPES || "openid";


passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// Register the BnetStrategy within Passport.
passport.use(
new BnetStrategy(
{ clientID: BNET_ID,
  clientSecret: BNET_SECRET,
  scope: OAUTH_SCOPES,
  callbackURL: OAUTH_CALLBACK_URL },
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
})
);


app.use(cookieParser());
app.use(session({ secret: 'passport-battlenet-example', // Change this value to a unique value for your application!
                saveUninitialized: true,
                resave: true }));

// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth/battlenet',
      passport.authenticate('bnet'));

app.get('/oauth/battlenet/callback',
      passport.authenticate('bnet', { failureRedirect: '/' }),
      async function(req, res){

      console.log(req.user)

      const battletag = req.user.battletag
      const oauth_id = 1

      await fetch(`http://localhost:9000/api/bnet/${oauth_id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({

          battletag

      })
    })

    res.redirect("http://localhost:4200/#/ESPL")
  });



app.get('/logout', function(req, res) {
req.logout();
res.redirect('/');
});

app.use(function (err, req, res, next) {
console.error(err);
res.send("<h1>Internal Server Error</h1>");
});















require("./app/routes/steam")(app);
require("./app/routes/bnet")(app);
require("./app/routes/users")(app);


























db.sequelize.sync();




// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
