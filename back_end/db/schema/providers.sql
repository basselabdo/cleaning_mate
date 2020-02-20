DROP TABLE IF EXISTS providers CASCADE;
CREATE TABLE providers
(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number bigint NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  max_distance VARCHAR(255) DEFAULT 200
);