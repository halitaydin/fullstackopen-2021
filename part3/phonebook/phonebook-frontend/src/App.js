import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilteredName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.map((person) => person.name).includes(newName)) {
      const indexSameNamePerson = persons
        .map((person) => person.name)
        .indexOf(newName);
      const id = persons[indexSameNamePerson].id;
      const person = persons.find((n) => n.id === id);
      const changedNum = { ...person, number: newNumber };
      if (
        window.confirm(
          `${person.name} is already added the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, changedNum)
          .then(() => {
            personService.getAll().then((initialPersons) => {
              setPersons(initialPersons);
              setNewName("");
              setNewNumber("");
              setSuccessMessage(`${person.name} number has changed`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
            });
          })
          .catch((error) => {
            setErrorMessage(
              `${error.response.data.error}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
    } else if (persons.map((person) => person.number).includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      personService.create(nameObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${nameObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }).catch(error => {
        // this is the way to access the error message
        // console.log(error.response.data)
        setErrorMessage(
          `${error.response.data.error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
    }
  };

  const deleteHandler = (id) =>
    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => id !== person.id)));

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilteredName(event.target.value);

  const results = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons results={results} deletePerson={deleteHandler} />
    </div>
  );
};

export default App;
