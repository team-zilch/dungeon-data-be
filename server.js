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

//---------Constructor functions----------------------------------------
function Monsters(result){
  this.name = result.name;
  this.size = result.size;
  this.type = result.type;
  this.armor_class = result.armor_class;
  this.hit_points = result.hit_points;
  this.hit_dice = result.hit_dice;
  this.challenge_rating = result.challenge_rating;
}

function Event(event) {
  this.event_name = event.name.text;
  this.link = event.url;
  this.summary = event.summary;
}

//-------Database Setup------------------------------------------------>
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

//--------Routes------------------------------------------------------->
app.get('/', homePage);
app.get('/monster', monsterData);
app.get('/events', eventData);

//-------Route Functions---------------------------------------------->
function homePage(request, response){
  response.send('home page route works');
}

//Making API Call to get MonsterDAta
function monsterData(request, response){
  const monsterUrl = 'http://dnd5eapi.co/api/monsters';
  if(monsterArr.length === 0){
    try {
      superagent.get(monsterUrl)
        .then(result => {
          const monsterData = result.body.results;
          Promise.all(monsterData.map(element => {
            return superagent.get(element.url)
              .then(result => {
                let monster = new Monsters(result.body);
                monsterArr.push(monster);

                //insert new monster into database
                insertIntoDB(monster);
              });
          }))
            .then(() => {
              response.send(monsterArr);
            });
        })
        .catch(err => handleError(err, response));
    }
    catch(error) {
      handleError(error);
    }
  } else{
    response.send(monsterArr);
  }
}

function eventData(request, response) {
  const url = `https://www.eventbriteapi.com/v3/events/search?token=${process.env.EVENTBRITE_API_KEY}&q=dungeons&location.address=seattle`;

  return superagent.get(url)
    .then(result => {
      console.log(result.body.events);
      const events = result.body.events.map(event => {
        let newEvent = new Event(event);
        // let insertStatement = 'INSERT INTO events (event_name, link, summary)  VALUES ($1, $2, $3)';
        // let insertValues = [ newEvent.event_name, newEvent.link, newEvent.summary];

        // client.query(insertStatement, insertValues);

        return newEvent;
      });
      response.send(events);
    })
    .catch(error => handleError(error, response));
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
