import React from "react";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addPersonOnClick,
}) => {
  return (
    <form onSubmit={(event) => addPersonOnClick(event)}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        phone number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
