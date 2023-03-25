const mongoose = require("mongoose");
// import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const item = mongoose.Schema({
  details: String,
  status: Boolean,
  type: String,
  assignTo: String
});

const itemDB = mongoose.model("item", item);

module.exports =  itemDB;