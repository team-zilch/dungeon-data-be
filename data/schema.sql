DROP TABLE IF EXISTS monsters;

CREATE TABLE IF NOT EXISTS monsters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  size VARCHAR(255),
  type VARCHAR(255),
  armor_class VARCHAR(255),
  hit_points VARCHAR(255),
  hit_dice VARCHAR(255),
  challenge_rating VARCHAR(255)
);
