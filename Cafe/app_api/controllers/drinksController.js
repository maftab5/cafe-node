const mongoose = require("mongoose");
const Drinks = mongoose. model('drink');

const createDrinks = (req,res)=> {


    console.log("backend");
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError:private profile"
        });
    } else {

        const drinks = new Drinks();

        drinks.name = req.body.name;
        drinks.category = req.body.category;
        drinks.ingredients = req.body.ingredients;
        drinks.price = req.body.price;
        drinks.description = req.body.description;
        drinks.nutrition = req.body.nutrition;
        drinks.image = req.body.image;

         console.log(drinks);

        drinks.save((err, data) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json(data);
            }
        })

    }
}
    const getDrinks = (req, res) => {
      
            Drinks.find().exec(function (err, drinkData) {
                if (err) {
                    res.status(401).json(err);
                } else {
                    if (drinkData) {
                        res.status(200).json(drinkData);
                    } else {
                        res.status(404).json({
                            "message": " No data found"
                        })
                    }

                }
            })
        }
    
//to get single drinks
const getSingleDrink = (req,res) =>{

        Drinks.findById(req.params.drinkid).exec(function (err, drinkData) {
            if (err) {
                res.status(401).json(err);
            } else {
                if (drinkData) {
                    res.status(200).json(drinkData);
                } else {
                    res.status(404).json({
                        "message": "no data found"
                    })
                }

            }
        })
    }



//update drink
const updateDrinks = (req,res) => {

    if (!req.payload._id) {

        res.status(401).json({
            "message": "UnauthorizedError:No permission"
        });
    } else {

        if (!req.params.drinkid) {
            res.status(400).json({
                "message": "drink is required"
            });
            return;
        }
        Drinks.findById(req.params.drinkid).exec(function (err, drinkData) {

            if (!drinkData) {

                res.status(404).json({
                    "message": "no data found"
                });
            } else if (err) {
                res.status(401).json(err);
            } else {
                drinkData.name = req.body.name;
                drinkData.category = req.body.category;
                drinkData.ingredients = req.body.ingredients;
                drinkData.price = req.body.price;
                drinkData.description = req.body.description;
                drinkData.nutrition = req.body.nutrition;
                drinkData.image = req.body.image;
                drinkData.status = req.body.status;

                drinkData.save(function (err, drinkData) {
                    if (err) {
                        res.status(401).json(err);
                    } else {
                        res.status(200).json(drinkData);
                    }
                })

            }
        })
    }
}

//for product confirm
const confirm = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError:No permission"
        });
    } else {
        if (!req.params.drinkid) {
            res.status(400).json({
                "message": "drink is required"
            });
            return;
        }
        Drinks.findById(req.params.drinkid).exec(function (err, drinkData) {
            if (!drinkData) {
                res.status(404).json({
                    "message": "no data found"
                });
            } else if (err) {
                res.status(401).json(err);
            } else {

                drinkData.status = 1;

                drinkData.save(function (err, drinkData) {
                    if (err) {
                        res.status(401).json(err);
                    } else {
                        res.status(200).json(drinkData);
                    }
                })

            }
        })
    }
}

//delete drink
const deleteDrink = (req,res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError:No permission"
        });
    } else {
        const drinkid = req.params.drinkid;
        if (drinkid) {
            Drinks.findByIdAndRemove(drinkid).exec(function (err, drinkData) {
                if (err) {
                    return res.status.json(err);
                }
                res.status(204).json({
                    "message": "no data found"
                });
            });
        }
    }
}

module.exports = {createDrinks,getDrinks,getSingleDrink,updateDrinks,deleteDrink,confirm};