const express = require('express');
const router = express.Router();
const magicalitemshopController = require("../controllers/magicalitemshopController");

router.post('/:user_id',
    magicalitemshopController.ValidateUserItemExistence,//to validate if the user and item in the request body exist
    magicalitemshopController.checkUserPoints,//to check if user has enough points to buy the item
    magicalitemshopController.checkItemPrice,//to check the price of the item
    magicalitemshopController.deductPoints,//to deduct points from the user after purchasing item
    magicalitemshopController.addToUserInventory);//to add the purchsed item to the user's inventory


router.get('/', magicalitemshopController.ReadAllMagicalitem);

module.exports = router;