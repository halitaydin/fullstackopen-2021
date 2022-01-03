import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors')
  };

  if (!token) {
    return page === "login" ? (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
        <div>
          <LoginForm
            show={page === "login"}
            setToken={setToken}
            setError={notify}
            setPage={setPage}
          />
        </div>
      </div>
    ) : (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
        <div>
          <Notify errorMessage={errorMessage} />
          <Authors show={page === "authors"} notify={notify} />
          <Books
            show={page === "books"}
            setError={errorMessage}
            setToken={setToken}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} notify={notify} />
      <Books
        show={page === "books"}
        setError={errorMessage}
        setToken={setToken}
      />
      <NewBook show={page === "add"} notify={notify} setPage={setPage} client={client} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
