import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  const Filter = () => {
    const book = books.data.allBooks;
    let filterGenre = book.filter((b) => b.genres.toString().includes(genre));
    if (genre === "all genres") {
      filterGenre = book;
    }
    return (
      <div>
        <h2>books</h2>
        <p>in genre {genre}</p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filterGenre.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const GenreButton = ({ children }) => {
    return <button onClick={() => setGenre(children)}>{children}</button>;
  };

  return (
    <div>
      <Filter />
      <GenreButton>refactor</GenreButton>
      <GenreButton>agile</GenreButton>
      <GenreButton>patterns</GenreButton>
      <GenreButton>design</GenreButton>
      <GenreButton>crime</GenreButton>
      <GenreButton>classic</GenreButton>
      <GenreButton>fantasy</GenreButton>
      <GenreButton>all genres</GenreButton>
    </div>
  );
};

export default Books;
