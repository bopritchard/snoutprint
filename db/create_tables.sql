-- This is for part 1:
-- Initial CREATE TABLE statements for your schema
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name character varying (100),
    last_name character varying (100),
    email_address character varying (255),
    created_at timestamp NOT NULL default now(),
    deleted_at timestamp
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name character varying (100),
    species character varying (100),
    breed character varying (100),
    sex character varying (25),
    birthdate date,
    created_at timestamp NOT NULL default now(),
    deleted_at timestamp
);

CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    pet_id int not null REFERENCES pets (id),
    title character varying ( 100 ),
    url character varying ( 255 ),
    created_at timestamp NOT NULL default now(),
    deleted_at timestamp
);

CREATE TABLE pet_persons (
    pet_id int not null REFERENCES pets (id),
    person_id int not null REFERENCES persons (id),
    created_at timestamp NOT NULL default now(),
    PRIMARY KEY (pet_id, person_id)
);