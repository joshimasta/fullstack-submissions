import React from "react";
import { useState, useEffect } from "react";
import databaseCommunication from "./services/databaseCommunication";
import "./App.css";
import Notification from "./Notification";
import PersonForm from "./PersonForm";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

const PersonList = ({ persons, filter, setPersons, setNotification }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonListEntry
          key={person.name}
          isHidden={!person.name.toLowerCase().includes(filter.toLowerCase())}
          person={person}
          persons={persons}
          setPersons={setPersons}
          setNotificationMessage={setNotification}
        ></PersonListEntry>
      ))}
    </div>
  );
};
const PersonListEntry = ({ person, isHidden, setPersons }) => {
  return (
    <div style={{ display: isHidden ? "none" : null }}>
      <p>
        {`${person.name}, ${
          person.number ? person.number : "no known number"
        } `}
        <button
          onClick={() => {
            databaseCommunication
              .deletePerson(person.id, person.name)
              .then(() => {
                databaseCommunication
                  .getPersons()
                  .then((data) => setPersons(data));
              })
              .catch((reason) => {
                // eslint-disable-next-line
                if (reason != "Operation cancelled")
                  console.warn("error: ", reason);
              });
          }}
        >
          delete
        </button>
      </p>{" "}
    </div>
  );
};
//npx json-server --port 3001 --watch db.json
const App = () => {
  const [persons, setPersons] = useState([]); // overridden with useEffect later
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    databaseCommunication.getPersons().then((data) => setPersons(data));
  }, []);

  const addPersonOnClick = (event) => {
    event.preventDefault();

    const alreadyInPhonebook = persons.findIndex(
      (person) => person.name === newName
    );

    if (alreadyInPhonebook !== -1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to update the number?`
        )
      ) {
        databaseCommunication
          .updateNumber(
            persons[alreadyInPhonebook].id,
            persons[alreadyInPhonebook].name,
            newNumber
          )
          .then(() =>
            databaseCommunication.getPersons().then((data) => setPersons(data))
          )
          .catch((error) => {
            if (error.message === "Request failed with status code 404") {
              setNotification({
                message: "modified person does not exist in the database",
                type: "error",
              });
              setTimeout(() => setNotification(null), 5000);
            } else {
              return;
              //throw error; // it is thrown anyways
            }
          });
        return;
      } else {
        return;
      }
    }

    setPersons(persons.concat([{ name: newName, number: newNumber }]));
    setNewName("");
    setNewNumber("");
    databaseCommunication.addPerson(newName, newNumber).then(() => {
      setNotification({
        message: `Added person ${newName}`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      databaseCommunication.getPersons().then((data) => setPersons(data));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}></Notification>
      <Filter filter={filter} setFilter={setFilter}></Filter>

      <h2>Add New</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPersonOnClick={addPersonOnClick}
      ></PersonForm>

      <h2>Numbers</h2>
      <PersonList
        setPersons={setPersons}
        setNotification={setNotification}
        persons={persons}
        filter={filter}
      ></PersonList>
    </div>
  );
};

export default App;
