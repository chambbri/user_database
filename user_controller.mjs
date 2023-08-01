/* NOTE; support for using bcrypt was gathered from
a tutorial at this link https://www.youtube.com/watch?v=b91XgdyX-SM&ab_channel=codedamn
and the github repository here: https://github.com/mehulmpt/node-auth-youtube/tree/master
*/

import express from 'express';
import * as User from './user_model.mjs';
import bcrypt from 'bcryptjs';
import path from 'path';

const app = express();

app.use(express.json());
// set up express to be used with static HTML files - this is just needed for testing the database
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'static')))


const PORT = 3001;

// For user registration
app.post("/user_registration", async (req, res) => {
    // obtain values to verify required ones are entered and password for hashing
    const plainTextPassword = req.body.password;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;

    if (!username) return res.json({ status: 'error', error: 'Invalid username'});
    if (!plainTextPassword) return res.json({ status: 'error', error: 'Invalid password'});
    if (!fname) return res.json({ status: 'error', error: 'Invalid password'});
    if (!lname) return res.json({ status: 'error', error: 'Invalid password'});
    

    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    // create user in database by calling createUser
    User.createUser(username, hashedPassword, fname, lname, req.body.email, req.body.phone)
        .then((user) => {
            res.json({ status: 'ok' })
        })
        .catch(error => {
            if (error.code === 11000) {
                // username already exists in Mongodb database
                return res.json({status: 'error', error: 'Username already exists'});
            }
            throw error;
        });
});

app.post("/user_login", async (req, res) => {
    // access needed variables
    const username = req.body.username;
    const password = req.body.password;

    // determine if the user is valid
    const validUser = await User.verifyUser(username, password)
    console.log(validUser);

    //verifyUser will return false if the user is valid
    if (!validUser) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }
    else{
        return res.json({ status: 'ok', data: validUser })
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});