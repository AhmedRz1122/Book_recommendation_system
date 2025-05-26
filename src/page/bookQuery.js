import { createContext } from "react";

export const bookQuery = createContext({
    query: '',
    setQuery: () => {},
});

export const BookContext = createContext({
  books: [],
  setBooks: () => {},
});