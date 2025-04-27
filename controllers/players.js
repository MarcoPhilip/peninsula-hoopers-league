const express = require('express');
const router = express.Router({ mergeParams: true});

const User = require('../models/user.js');
const Team = require('../models/team.js');
const Player = require('../models/player.js');

// BUILD THE ROUTES FOR PLAYERS BELOW


// GET /new (Form to add a player)
router.get('/new', async (req, res) => {
    try {
        // look for user and team from req.params
        const { userId, teamId } = req.params;

        const user = await User.findById(userId);
        const team = await Team.findById(teamId);
        // render players/new.ejs. pass the userId and found team
        res.render('players/new.ejs', {
            user: user,
            team: team,
        })
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// POST / (Add a player)
router.post('/', async (req, res) => {
    try {
        // look up the user and team from req.params
        const { userId, teamId } = req.params;
        const { firstname, lastname, position, height } = req.body;
        // find the user and team from DB using the req.params
        const user = await User.findById(userId);
        const team = await Team.findById(teamId);
        // create the player
        const newPlayer = new Player({
            firstname,
            lastname,
            position,
            height,
        });
        // save the changes
        await newPlayer.save();
        // push the player into the team field
        team.players.push(newPlayer._id);
        await team.save();
        // redirect bact to the user team show page
        res.redirect(`/users/${userId}/teams/${teamId}`)
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// GET /:playerId/edit (Form to edit a player)
router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// PUT /:playerId (Edit a player)
router.put('/', async (req, res) => {
    try {
        
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /:playerId (Delete a player)
router.delete('/', async (req, res) => {
    try {
        
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});




module.exports = router;