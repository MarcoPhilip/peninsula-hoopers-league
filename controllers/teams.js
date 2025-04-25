const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Team = require('../models/team.js');
const Player = require('../models/player.js');

// BUILD THE ROUTES FOR TEAMS BELOW

// GET /users/:userId/teams
router.get('/', async (req, res) => {
    try {
        // look up the current user from session
        //populate the teams and its players
        const currentUser = await User.findById(req.session.user._id).populate({
            path: 'teams',
            populate: {
                path: 'players'
            }
        });
        // render teams/index.ejs
        res.render('teams/index.ejs', {
            teams: currentUser.teams
        });

    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/teams/new
router.get('/new', (req, res) => {
    // render the teams/new.ejs
    res.render('teams/new.ejs');
});

// GET /users/:userId/teams/:teamId
router.get('/:teamId', async (req, res) => {
    try {

    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// POST /users/:userId/teams
router.post('/', async (req, res) => {
    try {
        // get the userID from req.params
        const { userId } = req.params;
        // get team name and division from the form
        const { name, division } = req.body;
        // create new team in DB
        const newTeam = await Team.create({
            name,
            division,
            owner: userId,
        })
        //push the new team 
        await User.findByIdandUpdate(userId, {
            $push: { teams: newTeam._id }
        });
        // redirect back to current user teams
        res.redirect(`/users/${req.params.userId}/teams`);
    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /users/:userId/teams/:teamId
router.get('/:teamId', async (req, res) => {
    try {

    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/teams/edit
router.get('/:teamId/edit', async (req, res) => {
    try {

    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// PUT /users/:userId/teams/:teamId
router.put('/:teamId', async (req, res) => {
    try {

    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
