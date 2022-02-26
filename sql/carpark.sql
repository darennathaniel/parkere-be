-- creating table for carpark

CREATE TABLE Carpark(
    park_id SERIAL PRIMARY KEY,
    park_coordinate VARCHAR(255),
    total_lots VARCHAR(255),
    lot_type VARCHAR(255),
    lot_available VARCHAR(255),
    park_number VARCHAR(255),
    park_address VARCHAR(255),
    building_type VARCHAR(255),
    rates VARCHAR(255),
    short_term VARCHAR(255),
    paying_system VARCHAR(255),
    free_parking VARCHAR(255),
    night_parking VARCHAR(255)
);

