import axios from "axios";
const mainUrl = "/api/persons";

const getAll = () => axios.get(mainUrl);

const create = (newObj) => axios.post(mainUrl, newObj);

const deletePerson = (id) => axios.delete(`${mainUrl}/${id}`);

const editPerson = (id, newObj) => axios.put(`${mainUrl}/${id}`, newObj);

export default { getAll, create, deletePerson, editPerson };
