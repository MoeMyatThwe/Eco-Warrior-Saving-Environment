// Moe Myat Thwe 2340362 DITFT1B05

const model = require("../models/playerModel.js");

module.exports.readAllPlayer = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

module.exports.readPlayerById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    model.selectById(data, callback);
}

module.exports.createNewPlayer = (req, res, next) => // original createNewPlayer from notes
{
    if(req.body.name == undefined)
    {
        res.status(400).send("Error: name is undefined");
        return;
    }
    const data = {
        name: req.body.name,
        level: 1 // hardcoded value of 1
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    model.insertSingle(data, callback);
}

// unit_5_practical Advanced Exercises Task1
module.exports.createNewPlayerForExistingUser = (req, res, next) =>
{
    if(req.body.name == undefined)
    {
        res.status(400).send("Error: name is undefined");
        return;
    }
    const data = {
        name: req.body.name,
        level: 1
    }

    // data validation is usually expected. Put in all data validation to help 
    // prevent wrong data causing your server to malfunction.
    if (req.body.level != undefined && !isNaN(parseInt(req.body.level))) // tidy the code yourself, ok?
    {
        data.level = parseInt(req.body.level); // data validation expected
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayerForExistingUser:", error);
            res.status(500).json(error);
        } else {
            // response object "res" contains many variables
            // if you insert your own variable into res, it sometimes clash with another
            // res object has a special place called "locals"
            // locals is kinda like a blank space,
            // so putting your variables there is safe from clashing with others
            res.locals.player_id = results.insertId;
            next();
            // endpoints are those typically with res.sendStatus(), res.json(), res.send(), res.end()
        }
    }
    model.insertSingle(data, callback);
}

module.exports.updatePlayerById = (req, res, next) =>
{
    if(req.body.name == undefined || req.body.level == undefined)
    {
        res.status(400).json({
            message: "Error: name or level is undefined"
        });
        return;
    }
    const data = {
        id: req.params.id,
        name: req.body.name,
        level: req.body.level
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }
    model.updateById(data, callback);
}

module.exports.deletePlayerById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(204).send(); // 204 No Content 
        }
    }
    model.deleteById(data, callback);
}


// Commonly used by many and it is the same as above way of coding
// module.exports = {
//     readAllPlayer : (req, res, next) =>
//     {
//         const callback = (error, results, fields) => {
//             if (error) {
//                 console.error("Error readAllPlayer:", error);
//                 res.status(500).json(error);
//             } 
//             else res.status(200).json(results);
//         }
//         model.selectAll(callback);
//     },

//     readPlayerById : (req, res, next) =>
//     {
//         const data = {
//             id: req.params.id
//         }
//         const callback = (error, results, fields) => {
//             if (error) {
//                 console.error("Error readPlayerById:", error);
//                 res.status(500).json(error);
//             } else {
//                 if(results.length == 0) 
//                 {
//                     res.status(404).json({
//                         message: "Player not found"
//                     });
//                 }
//                 else res.status(200).json(results[0]);
//             }
//         }
//         model.selectById(data, callback);
//     }
// }