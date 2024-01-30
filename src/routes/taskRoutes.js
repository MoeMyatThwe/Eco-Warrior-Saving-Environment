const express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post('/', taskController.createNewTask);//Q6
router.get('/', taskController.readAllTasks);//Q7
router.get('/:task_id', taskController.readTaskById);//Q8
router.put('/:task_id', taskController.updateTaskById);//Q9
router.delete('/:task_id',taskController.deleteTaskById);//Q10

module.exports = router;