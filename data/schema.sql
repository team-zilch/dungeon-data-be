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