import axios from "axios";
const baseUrl = "/api/blogs";

// using alternative way of checking the token from here:
// https://blog.logrocket.com/using-axios-set-request-headers/

axios.interceptors.request.use((config) => {
	const userJSON = window.localStorage.getItem("blogAppUser");
	const token = userJSON ? JSON.parse(userJSON)?.token : null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const response = await axios.post(baseUrl, newObject);
	const fullObject = await axios.get(`${baseUrl}/${response.data.id}`);
	return fullObject.data;
};

const addLike = async (id, newObject) => {
	await axios.put(`${baseUrl}/${id}`, newObject);
	const fullObject = await axios.get(`${baseUrl}/${id}`);
	return fullObject.data;
};

const remove = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`);
	return response;
};

export default { getAll, create, addLike, remove }; // eslint-disable-line
