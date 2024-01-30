//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require('../services/db');
//Q11
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO TaskProgress (user_id , task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.gettingTaskprogressData = (data, callback)=> {
    const SQLSTATMENT = `
        SELECT * FROM TaskProgress
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
/////////////////

//Q12+ Q13
module.exports.selectTaskprogressById = (data, callback) =>
{


    const SQLSTATMENT = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}//

//Q9
module.exports.updateTaskProgressById = (data, callback) =>
{
    const SQLSTATMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;
    `;
    const VALUES = [data.notes,data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//Q14
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//Sec B Q1 s1
//Q11 validate user task existence
//validate if inserted user_id in body exist
module.exports.validateuser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    
    
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.validatetask = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    
    
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingleProgress = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO TaskProgress (user_id, task_id,completion_date, notes)
        VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.task_id,data.completion_date, data.notes];
    pool.query(SQLSTATMENT, VALUES, callback);
}
///////


//Section B 
//createuserpoints +taskprogress s1
module.exports.insertSingleProgressUserPoint = (data, callback) =>
{
  
    const SQLSTATMENT = `
    UPDATE UserPoints
    SET total_points = total_points + (
        SELECT points
        FROM Task
        WHERE task_id = ?
    )
    WHERE user_id = ?
    `;

    const VALUES = [data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//sec B Q1
module.exports.selectProgressByIdPoints= (data, callback) =>
{
      const SQLSTATMENT = `
        SELECT progress_id, user_id, task_id, DATE_FORMAT(completion_date, '%Y-%m-%d') AS formatted_completion_date, notes
           FROM TaskProgress
           WHERE progress_id = ?`;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback)
}