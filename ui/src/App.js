import React from "react";
import { useState, useEffect, useRef } from "react";
// import { createNote, toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector } from "react-redux";
// import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/login";
import loginService from "./services/login";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/togglable";
import { Table } from "react-bootstrap";

const App = () => {
  // const dispatch = useDispatch()
  // const notes = useSelector((state) => state);

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const hookGetNotesFromServer = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const hookGetLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  };

  const handeLogout = async () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser();
  };

  const handleLogin = async (userObject) => {
    const { username, password } = userObject;
    console.log("logging in with", username);
    console.log("logging in with", password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("🚀 ~ file: App.js:49 ~ handleLogin ~ user:", user);

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      window.sessionStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      console.log("🚀 ~ file: App.js:57 ~ handleLogin ~ exception:", exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(hookGetNotesFromServer, []);
  useEffect(hookGetLoggedInUser, []);

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    const returnedNote = await noteService.create(noteObject);
    console.log("🚀 ~ file: App.js:74 ~ addNote ~ returnedNote:", returnedNote);
    setNotes([...notes, returnedNote]);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const noteFormRef = useRef();
  return (
    <div className="container">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      )}
      {user && (
        <div>
          <hr />
          <p>{user.name} logged in</p>
          <button onClick={handeLogout}>Logout</button>
          {
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          }
          <hr />
        </div>
      )}
      <div>
        <hr />
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
        <hr />
      </div>
      <hr />
      <Table striped>
        <tbody>
          {notesToShow.map((note) => (
            <tr key={note.id}>
              <td>
                <div>{note.content}</div>
              </td>
              <td>{note.user?'':'s'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <hr />
      <hr />
      <Footer />
      <hr />
    </div>
  );
};

export default App;
