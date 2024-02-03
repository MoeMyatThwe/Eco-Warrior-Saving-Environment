
//Moe Myat Thwe 2340362 DIT FT 1B 05
const messageModel = require("../models/messageModel.js");

//CA2 read messages
module.exports.readMessages = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessages:", error);
            res.status(500).json(error);
        }
        else res.status(200).json([results, res.locals.userId]);
    }
    messageModel.selectAllMessage(callback);
}

//CA2 create messages
module.exports.sendMessages = (req, res, next) => {
    const user_id = res.locals.userId;

    const data = {
        message: req.body.message,
        user_id: user_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error sending messages:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results)
        }
    }
    messageModel.insertSingle(data, callback)
}

//CA2 delete message
module.exports.deleteMessages = (req, res, next) => {
    const data = {
        id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(204).send();
        }
    }

    messageModel.deleteById(data, callback);
}

// CA2 update message
module.exports.updateMessageById = (req, res, next) => {

    const data = {
        id: req.params.message_id,
        message: req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(204).send();
        }
    }

    messageModel.updateById(data, callback);
}