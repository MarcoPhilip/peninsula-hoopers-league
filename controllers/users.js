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
    const { userId, teamId } = req.params;
    // look for all users in DB and their teams and players
    const user = await User.findById(userId).populate({
        path: 'teams',
        populate: {
            path: 'players',
        }
    });
    // look up the team by comparing it to the req.params(teamId)
    const team = user.teams.find(tm => tm._id.toString() === teamId);
    // render the users/index.ejs
    res.render('users/show.ejs', {
        user,
        team,
    })
    // if errors occur, log and then redirect back home
})





module.exports = router;