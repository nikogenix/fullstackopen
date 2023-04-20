import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(`${baseUrl}?_sort=votes&_order=desc`);
	return response.data;
};

const getOne = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data;
};

const createNew = async (content) => {
	const object = { content, votes: 0 };
	const response = await axios.post(baseUrl, object);
	return response.data;
};

const incrementVote = async (id) => {
	const object = await getOne(id);
	const newObject = { ...object, votes: ++object.votes };
	const response = await axios.put(`${baseUrl}/${object.id}`, newObject);
	return response.data;
};

export default { getAll, createNew, incrementVote };
