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
        // find the team and user by ids from DB 
        const user = await User.findById(userId);
        const team = await Team.findById(teamId);
        // render players/new.ejs. pass the user and found team
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

// GET /:playerId (Show a player profile)
router.get('/:playerId', async (req, res) => {
    try {
        // get the ids from req.params
        const { userId, teamId, playerId } = req.params;
        // find ids from DB
        const user = await User.findById(userId);
        const team = await Team.findById(teamId);
        const player = await Player.findById(playerId);

        // render players/show.ejs and pass data if needed
        res.render('players/show.ejs', {
            user: user,
            team: team,
            player: player,
            currentUser: req.session.user,
        });
    } catch (error) {
        // if any errors, log it and redirect back home 
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
router.get('/:playerId/edit', async (req, res) => {
    try {
        // get the the ids from the req.params
        const { userId, teamId, playerId } = req.params;
        // find the user, team and player from DB
        const user = await User.findById(userId);
        const team = await Team.findById(teamId);
        const player = await Player.findById(playerId);
        // render players.edit ejs and pass the user, team and player datas
        res.render('players/edit.ejs', {
            user: user,
            team: team,
            player: player,
        })
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// PUT /:playerId (Edit a player)
router.put('/:playerId', async (req, res) => {
    try {
        
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /:playerId (Delete a player)
router.delete('/:playerId', async (req, res) => {
    try {
         // get the the ids from the req.params
         const { userId, teamId, playerId } = req.params;
         // remove player from the team array using $pull method
         await Team.findByIdAndUpdate(teamId, {
            $pull: {players: playerId}
         });
         // delete the player data
         await Player.findByIdAndDelete(playerId);
         // res.redirect to the team id showpage
         res.redirect(`/users/${userId}/teams/${teamId}`);
    } catch (error) {
        //if error occurs, log and then redirect back to home
        console.log(error);
        res.redirect('/');
    }
});




module.exports = router;