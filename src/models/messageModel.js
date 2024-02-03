// const pool = require('../services/db');

// // module.exports.selectAll = (callback) =>
// // {
// //     const SQLSTATMENT = `
// //     SELECT * FROM Messages;
// //     `;

// //     pool.query(SQLSTATMENT, callback);
// // }

// module.exports.selectAll = (callback) =>
// {
//     const SQLSTATMENT = `
//     SELECT Messages.*, User.username 
//     FROM Messages 
//     INNER JOIN User ON Messages.user_id = User.user_id;
//     `;

//     pool.query(SQLSTATMENT, callback);
// }

// // module.exports.selectMessage = (callback) =>
// // {
// //     const SQLSTATEMENT = `
// //     SELECT Messages.*, User.username 
// //     FROM Messages 
// //     INNER JOIN User ON Messages.user_id = User.user_id;
// //     `;

// //     pool.query(SQLSTATEMENT, callback);
// // }

// module.exports.selectById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     SELECT * FROM Messages
//     WHERE id = ?;
//     `;
//     const VALUES = [data.id];

//     pool.query(SQLSTATMENT, VALUES, callback);
// }

// module.exports.insertSingle = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     INSERT INTO Messages (message_text, user_id)
//     VALUES (?, ?);
//     `;
//     const VALUES = [data.message_text, data.user_id];

//     pool.query(SQLSTATMENT, VALUES, callback);
// }

// module.exports.updateById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE Messages 
//     SET message_text = ?, user_id = ?
//     WHERE id = ?;
//     `;
//     const VALUES = [data.message_text, data.user_id, data.id];

//     pool.query(SQLSTATMENT, VALUES, callback);
// }

// module.exports.deleteById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     DELETE FROM Messages 
//     WHERE id = ?;
//     `;
//     const VALUES = [data.id];

//     pool.query(SQLSTATMENT, VALUES, callback);
// }


///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//Moe Myat Thwe 2340362 DIT FT 1B 05

const pool = require("../services/db.js");
//read Messages
module.exports.selectAllMessage = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Messages
        INNER JOIN User ON Messages.user_id = User.user_id
        ORDER BY Messages.created_at ASC;
        `;
    pool.query(SQLSTATMENT, callback)
}

//Create or send Messages
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Messages (user_id,message, created_at)
    VALUES (?, ?, NOW());
    `;
    const VALUES = [data.user_id,data.message];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//delete message
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//update message
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message= ?
    WHERE id = ?;
    `;
const VALUES = [data.message, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}
