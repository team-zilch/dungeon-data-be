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

//----------Global Variables------------------------------------------>
let monsterArr = [];

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

//-------Database Setup------------------------------------------------>
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

//--------Routes------------------------------------------------------->
app.get('/', homePage);
app.get('/monster', monsterData);

//-------Route Functions---------------------------------------------->
function homePage(request, response){
  response.send('home page route works');
}

//Making API Call to get MonsterDAta
function monsterData(request, response){
  if(monsterArr.length === 0){
    try {
      superagent.get('http://dnd5eapi.co/api/monsters')
        .then(result => {
          const monsterData = result.body.results;
          Promise.all(monsterData.map(element => {
            return superagent.get(element.url)
              .then(result => {
                let monster = new Monsters(result.body.name, result.body.size, result.body.type, result.body.armor_class, result.body.hit_points, result.body.hit_dice, result.body.challenge_rating);
                monsterArr.push(monster);
                console.log(monster);
                //insert new monster into database
                insertIntoDB(monster);
              });
          }))
            .then(result => {
              response.send(monsterArr);
            });
        })
        .catch(err => handleError(err, response));
    }
    catch(error) {
      handleError(error);
    }
  // response.send('monster route works');
  } else{
    response.send(monsterArr);
  }
}

//--------Helper functions------------------------------------------>

function handleError(err, response){
  console.error(err);
  if(response) response.status(500).send('Sorry, something went wrong');
}

//---------------- DATA-BASE------------------------------------------->
function insertIntoDB(data){
  let insertStatement = 'INSERT INTO monsters (name, size, type, armor_class, hit_points, hit_dice, challenge_rating) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  let insertValue = [data.name, data.size, data.type, data.armor_class, data.hit_points, data.hit_dice, data.challenge_rating];
  client.query(insertStatement, insertValue);
}


app.use('*', (request,response) => response.send('Sorry , That route dosent exit. '));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
