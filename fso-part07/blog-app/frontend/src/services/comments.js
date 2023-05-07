import axios from "axios";

const getCommentsUrl = (blogId) => {
	return `/api/blogs/${blogId}/comments`;
};

const getAll = async (blogId) => {
	const url = getCommentsUrl(blogId);
	const request = await axios.get(url);
	return request.data;
};

const create = async (blogId, comment) => {
	const url = getCommentsUrl(blogId);
	const request = await axios.post(url, comment);
	return request.data;
};

export default { getAll, create };
