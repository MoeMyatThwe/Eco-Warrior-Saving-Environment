
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
//const jwtMiddleware = require('../middlewares/jwtMiddleware.js');

router.get('/user_inventory/:user_id', userController.readUserItemById);//CA1 sec B view each useritem possession
router.get('/user_inventory', userController.readAllUserItem);//CA1 sec B view all useritem possession
//router.get('/:user_id',jwtMiddleware.verifyToken, userController.readUserById);//u can't get userdata unless u log in//from prac7//mmt added:user_id
router.get('/:user_id', userController.readUserById);//CA1 Q3
router.get('/', userController.readAllUser);//CA1 Q2


router.post('/', userController.checkDuplication,
    userController.createNewUser,
    userController.createUserPoints,
    userController.selectUserById);//CA1 Q1
router.post('/user_team', userController.ValidateUserInTeam,
    userController.ValidateUserTeamExistence,
    userController.addUserToTeam,
    userController.getUserTeamInfo);//CA1 sec B add team

router.put('/:user_id', userController.checkAvailability,
    userController.updateUserById);//CA1 Q4 
router.delete('/:user_id', userController.deleteUserById);// CA1 Q5
module.exports = router;
