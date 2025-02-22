const express = require('express');
const cors = require('cors');
const ApiWebDeSpotifys = require('spotify-web-api-node');

const app = express();
app.use(cors());

const spotifyApi = new ApiWebDeSpotifys({clientId: process.env.CLIENT_ID, });