const express = require('express');
const app = express();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
    database: 'snoutprint-db'
  }
});

/**
 * YOUR CODE STARTS HERE
 */

// Gets a person's profile
 app.get('/person/:person_id', async function (req, res) {
     const results = await knex.raw(`SELECT id, first_name, last_name, email_address 
                                     FROM persons 
                                     WHERE id = ? and deleted_at is null`, [req.params.person_id]);
     res.json(results['rows'][0]);
   });

// Lists all of the person's pets (a flat list of pet objects; do not return soft-deleted data)
app.get('/person/:person_id/pets', async function (req, res) {
  const results = await knex.raw(`SELECT pets.id, pets.name, pets.species, pets.breed, pets.sex, pets.birthdate 
                                  FROM persons p
                                  INNER JOIN pet_persons pp on pp.person_id = p.id
                                  INNER JOIN pets on pets.id = pp.pet_id and pets.deleted_at is null
                                  WHERE p.id = ? and p.deleted_at is null`, [ req.params.person_id ]);
  res.json(results['rows']);
});

// Lists all of the person's pets' records (a flat list of record objects; do not return soft-deleted data)
app.get('/person/:person_id/records', async function (req, res) {
  const results =  await knex.raw(`SELECT r.id, r.title, r.url
                                  FROM persons p
                                  INNER JOIN pet_persons pp on pp.person_id = p.id
                                  INNER JOIN pets on pets.id = pp.pet_id and pets.deleted_at is null
                                  INNER JOIN records r on r.pet_id = pets.id and r.deleted_at is null
                                  WHERE p.id = ? and p.deleted_at is null `, [ req.params.person_id ]);
  res.json(results['rows']);
});

/**
 * END YOUR CODE SECTION
 */

app.listen(9001, function () {
  console.log('Snoutprint started and listening on port 9001!');
});
