import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
        max: 255,
        min: 4
	},
	email: {
		type: String,
        required: true,
        min: 7,
        max: 255
	},
	password: {
		type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("user", userSchema);

export default user;
