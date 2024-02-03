const express = require('express');
const router = express.Router();
const taskprogressController = require("../controllers/taskprogressController");

const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post('/complete/:task_id', taskprogressController.ValidateUserExistence,
    taskprogressController.ValidateTaskExistence,
    taskprogressController.createNewTaskprogress,
    taskprogressController.createTaskProgressUserPoints,
    taskprogressController.selectProgressByIdPointsUser);//CA2 secB
router.post('/', taskprogressController.ValidateUserExistence,
    taskprogressController.ValidateTaskExistence,
    taskprogressController.createNewTaskprogress,
    taskprogressController.createTaskProgressUserPoints,
    taskprogressController.selectProgressByIdPointsUser);//Q11
router.get('/:progress_id', taskprogressController.ReadTaskprogressById);//Q12
router.get('/:user_id',taskprogressController.getTaskprogressUserId);//CA2 added
router.put('/:progress_id', taskprogressController.updateTaskprogressById);//Q13
router.delete('/:progress_id', taskprogressController.deleteTaskprogressById);//Q13
router.get('/:user_id/:task_id',jwtMiddleware.verifyToken,taskprogressController.getTaskprogressByTaskId);//CA2 added
module.exports = router;