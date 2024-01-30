//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require('../services/db');

//Q6
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO Task (title,description,points)
        VALUES (?, ?, ?);
    `;
    const VALUES = [data.title, data.description, data.points];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.gettingTaskData = (data, callback)=> {
    const SQLSTATMENT = `
        SELECT * FROM Task 
        WHERE title = ?
    `;
    const VALUES = [data.title];
    pool.query(SQLSTATMENT, VALUES, callback);
}
/////////////////

//Q7
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Task;
    `;
    pool.query(SQLSTATMENT, callback)
}
///////////////

//Q8 + Q9
module.exports.selectById = (data, callback) => {

    const SQLSTATMENT = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}//


//Q9
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
        UPDATE Task
        SET title = ?, description = ?,points = ?
        WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points,data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//Q10

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
        DELETE FROM Task
        WHERE task_id = ?;
        ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
