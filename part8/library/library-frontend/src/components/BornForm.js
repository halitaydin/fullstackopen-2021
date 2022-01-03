import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import Select from "react-select";

import { EDIT_BORN } from "../queries";

const BornForm = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn, result] = useMutation(EDIT_BORN, {
    onError: (error) => {
      if (error.graphQLErrors[0]) {
        props.notify(error.graphQLErrors[0].message);
      }
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      const editAuthor = response.data.editAuthor
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataInStore.allAuthors.map((author) =>
            author.name === editAuthor.name ? editAuthor : author
          ),
        },
      })
    }
  });

  const submit = (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, born: parseInt(born) } });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.notify("person not found");
    }
  }, [result.data]); // eslint-disable-line

  const options = props.authors.data.allAuthors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select options={options} onChange={(e) => setName(e.value)} />
        </div>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </div>
        <button type="submit">change born</button>
      </form>
    </div>
  );
};

export default BornForm;
