const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://maftab:afsanaa123@nodeapplication-rsic3.mongodb.net/Cafe?retryWrites=true&w=majority';
mongoose.connect(dbURI, {dbName: 'Cafe'});
mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to" +dbURI);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

require("./siteuser");
require("./drinks");
require("./contact");