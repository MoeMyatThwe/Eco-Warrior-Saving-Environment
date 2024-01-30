//Moe Myat Thwe 2340362 DIT/FT/1B/05
const teamModel = require("../models/teamModel.js");

module.exports.readTeamMembersByTeamId = (req, res, next) => {
    const team_id = req.params.team_id;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTeamMembersByTeamId:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    teamModel.readTeamMembersByTeamId({ team_id }, callback);
};
//view teams
module.exports.readAllTeamUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTeamUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    teamModel.selectAllTeamUser(callback);
}

//sec B team leader board
module.exports.getTeamLeaderboard = (req, res, next) => {
    const callback = (error, results) => {
        if (error) {
            console.error("Error in getTeamLeaderboard:", error);
            res.status(500).json(error);
        } else {
            console.log("Results from getTeamLeaderboard:", results);
            res.status(200).json(results);
        }
    };

    console.log("Fetching team leaderboard...");
    teamModel.selectTeamLeaderboard(callback);
};
