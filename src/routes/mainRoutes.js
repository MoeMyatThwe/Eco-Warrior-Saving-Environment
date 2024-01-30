// Moe Myat Thwe 2340362 DIT/FT/1B/05

const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes.js');
router.use("/users", userRoutes);
const userController = require('../controllers/userController.js');
const exampleController = require('../controllers/exampleController.js');

const jwtMiddleware = require('../middlewares/jwtMiddleware.js');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware.js');

const taskRoutes = require('./taskRoutes.js');
router.use("/tasks", taskRoutes);

const taskprogressRoutes = require('./taskprogressRoutes.js');
router.use("/task_progress", taskprogressRoutes);

const magicalitemshopRoutes = require('./magicalitemshopRoutes.js');
router.use("/magical_item_shop", magicalitemshopRoutes);

const teamRoutes = require('./teamRoutes.js');
router.use("/team", teamRoutes);


router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

module.exports = router;