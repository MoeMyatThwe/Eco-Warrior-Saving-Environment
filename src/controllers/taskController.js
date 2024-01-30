//Moe Myat Thwe 2340362 DIT/FT/1B/05
const taskModel = require("../models/taskModel.js");

//Q6
module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined) {
        res.status(400).send("Error:Bad Request");
        return;
    }
    if (req.body.description == undefined) {
        res.status(400).send("Error:Bad Request");
        return;
    }
    if (req.body.points == undefined) {
        res.status(400).send("Error: Bad Request");
        return;
    }
    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            const getTaskdata = (error, results) => {
                if (error) {
                    console.error("Error getTaskdata:", error);
                    res.status(500).json(error);
                } else {
                    res.status(201).json({ message: "Task Created Successfully", task: results[0] });
                }
            }
            taskModel.gettingTaskData(data, getTaskdata);
        }
    }

    taskModel.insertSingle(data, callback);
}
///////////////////////////////////

//Q7
module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTaks:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    taskModel.selectAll(callback);
}
//Q8
module.exports.readTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    taskModel.selectById(data, callback);
}
////////////////////////////
//Q9
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title === undefined || req.body.description === undefined || req.body.points === undefined) {
        res.status(400).json({
            message: "Missing title or description or points"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);

            if (results && results.affectedRows === 0) {
                res.status(404).json({
                    message: "Task not found"
                });
                return;
            } else {
                res.status(500).json(error);
                return;
            }
        } else {

            // Fetch the updated user data after the update
            taskModel.selectById(data, (error, results, fields) => {
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

    taskModel.updateById(data, callback);
};
///////////////

//Q10
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send(); // 204 No Content 
        }
    }
    taskModel.deleteById(data, callback);
}
//////////////////////////////

