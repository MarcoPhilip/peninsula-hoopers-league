const { default: mongoose } = require("mongoose");


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    division: {
        type: String,
        enum: ['Open Division', 'Open Rec Division', 'Open Asian Division', 'Age 40 and Over Division', 'Age 50 and Over Division', '6 Feet Under All-Filipino',],
        required: true,
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        }
    ]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;