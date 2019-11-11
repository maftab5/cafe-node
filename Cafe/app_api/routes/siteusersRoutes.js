var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

const auth = jwt({
    secret : "thisIsSecret",
    userProperty : 'payload'
})

var cors = require('cors');
var app = express();

app.use(cors());




const siteUsersCtrl = require('../controllers/siteusersController');
const ctrlAuth =require('../controllers/authentication');
const drinksCtrl = require('../controllers/drinksController');

const contactCtrl = require("../controllers/contact");


//for contact
router.route("/contact")
    .post(contactCtrl.createContact);

//for product confirmation
router.route("/drinks/confirm/:drinkid")
    .put(drinksCtrl.confirm);

// const usersLofinCtrl = require('../userslogin/usersController');
//
// router.route("/login")
//     .post(usersLofinCtrl.authenticate)
//     .get(usersLofinCtrl.getAll);


//routes for drinks
router.route("/drinks")
    .post(auth,drinksCtrl.createDrinks)
    .get(drinksCtrl.getDrinks);


router.route("/drinks/:drinkid")
    .get(drinksCtrl.getSingleDrink)
    .put(auth,drinksCtrl.updateDrinks)
    .delete(auth,drinksCtrl.deleteDrink);


router.route("/users/register")
    .get(siteUsersCtrl.getUsers)
    .post(siteUsersCtrl.createUsers);

router.route("/users/login")
    .post(siteUsersCtrl.login);
router.route("/users/email")
    .post(siteUsersCtrl.sendEmail);
router.route("/users/:userid")
    .get(siteUsersCtrl.getSingleUser)
    .put(siteUsersCtrl.updateuser)
    .delete(auth,siteUsersCtrl.deleteUser);

//routes for authentication
router.post('/register',ctrlAuth.register);
// router.post('/login',ctrlAuth.login);

module.exports = router;
