import axios from "axios";

const getPersons = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const addPerson = (name, number) => {
  return axios
    .post("http://localhost:3001/persons", {
      name,
      number,
    })
    .then((response) => response.data);
};

const updateNumber = (id, name, number) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, {
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
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data);
};

export default { getPersons, addPerson, deletePerson, updateNumber };
