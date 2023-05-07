const router = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");

router.get("/", async (request, response) => {
	const { id } = request.params;

	const comments = await Comment.find({ blog: id });

	response.json(comments);
});

router.post("/", async (request, response) => {
	const { message } = request.body;
	const { id } = request.params;

	const comment = new Comment({
		message,
		blog: id,
	});

	let createdComment = await comment.save();

	response.status(201).json(createdComment);
});

module.exports = router;
