const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: String,
    firstName: String,
    lastName: String,
    email: String
});

const postUser = mongoose.model('user', userSchema);

module.exports =  postUser; 
