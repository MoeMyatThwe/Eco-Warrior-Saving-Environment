// Moe Myat Thwe 2340362 DIT/FT/1B/05

const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middlewares/jwtMiddleware.js');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware.js');
const userController = require('../controllers/userController.js');


const userRoutes = require('./userRoutes.js');
router.use("/users", jwtMiddleware.verifyToken,userRoutes);

const taskRoutes = require('./taskRoutes.js');
router.use("/tasks", jwtMiddleware.verifyToken,taskRoutes);

const taskprogressRoutes = require('./taskprogressRoutes.js');
router.use("/task_progress", jwtMiddleware.verifyToken, taskprogressRoutes);

const magicalitemshopRoutes = require('./magicalitemshopRoutes.js');
router.use("/magical_item_shop", jwtMiddleware.verifyToken,magicalitemshopRoutes);

const teamRoutes = require('./teamRoutes.js');
router.use("/team", jwtMiddleware.verifyToken,teamRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

const messageRoutes = require('./messageRoutes.js');
router.use("/messages", messageRoutes);

module.exports = router;