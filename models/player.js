const mongoose = require("mongoose");

// Define the playerSchema
const playerSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        enum: ['PG', 'SG', 'C', 'SF', 'PF', 'Coach'],
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
});

const Player = mongoose.model('Player', playerSchema);


module.exports = Player;