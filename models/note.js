const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: String,
    flatName: String,
    sharpName: String,
    noteNumber: Number,
    frequency: [Number]
});


module.exports = mongoose.model('Note', noteSchema);
