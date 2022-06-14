import axios from "axios";
const BaseUrl = "http://localhost:3001/api/persons"

const getPersons = () => {
  return axios
    .get(BaseUrl)
    .then((response) => response.data);
};

const addPerson = (name, number) => {
  return axios
    .post(BaseUrl, {
      name,
      number,
    })
    .then((response) => response.data);
};

const updateNumber = (id, name, number) => {
  return axios
    .put(`${BaseUrl}/${id}`, {
      name,
      number,
    })
    .then((response) => response.data);
};

const deletePerson = (id, name) => {
  if (name) {
    if (!window.confirm(`delete ${name}`)) return Promise.reject("Operation cancelled")
  }
  return axios
    .delete(`${BaseUrl}/${id}`)
    .then((response) => response.data);
};

export default { getPersons, addPerson, deletePerson, updateNumber };
