## Project Name: Dungeon Data
## Developers: 
David Marchante, 
Kush Shrestha, 
Chaitanya Narukulla, 
William Fritts.

##
Dungeon Data Organization
https://github.com/team-zilch

## Description:
 This application will serve as a user hub for dungeon masters to be able to obtain the most up to date monster information on playing cards. The user will be presented with all monster cards and have access to instructions about the game. The user will also be presented with Dungeon and Dragons events. 

##Problem Domain
  One of the big problems with card-based games is that as cards are updated, users are required to buy new cards in order to keep up to date with their monsters' abilities. This application will solve that problem by pulling current information from the API and displaying up to date monster information in the form of digital cards which the user can flip through.  

 ##User stories
 MVP User Stories
   As a user, I'd like to find a welcome page that is clearly designed so I can find the information I am looking for.
   As a user, I'd like to be able to easily find information about the creators of the application.
   As a user, I'd like to be able to find game information in case I need to reference a rule and even learn about the game for the first time.
   As a user, I'd like to have live updated cards for the dungeon master to refer to during game play versus flipping through cards.
   As a user, I'd like to be able to sort cards.

 ##Stretch Goal User Stories
   As a user, I’d like to know about current and upcoming events – google api for user location
   As a user, I'd like to be able to filter the cards by abilities or other monster details.

#Stretch goals
 Current Events/news
 Sort
 Filter
 User stretch goal to have additional game stat information

## Build status
Build status of continus integration V 1.2.1

William Fritts [11:02 AM] version 1.0.0
Chaitanya Narukulla [12:30] version 1.1.1

## Front end for this back end server
 https://github.com/team-zilch/dungeon-data-fe
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used
Ex. -

<b>Built Back-end with</b>
- [Heroku]
- [node.js]
- [express]
- [nodemon]
- [superagent]
- [pg]
- [ cors  ]
- [blue host for web hosting]

## Features
What makes your project stand out?

## Installation of Server

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.15.3 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install express```

Follow [our installing guide](http://expressjs.com/en/starter/installing.html)
for more information.

## Quick Start

## How to use

step1: run  command in command promt
```bash
  git clone https://github.com/team-zilch/dungeon-data-be.git ```

step2: Install dependencies:
```bash
$ npm install  i ```

Step3: Start server
 ```bash
 node server.js```

### Deployment
To create a heroku instance and deploy this backend on Heroku, run the following commands:
  ```heroku create```
  ```git push heroku master```
  ```heroku addons:create heroku-postgresql```
  ```heroku pg:psql < schema.sql```

## API Reference:
API from :
http://dnd5eapi.co/api/monsters
  Sample Response first API Call:
    {
      "count": 325,
      "results": [
      {
      "name": "Aboleth",
      "url": "http://www.dnd5eapi.co/api/monsters/1"
      }
    }

  Sample Response second API Call(example url:http://www.dnd5eapi.co/api/monsters/1):
    {
      "_id": "5bce91465b7768e7920181a5",
      "index": 1,
      "name": "Aboleth",
      "size": "Large",
      "type": "aberration",
      "subtype": "",
      "alignment": "lawful evil",
      "armor_class": 17,
      "hit_points": 135,
      "hit_dice": "18d10",
      "speed": "10 ft., swim 40 ft.",
      "strength": 21,
      "dexterity": 9,
      "constitution": 15,
      "intelligence": 18,
      "wisdom": 15,
      "constitution_save": 6,
      "intelligence_save": 8,
      "wisdom_save": 6,
      "history": 12,
      "perception": 10,
      "damage_vulnerabilities": "",
      "damage_resistances": "",
      "damage_immunities": "",
      "condition_immunities": "",
      "senses": "darkvision 120 ft., passive Perception 20",
      "languages": "Deep Speech, telepathy 120 ft.",
      "challenge_rating": 10,
      "special_abilities": [],
      "actions": [],
      "legendary_actions": [],
      "url": "http://www.dnd5eapi.co/api/monsters/1"
    }

Example Schema:
  DROP TABLE monsters, events;

  CREATE TABLE monsters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    size VARCHAR(255),
    type VARCHAR(255),
    armor_class VARCHAR(255),
    hit_points VARCHAR(255),
    hit_dice VARCHAR(255),
    challenge_rating VARCHAR(255)
  );

  CREATE TABLE events (
    event_name VARCHAR(255),
    link VARCHAR (255),
    summary VARCHAR (255),
  );
 
Monster Art from :
http://www.iwozhere.com/SRD/Gallery.html


## Credits
Codefellows T.A's
http://dnd5eapi.co/api/monsters
http://www.iwozhere.com/SRD/Gallery.html
 
 ## License
   MIT

