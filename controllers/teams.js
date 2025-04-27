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
    const currentUser = req.session.currentUser; //fix later
    // render the teams/new.ejs
    res.render('teams/new.ejs');
});

// GET /users/:userId/teams/:teamId
router.get('/:teamId', async (req, res) => {
    try {
        // look up the user from session
        // const currentUser = await User.findById(req.session.user._id);
        // look up the user's team by id from req.params
        const team = await Team.findById(req.params.teamId).populate('owner').populate('players');
        // render the show.ejs and pass the team data
        res.render('teams/show.ejs', {
            team: team,
    });
    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// POST /users/:userId/teams
router.post('/', async (req, res) => {
    try {
        // find user from the session
        const currentUser = await User.findById(req.session.user._id);
        // fill in team detail fields from the form, set the owner as the current user
        const team = {
            name: req.body.name,
            division: req.body.division,
            owner: currentUser,
        };
        // create the team
        const newTeam = await Team.create(team);
        // push the new team into the user array
        currentUser.teams.push(newTeam._id);
        // save the current user changes
        await currentUser.save();
        // redirect back to current user teams
        res.redirect(`/users/${req.params.userId}/teams`);
    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /users/:userId/teams/:teamId
router.delete('/:teamId', async (req, res) => {
    try {
        // get the team from req.params
        const team = await Team.findById(req.params.teamId);
        // use mongoose .delete() method to delete team and its players
        // delete players in the team
        await Player.deleteMany({
            _id: {
                $in: team.players
            }
        });
        // delete team
        await Team.findByIdAndDelete(req.params.teamId);
        //update the user teams array
        await User.findByIdAndUpdate(req.session.user._id, {
            //use $pull method
            $pull: { teams: req.params.teamId }
        })

        // redirect back to the user teams index
        res.redirect(`users/${req.session.user._id}/teams`);
    } catch (error) {
        // if any errors, log it and redirect back home 
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/teams/edit
router.get('/:teamId/edit', async (req, res) => {
    try {
        const currentTeam = await Team.findById(req.params.teamId);

         // check for user
         if (!currentTeam.owner.equals(req.session.user._id)) {
            return res.redirect('/');
         }

        res.render('teams/edit.ejs', {
            team: currentTeam,
        })
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
