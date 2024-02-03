//Moe Myat Thwe 2340362 DIT/FT/1B/05
const taskprogressModel = require("../models/taskprogressModel.js");
//from user for secB s1
////////////
//Q11 validate user and task existence
module.exports.ValidateUserExistence = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    };
   
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (!results || results.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        next();
    }
    taskprogressModel.validateuser(data, callback);
}

module.exports.ValidateTaskExistence = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    };
    if (!data.task_id) {
        return res.status(400).json({
            message: "Task ID is required in the request body."
        })

    }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (!results || results.length === 0) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        next();
    }
    taskprogressModel.validatetask(data, callback);
}


//////////////
//Q1//p1
module.exports.createNewTaskprogress = (req, res, next) => {
    if (req.body.user_id == undefined || req.body.task_id == undefined || req.body.completion_date == undefined) {
        return res.status(400).json({ error: 'Bad Request : completion_date is required' });
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes,
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTaskprogress:", error);
            res.status(500).json(error);
            return;
        }
        else {
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User or task not found' });
            }
        }

        const data = {
            progress_id: results.insertId
        }
        res.locals.insertId = results.insertId;
        next();
    }

    taskprogressModel.insertSingleProgress(data, callback);
}

//CA2
module.exports.completeTaskById = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.params.task_id,
        completion_date: new Date().toISOString(),
        notes: "Task completed"
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error completing task:", error);
            res.status(500).json(error);
            return;
        }

        res.status(201).json({ message: "Task marked as completed successfully" });
    };

    taskprogressModel.insertSingleProgress(data, callback);
};
//Section B
//createUserpoint


//userpoints s1//Q1
module.exports.createTaskProgressUserPoints = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        points: req.body.points
    }

    const callback = (error, results, fields) => {


        if (error) {
            console.error("Error createUserPoints:", error);
            res.status(500).json(error);
            return;
        }
        next();
    }

    taskprogressModel.insertSingleProgressUserPoint(data, callback);
}

//secB s1 Q1
//select taskprogress by its ID along with user points
module.exports.selectProgressByIdPointsUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readingAllProgresses:", error);
            res.status(500).json(error);
            return;
        }
        else res.status(201).json(results[0]);

    }
    //// Extract progress_id from locals and call the model to select progress details
    const data = {
        progress_id: res.locals.insertId
    }
    taskprogressModel.selectProgressByIdPoints(data, callback);

}

///////////////////////////////////
//Q12
module.exports.ReadTaskprogressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error ReadTaskprogressById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Taskprogress not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    taskprogressModel.selectTaskprogressById(data, callback);
}
////////////////////////////
//Q13

module.exports.updateTaskprogressById = (req, res, next) => {
    if (req.body.notes === undefined) {
        res.status(400).json({
            message: "Bad request: missing notes"
        });
        return;
    }

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes,
    };


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskprogressById:", error);

            if (results && results.affectedRows === 0) {
                res.status(404).json({
                    message: "Taskprogress not found"
                });
            } else {
                res.status(500).json(error);
            }
        } else {

            // Fetch the updated user data after the update
            taskprogressModel.selectTaskprogressById(data, (error, results, fields) => {
                if (error) {
                    console.error("Error fetching updated user data:", error);
                    res.status(500).json(error);
                } else {
                    // Send back the updated user data in the response with a 200 OK status
                    res.status(200).json(results[0]);
                }
            });
        }
    };

    taskprogressModel.updateTaskProgressById(data, callback);
};
//////////////////////////
//Q14
module.exports.deleteTaskprogressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskprogressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Taskprogress not found"
                });
            }
            else res.status(204).send(); // 204 No Content 
        }
    }
    taskprogressModel.deleteById(data, callback);
}
//////////////////////////////
//CA2
module.exports.getTaskprogressUserId = (req,res, next) => {

    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, taskProgressData) => {
        if (error) {
          console.error('Error fetching task progress:', error);
          res.status(500).json({ error: 'Failed to fetch task progress' });
        } else {
          res.json(taskProgressData);
        }
      };
    
      taskprogressModel.gettingTaskprogressData(data, callback);
    };

    ///////////////////////
    //CA2 added
    //CA2
module.exports.getTaskprogressByTaskId = (req,res, next) => {

    const data = {
        task_id: req.params.task_id,
        user_id: res.locals.userId
    }

    const callback = (error, taskProgressData) => {
        if (error) {
          console.error('Error fetching task progress:', error);
          res.status(500).json({ error: 'Failed to fetch task progress' });
        } else {
          res.json(taskProgressData);
        }
      };
    
      taskprogressModel.gettingTaskprogressDataByTaskId(data, callback);
    };


    // //CA2 added
    // module.exports.createNewTaskProgress = (req, res, next) => {
    
    //     const data = {
    //         user_id: res.locals.userId,
    //         task_id: req.body.task_id,
    //         completion_date: req.body.completion_date,
    //         notes: req.body.notes
    //     }
        
        
    //     const callback = (error, results, fields) => {
    //         console.log(results);
    //         if(error) {
    //             console.error("Error createNewTaskProgress:", error);
    //             res.status(500).json(error);
    //         } else {
    //             res.status(201).json({
    //                 progress_id: results.insertId,
    //                 user_id: req.body.user_id,
    //                 task_id: req.body.task_id,
    //                 completion_date: req.body.completion_date,
    //                 notes: req.body.notes
    //             });
    //         }
    //     }
    //     taskprogressModel.insertSingleProgress(data, callback);
    // }
    
    // module.exports.insertSingleProgress = (data, callback) =>
    // {
    //     const SQLSTATMENT = `
    //     INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    //     VALUES (?, ?, ?, ?);`
    //     ;
    // const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    
    // pool.query(SQLSTATMENT, VALUES, callback);
    // }