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
app.use(express.static('./public'));

//-------Database Setup------------------------------------------------>
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

//----------Global Variables------------------------------------------>
const baseUrl = 'http://dnd5eapi.co/api/monsters/';
let monsterArr = [];

//--------Routes------------------------------------------------------->
app.get('/', homePage);
app.get('/monster', monsterData);


//-------Route Functions---------------------------------------------->
function homePage(request, response){
  response.send('home page route works');
}

function monsterData(request, response){
  try {
    superagent.get('http://dnd5eapi.co/api/monsters')
      .then(result => {
        const monsterData = result.body.results;
        Promise.all(monsterData.map(element => {
          superagent.get(element.url)
            .then(result => {
              let monster = new Monsters(result.body.name, result.body.size, result.body.type, result.body.armor_class, result.body.hit_points, result.body.hit_dice, result.body.challenge_rating);
              monsterArr.push(monster);
            });
        }))
          .then(response.send(monsterArr));
      })
      .catch(err => handleError(err, response));
  }
  catch(error) {
    handleError(error);
  }
  // response.send('monster route works');
}


//---------Constructor functions--------------------------------------->

function Monsters(name, size, type, armor_class, hit_points, hit_dice, challenge_rating){
  this.name = name;
  this.size = size;
  this.type = type;
  this.armor_class = armor_class;
  this.hit_points = hit_points;
  this.hit_dice = hit_dice;
  this.challenge_rating = challenge_rating;
}



//--------Helper functions------------------------------------------>

function handleError(err, response){
  console.error(err);
  if(response) response.status(500).send('Sorry, something went wrong');
}

// function queryDB(queryData, response){
//   let sqlStatement = ;
//   let value = ;
// }

// function insertIntoDB(queryData, response){

// }


app.use('*', (request,response) => response.send('Sorry , That route dosent exit. '));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
