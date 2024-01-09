const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,	
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const NumberSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
});

const Todo = mongoose.model("Todo", TodoSchema);
const NumberModel = mongoose.model("Number", NumberSchema);

module.exports = { Todo, NumberModel };
