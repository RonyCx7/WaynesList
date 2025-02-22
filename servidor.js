const express = require('express');
const cors = require('cors');
const ApiWebDeSpotifys = require('spotify-web-api-node');
const SpotifyApi = require("spotify-web-api-node/src/server-methods");

const app = express();
app.use(cors());

const spotifyApi = new ApiWebDeSpotifys({clientId: process.env.CLIENTE_ID, secretId: process.env.SECRETO_ID, redirectUri: 'http://localhost:8888/callback'});

app.get('/login', (req, res) => {
    const scopes = ['user-top-read'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;
    try{
        const data = await SpotifyApi.authorizationCodeGrant(code);
        spotifyApi.setAccessToken(data.body['access_token']);
        res.redict('/');
    }catch (err){res.status(500).send('Hay un error en tu conexion carnal' + err);}
});

app.get('/top-canciones', async (req, res) => {
    try{
        const data = await spotifyApi.getMyTopTracks({limit: 10});
        const canciones = data.body.items.map(item => ({
            nombre: item.name,
            artista: item.artists[0].name,
            url: item.external_urls.spotify
        }));
        res.json(canciones);
    }catch (err){res.status(500).send('Hay un error al obtener tus canciones carnal' + err);}
});

app.listen(8888, () => console.log('El servidor esta en http://localhost:8888'));
