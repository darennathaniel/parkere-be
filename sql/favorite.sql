-- create favorite table
-- user_id bookmark carpark_id

CREATE TABLE Favorite(
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    carpark_id INT NOT NULL
);
