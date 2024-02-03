//Moe Myat Thwe 2340362 DIT/FT/1B/05
const userModel = require("../models/userModel.js");

///////////////

//CA1 Q1 p1
//checkduplication
module.exports.checkDuplication = (req, res, next) => {
    const data = {
        email: req.body.email
    }

    if (req.body.username === undefined || req.body.email === undefined) {
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send();
            return;
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Email already exists"
                });
                return;
            } else {
                next();
            }
        }
    }
    userModel.checkEmailDuplication(data, callback);
}
//////////////
//CA1 Q1 p2
module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).send("Error: username is undefined");
        return;
    }
    if (req.body.email == undefined) {
        res.status(400).send("Error: email is undefined");
        return;
    }


    const data = {
        username: req.body.username,
        email: req.body.email,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
            return;
        }
        const data = {
            user_id: results.insertId
        }
        res.locals.insertId = results.insertId;
        next();
    }

    userModel.insertSingleUser(data, callback);
}

//CA1 Q1 p3
//userpoints s1//Q1
//Section B
//createUserpoint

module.exports.createUserPoints = (req, res, next) => {

    const data = {
        user_id: res.locals.insertId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createUserPoints:", error);
            res.status(500).json(error);
            return;
        }
        next();
    }

    userModel.insertSingleUserPoint(data, callback);
}

//CA1 Q1 p4
module.exports.selectUserById = (req, res, next) => {
    const data = {
        user_id: res.locals.insertId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectById:", error);
            res.status(500).json(error);
        }
        console.log(results[0])
        res.status(201).json(results[0]);
    }

    userModel.selectuserById(data, callback);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//prac7 login,register

module.exports.checkUsernameOrEmailExist = (req, res, next) =>
{
    const {username, email} = req.body;
    const data = {
        username: username,
        email: email
    }

    if (!username || !email) {
        res.status(400).json({message: `Hey, must have username and-or email value lah!`});
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in selectByUsernameOrEmail function:", error);
            res.status(500).json(error);
        } else {
            if(results.length > 0) 
            {
                res.status(409).json({
                    message: `Username or email already exists` // Test expects this specified output
                });
            } else {
                next();
            }
        }
    }
    userModel.selectByUsernameOrEmail(data, callback);
}

module.exports.register = (req, res, next) =>
{
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400).json({Error: `Must fill in username, email and password..`});
        return;
    }

    const data = {
        username: username,
        email: email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in register function:", error);
            res.status(500).json(error);
        } else {
            res.locals.message = `User ${username} created successfully.`; // Test expects this specified output
            res.locals.user_id=results.insertId;
            next();
        }
    }
    userModel.insertSingle(data, callback);
}

module.exports.login = (req, res, next) =>
{
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(400).json({Error: `username or passw`});
        return;
    }

    const data = {
        username: username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in login function:", error);
            res.status(500).json(error);
        } else if (results.length == 1) { 
            res.locals.user_id = results[0].user_id;
            res.locals.username = results[0].username;
            res.locals.hash = results[0].password;
            next();
        } else if (results.length > 1) { // too many records with the same username found
            res.status(409).json({message: ` the database table is corrupted due to duplicated users`});
        } else { // record for the specified username not in table
            res.status(404).json({message: `User not found`}); // Test expects this specified output
        }
    }
    userModel.selectUserByUsernameAndPassword(data, callback);
}



//////////////////////////////CA1 Q2///////////////////////////////////////////////////
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    userModel.selectAll(callback);
}
/////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////CA1 Q3///////////////////////////////////
module.exports.readUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    userModel.selectById(data, callback);
}
///////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////
/////////////////////////////////////////////CA2 Q4/////////////////////////////////////////////////////////////
//checkavailability
module.exports.checkAvailability = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        user_id:req.body.user_id
    }

    if (req.body.username === undefined || req.body.email === undefined) {
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).end();
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                res.locals.user_id = data.user_id
                next();
            }
        }
    }

    userModel.selectUserAvilability(data, callback);
}

//CA1 Q4
//update

module.exports.updateUserById = (req, res, next) => {

    const data = {
        user_id: req.body.user_id,
        username: req.body.username,
        email: req.body.email,
        

    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);


            res.status(500).json(error);

        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                // Fetch the updated user data after the update
                userModel.selectById(data, (error, results, fields) => {
                    if (error) {
                        console.error("Error fetching updated user data:", error);
                        res.status(500).json(error);
                    } else {
                        // Send back the updated user data in the response with a 200 OK status
                        res.status(200).json(results[0]);
                    }
                });
            }
        }
    };

    userModel.updateById(data, callback);
};

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////CA1 Q5//////////////////////////////////
module.exports.deleteUserById = (req, res, next) => {
    const data = {
        id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content 
        }
    }
    userModel.deleteById(data, callback);
}
/////////////////////////////////////////////////////////////////

//secB to select user by idea,also can view user point
module.exports.selectByIdwithTotalPoints = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readingAllUsers:", error);
            res.status(500).json(error);
            return;
        }
        else res.status(201).json(results[0]);
    }
    const data = {
        user_id: res.locals.insertId
    }
    userModel.selectByIdwithTotalPoints(data, callback);

}



//Sec B retrieve all user item possession
module.exports.readAllUserItem = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUserItem:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({
                    message: "No user items found",
                });
            }
        }
    }
    userModel.selectAlluseritem(callback);
}
///////////////////////
//sec B retrieve each user item possession

module.exports.readUserItemById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserItemById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    userModel.selectuseritemById(data, callback);
}
////////////////////////////
//secB Team part
//validate if user is already in team
module.exports.ValidateUserInTeam = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                const existingTeamId = results[0].team_id;
                res.status(409).json({
                    message: `User is already in Team ${existingTeamId}`,
                });
            } else {

                next();
            }
        }
    };

    userModel.validateuserinTeam(data, callback);
};
//validate user and team existence
module.exports.ValidateUserTeamExistence = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        team_id: req.body.team_id
    };
    if (!data.team_id) {
        return res.status(400).json({
            message: "Team ID is required in the request body."
        })

    }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (!results || results.length === 0) {
            res.status(404).json({ message: "User or team not found" });
            return;
        }
        next();
    }
    userModel.validateuserteam(data, callback);
}

//add user to team

module.exports.addUserToTeam = (req, res, next) => {

    const data = {
        user_id: req.body.user_id,
        team_id: req.body.team_id,
    };
    console.log(data)
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        next();
    };
    userModel.addusertoteam(data, callback);
}
/////
//get which specific user belong to which team
module.exports.getUserTeamInfo = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUserTeamInfo:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json({ message: "Added user to team successfully", userTeamInfo: results[0] });
        }
    };

    userModel.getuserteam(data, callback);
}

///////////////////////////////////
//CA2 added
module.exports.readCurrentUser = (req, res, next) =>
{
    const data = {
        id: res.locals.userId
    }
    const callback = (error, results, fields) => {
        
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    userModel.selectById(data, callback);
}
/////////////////////////////////////

// //CA2 added
// module.exports.updateUserPoints = (req, res, next) =>
// {

//     const data = {
//         points: res.locals.points,
//         user_id: res.locals.userId
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateUserById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results.affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     message: "User not found"
//                 });
//             }
//             else {
                
//                 next();

//                 // res.status(200).json(results[0])
//             };
//         }
//     }

//     userModel.updatePoints(data, callback);
// }