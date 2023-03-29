import axios from "axios";
const mainUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(mainUrl);

const create = (newObj) => axios.post(mainUrl, newObj);

export default { getAll, create };
