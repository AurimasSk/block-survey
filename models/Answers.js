//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
    firstName: String,
    lastName: String,
    workplace: String,
    email: String,
    telephone: String,
    transport: String,
    sleeping: String,
    arriveTime: String,
    customArriveTime: String,
    feeding: String,
    rulesAccepted: Boolean,
    safetyAccepted: Boolean
});

module.exports = mongoose.model('Expense', expenseSchema);