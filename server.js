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
const baseUrl = 'http://dnd5eapi.co/api/monsters';

//--------Routes------------------------------------------------------->
app.get('/', homePage);
app.get('/monster', monsterData);


//-------Route Functions---------------------------------------------->
function homePage(request, response){
  response.send('home page route works');
}

function monsterData(request, response){
  superagent.get('http://dnd5eapi.co/api/monsters')
    .then(result => {
      const monsterData = result.body.results;
      let monsterArr = [];
      monsterData.forEach(element => {
        console.log(element.name, element.url);
        let monster = new Monsters(element.name, element.url);
        monsterArr.push(monster);
      });
      // let insertStatement = 'INSERT INTO dungeons (name,url) VALUES($1,$2);';
      // let insertValues =[monster.name,monster.url]
      response.send(monsterArr);
    })
    .catch(err => handleError(err, response));
  // response.send('monster route works');
}

//---------Constructor functions--------------------------------------->

function Monsters(name, url){
  this.name = name;
  this.url = url;
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
