//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require('../services/db');
//to check what items are in shop
module.exports.selectAllItems = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM MagicalItemShop;
    `;
    pool.query(SQLSTATMENT, callback)
}

//validate if inserted user_id and item in body exist
module.exports.validateuseritem = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    SELECT * FROM MagicalItemShop
    WHERE item_id = ?;
    `;
    const VALUES = [data.user_id, data.item_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//to check if user has enough points to buy item
module.exports.checkuserpoints = (data, callback) => {
    const SQLSTATMENT = `
    SELECT total_points 
    FROM UserPoints
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//get price for specific item
module.exports.getItemPrice = (data, callback) => {
    const SQLSTATMENT = `
    SELECT price 
    FROM MagicalItemShop
    WHERE item_id = ?;
    `;
    const VALUES = [data.item_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.deductPoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE UserPoints
    SET total_points = total_points - (
         SELECT price FROM MagicalItemShop
         WHERE item_id = ?
    )
    WHERE user_id = ?
    `;
    const VALUES = [data.item_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.addToUserInventory = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO UserInventory (user_id, item_id)
    VALUES(?,?);
    SELECT * FROM UserInventory 
    WHERE user_id = ? ;
    `;
    const VALUES = [data.user_id, data.item_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
};