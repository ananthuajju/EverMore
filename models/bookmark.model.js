import mongoose from "mongoose";
require("mongoose-type-url");



const bookmarkSchema = new mongoose.Schema({
	userId: String,
	url: {
		type: mongoose.SchemaTypes.Url,
	},
	title: String,
	description: String,
	date: Date,
});

const bookmark = mongoose.model("bookmark", bookmarkSchema);

export default bookmark;
