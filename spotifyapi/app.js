/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */


var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var oai = require('openai');
var oaikey = require('./openapi.js');

const Configuration = oai.Configuration;
const OpenAIApi = oai.OpenAIApi;

var client_id = "6d9e10211db246258afcd20c5e8a5ab0" // Your client id
var client_secret = '3bfca93e55fd466084b2e49c051abd26' // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var access_token;
const BASE_URL = 'https://api.spotify.com';


const configuration = new Configuration({
  apiKey: oaikey.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login2', async function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var testTherapy = await getTherapy("Neon Lights");
  console.log("did therapy");
  console.log(testTherapy);
  res.status(200).json({ result: testTherapy });
});


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-currently-playing user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('/#' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token
        //   }));

        // Immediate redirect to the recently-played endpoint with the access_token
        res.redirect('/recently-played?' + querystring.stringify({access_token: access_token}));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/recently-played', function(req, res) {
  var url = BASE_URL + '/v1/me/player/recently-played';
  options = {
    url: url,
    headers: { 'Authorization': 'Bearer ' + req.query.access_token },
    json: true
    };
  request.get(options, (error, response, body) => {
    
    var songs = '';
    var c = 1;
    var tL = body.items.length - 1;
    body.items.forEach(i => {
      song = `${i.track.name} by`;
      i.track.artists.forEach(a => {
        song = song + ` ${a.name}`;
      })
      console.log(`tL:${tL} c:${c}`)
      songs += tL > c ? `${song}, ` : (tL == c ? `${song}, and ` : `${song} `);
      c+=1;
    })
    //res.send(songs);
    getTherapy(songs).then((resp)=> res.send(resp));
  });
});
async function getTherapy (song) {

  if (song.trim().length === 0) {
    console.log("Please enter a valid song");
    return "Please enter a valid song";
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(song),
      temperature: 0.8,
      max_tokens: 200
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

function generatePrompt(song) {
  return `if you were a therapist, what would you say about my mental health based on me listening to the following songs?
  Songs : ${song}
`;
}

console.log('Listening on 8888');
app.listen(8888);
