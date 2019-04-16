const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json('What do you think you are doing here?');
});

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
});
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});
app.get('/getProfile/:id', (req, res) => {
    profile.getProfile(req, res, db)
});
app.put('/image', (req, res) => {
    image.handleImageIncrementation(req, res, db)
});
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});

