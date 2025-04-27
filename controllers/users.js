const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { populate } = require('../models/team.js');


// GET /users
router.get('/', async (req, res) => {
    try {
        // look for all users in DB with their teams and players
        const allUsers = await User.find({}).populate({
            path: 'teams',
            populate: {
                path: 'players',
            }
        });
        // render the users/index.ejs
        res.render('users/index.ejs', {
            users: allUsers,
        });
    } catch (error) {
        // if errors occur, log and then redirect back home
        console.log(error);
        res.redirect('/')
    }
});

// GET /:userId
router.get('/:userId', async (req, res) => {
    // look for all users in DB
    // render the users/index.ejs
    // if errors occur, log and then redirect back home
})





module.exports = router;