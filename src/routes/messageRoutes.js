// const express = require('express');
// const router = express.Router();

// const controller = require('../controllers/messageController');

// router.get('/', controller.readAllMessage);
// router.get('/withUserName',controller.readMessage);
// router.post('/newMessage', controller.createMessage);
// router.get('/:id', controller.readMessageById);
// router.put('/:id', controller.updateMessageById);
// router.delete('/:id', controller.deleteMessageById);

// module.exports = router;

//////////////////////////////

// const express = require('express');
// const router = express.Router();

// const controller = require('../controllers/messageController');

// router.get('/', controller.readAllMessage);
// router.post('/', controller.createMessage);
// router.get('/:id', controller.readMessageById);
// router.put('/:id', controller.updateMessageById);
// router.delete('/:id', controller.deleteMessageById);

// module.exports = router;
/////////////////////////////////////

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', jwtMiddleware.verifyToken, messageController.readMessages);//CA2 read messages
router.post('/', jwtMiddleware.verifyToken, messageController.sendMessages);//CA2 create messages
router.delete('/:message_id',messageController.deleteMessages);//CA2 delete message
router.put('/:message_id', messageController.updateMessageById);// CA2 update message

module.exports = router;