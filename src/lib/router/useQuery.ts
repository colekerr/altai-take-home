import React from "react";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  const { search } = useLocation();

  const id = search.split("?")[1].split("=")[1];
  console.log("useQuery", { search, id });
  return id;
};

export default useQuery;
