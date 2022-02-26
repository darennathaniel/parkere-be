-- creating table for review

CREATE TABLE Review(
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    carpark_id INT NOT NULL,
    comment VARCHAR(255),
    rating INT NOT NULL
);
