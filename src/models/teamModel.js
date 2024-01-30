//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require('../services/db');

// sec B read teammember by team id
module.exports.readTeamMembersByTeamId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id FROM UserTeam
        WHERE team_id = ?;
    `;

    const VALUES = [data.team_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//view teamuser
module.exports.selectAllTeamUser = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Team;
    `;
    pool.query(SQLSTATMENT, callback)
}

///team leader board
module.exports.selectTeamLeaderboard = (callback) => {
    const SQLSTATEMENT = `
    SELECT
    Team.team_id,
    Team.team_name,
    COUNT(DISTINCT UserTeam.user_id) AS total_users,
    AVG(TaskProgress.completed_tasks_count) AS avg_completed_tasks,
    COUNT(DISTINCT UserInventory.inventory_id) AS total_items,
    COUNT(DISTINCT UserInventory.inventory_id) / COUNT(DISTINCT UserTeam.user_id) AS avg_items
FROM
    Team
    LEFT JOIN UserTeam ON Team.team_id = UserTeam.team_id
    LEFT JOIN (
        SELECT UserTeam.team_id, UserTeam.user_id, COUNT(progress_id) AS completed_tasks_count
        FROM TaskProgress
        JOIN UserTeam ON UserTeam.user_id = TaskProgress.user_id
        GROUP BY UserTeam.team_id, UserTeam.user_id
    ) AS TaskProgress ON Team.team_id = TaskProgress.team_id
    LEFT JOIN (
        SELECT UserTeam.team_id, UserTeam.user_id, UserInventory.inventory_id
        FROM UserInventory
        JOIN UserTeam ON UserTeam.user_id = UserInventory.user_id
    ) AS UserInventory ON Team.team_id = UserInventory.team_id
GROUP BY
    Team.team_id, Team.team_name;
`;
//pool.query(SQLSTATEMENT, callback);
 //   };

 console.log("Executing SQL query:", SQLSTATEMENT); // Add this line

 pool.query(SQLSTATEMENT, (error, results, fields) => {
     if (error) {
         console.error("Error in SQL query:", error);
         callback(error, null);
     } else {
         console.log("Results from SQL query:", results);
         callback(null, results);
     }
 });
};

