var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var counterSchema = new Schema({
    counterId: String,
    counterValue: Number
});

module.exports = mongoose.model('Counter', counterSchema);