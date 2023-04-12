const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		if (returnedObject.likes === undefined) returnedObject.likes = 0;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
