//Moe Myat Thwe 2340362 DIT/FT/1B/05
const magicalitemshopModel = require("../models/magicalitemshopModel.js");

module.exports.ReadAllMagicalitem = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error ReadAllMagicalitem:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    magicalitemshopModel.selectAllItems(callback);
}

module.exports.ValidateUserItemExistence = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        item_id: req.body.item_id
    };
    if (!data.item_id) {
        return res.status(400).json({
            message: "Item ID is required in the request body."
        })

    }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (!results || results.length === 0) {
            res.status(404).json({ message: "User or item not found" });
            return;
        }
        next();
    }
    magicalitemshopModel.validateuseritem(data, callback);
}

//checkenoughmoney
module.exports.checkUserPoints = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
    };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (!results || results.length === 0) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const userPoints = results[0].total_points;
        req.userPoints = userPoints;
        next();

    };
    magicalitemshopModel.checkuserpoints(data, callback);
}

module.exports.checkItemPrice = (req, res, next) => {
    const data = {
        item_id: req.body.item_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }

        if (!results || results.length === 0) {
            res.status(404).json({
                message: "Item price not found"
            });
            return;
        }
        const itemPrice = results[0].price;

        if (req.userPoints >= itemPrice) {
            next();
        } else {
            res.status(400).json({
                message: "Insufficient points for the purchase"
            });
        }
    };

    magicalitemshopModel.getItemPrice(data, callback);
}

module.exports.deductPoints = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        item_id: req.body.item_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(500).json({
                message: "Failed to deduct points"

            });
            return;
        }

        next();
    };
    magicalitemshopModel.deductPoints(data, callback);
};

module.exports.addToUserInventory = (req, res, next) => {

    const data = {
        user_id: req.params.user_id,
        item_id: req.body.item_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(500).json({
                message: "Failed to add item to UserIventory"
            });
            return;
        }
        else {
            res.status(201).json({ message: "User Bought Item Successfully", userItemDetails: results[1][0] });

        }

        next()
    };
    magicalitemshopModel.addToUserInventory(data, callback);
}