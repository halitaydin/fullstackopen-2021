import React from "react";
import { connect } from "react-redux";
import { createNote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    props.createNote(content)
    props.showNotification(`you added ${content}`, 5000)
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createNote,
  showNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
