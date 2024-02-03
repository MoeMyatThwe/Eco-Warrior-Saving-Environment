// const model = require("../models/messageModel.js");

// module.exports.createMessage = (req, res, next) => {
//     if(req.body.message_text == undefined || req.body.message_text == "")
//     {
//         res.status(400).send("Error: message_text is undefined");
//         return;
//     }
//     else if(req.body.user_id == undefined)
//     {
//         res.status(400).send("Error: user_id is undefined");
//         return;
//     }

//     const data = {
//         user_id: req.body.user_id,
//         message_text: req.body.message_text
//     }

//     console.log("data", data);

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error createMessage:", error);
//             res.status(500).json(error);
//         } else {
//             res.status(201).json(results);
//         }
//     }

//     model.insertSingle(data, callback);
// }


// // module.exports.readMessage = (req, res, next) => {
// //     const callback = (error, results, fields) => {
// //         if (error) {
// //             console.error("Error readAllMessage:", error);
// //             res.status(500).json(error);
// //         } else {
// //             // Assuming results contain messages along with usernames
// //             res.status(200).json(results);
// //         }
// //     }

// //     model.selectMessage(callback);
// // }



// module.exports.readMessageById = (req, res, next) => {
//     const data = {
//         id: req.params.id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readMessageById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results.length == 0) 
//             {
//                 res.status(404).json({
//                     message: "Message not found"
//                 });
//             }
//             else res.status(200).json(results[0]);
//         }
//     }

//     model.selectById(data, callback);
// }

// module.exports.readAllMessage = (req, res, next) => {
//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readAllMessage:", error);
//             res.status(500).json(error);
//         } else {
//             res.status(200).json(results);
//         }
//     }

//     model.selectAll(callback);
// }

// module.exports.updateMessageById = (req, res, next) => {
//     if(req.params.id == undefined)
//     {
//         res.status(400).send("Error: id is undefined");
//         return;
//     }
//     else if(req.body.message_text == undefined || req.body.message_text == "")
//     {
//         res.status(400).send("Error: message_text is undefined or empty");
//         return;
//     }
//     else if(req.body.user_id == undefined)
//     {
//         res.status(400).send("Error: userId is undefined");
//         return;
//     }

//     const data = {
//         id: req.params.id,
//         user_id: req.body.user_id,
//         message_text: req.body.message_text
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateMessageById:", error);
//             res.status(500).json(error);
//         } else {
//             res.status(200).json(results);
//         }
//     }

//     model.updateById(data, callback);
// }

// module.exports.deleteMessageById = (req, res, next) => {
//     const data = {
//         id: req.params.id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error deleteMessageById:", error);
//             res.status(500).json(error);
//         } else {
//             res.status(200).json(results);
//         }
//     }

//     model.deleteById(data, callback);
// }


// ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////


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