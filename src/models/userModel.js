
//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require('../services/db');
//Q1
module.exports.selectuserById = (data, callback) => {

    const SQLSTATMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}//
//Q2
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM User;
    `;
    pool.query(SQLSTATMENT, callback)
}
//

//Q3
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
  SELECT
    User.user_id,
    User.username,
    User.email,
    COALESCE(SUM(Task.points), 0) AS total_points
  FROM User
  LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id
  LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
  WHERE User.user_id = ?
  GROUP BY User.user_id;   `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}//

//Q1
module.exports.checkEmailDuplication = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM USER
    WHERE email = ?
    `;

    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertSingleUser = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO User (username, email)
        VALUES (?, ?);
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectAllUsers = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM User;
    `;
    pool.query(SQLSTATMENT, callback)
}
////////////////////

//Q4
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE User 
        SET username = ?, email = ?
        WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectUserAvilability = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM USER
    WHERE username = ? OR email = ?
    `;

    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
        DELETE FROM User 
        WHERE user_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

///////////////////////////
//Section B 
//createuserpoints s1
module.exports.insertSingleUserPoint = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO UserPoints (user_id)
        VALUES (?);
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//sec B Q1
module.exports.selectByIdwithTotalPoints = (data, callback) => {
    const SQLSTATMENT = `
        SELECT User.user_id, User.username, User.email, UserPoints.total_points
         FROM User
         LEFT JOIN UserPoints ON User.user_id = UserPoints.user_id
         WHERE User.user_id=?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback)
}
/////////
//for buying item with points

module.exports.getUserPoints = (data, callback) => {
    const SQLSTATMENT = `
    SELECT total_points FROM UserPoints 
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.updateUserPoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE UserPoints
    SET total_points = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.total_points, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};
////////////////////////////////////////////

//sec B view all useritem possession
module.exports.selectAlluseritem = (callback) => {
    const SQLSTATMENT = `
    SELECT
    User.user_id,
    User.username,
    MagicalItemShop.name AS item_name,
    COUNT(UserInventory.item_id) AS quantity
FROM
    User 
JOIN
    UserInventory ON User.user_id = UserInventory.user_id
JOIN
    MagicalItemShop ON UserInventory.item_id = MagicalItemShop.item_id
GROUP BY
    User.user_id, User.username, MagicalItemShop.name;
    `;
    pool.query(SQLSTATMENT, callback)
}
/////////////////////////
//sec B view each useritem possession
module.exports.selectuseritemById = (data, callback) => {
    const SQLSTATMENT = `
  SELECT
  User.user_id,
  User.username,
  MagicalItemShop.name AS item_name,
  COUNT(UserInventory.item_id) AS quantity
FROM
  User 
JOIN
  UserInventory ON User.user_id = UserInventory.user_id
JOIN
  MagicalItemShop ON UserInventory.item_id = MagicalItemShop.item_id
WHERE
  User.user_id = ?
GROUP BY
  User.user_id, User.username, MagicalItemShop.name;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}/////////////////////////////

//sec B team part
//validate if user is already in a team
module.exports.validateuserinTeam = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM UserTeam
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES , callback);
}
//validate if inserted user_id and team_id in body exist
module.exports.validateuserteam = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    SELECT * FROM Team
    WHERE team_id = ?;
    `;
    const VALUES = [data.user_id, data.team_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////

module.exports.addusertoteam = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO UserTeam (user_id, team_id)
    VALUES(?, ?);
    `;
    const VALUES = [data.user_id, data.team_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};


module.exports.getuserteam = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM UserTeam
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};
//////////////////

//from prac7 register,login

//check username or email exists
module.exports.selectByUsernameOrEmail = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id FROM User
        WHERE username = ? OR email = ?;
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//register
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//login
module.exports.selectUserByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}


