'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

const app = express();

//----Update with heroku deployment and react page-------------------->
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('./public'))

//-------Database Setup------------------------------------------------>
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

//--------Routes------------------------------------------------------->
app.get('/',(request,response) => response.send('Server Works'));


app.use('*', (request,response) => response.send('Sorry , That route dosent exit. '));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
