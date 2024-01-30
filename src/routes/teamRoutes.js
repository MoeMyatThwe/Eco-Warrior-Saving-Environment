const express = require('express');
const router = express.Router();
const teamController = require("../controllers/teamController");


router.get('/team_leaderboard', teamController.getTeamLeaderboard);
router.get('/:team_id', teamController.readTeamMembersByTeamId);//sec B view team and teammembers
router.get('/', teamController.readAllTeamUser);//CA2 added view teams


module.exports = router;