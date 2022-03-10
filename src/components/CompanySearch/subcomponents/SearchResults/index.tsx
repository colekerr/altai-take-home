import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import css from "./index.module.css";

type History = ReturnType<typeof useHistory>;

type SearchResult = {
  altana_canonical_id: string;
  company_name: string;
};

type SearchResultsProps = {
  searchResults?: any[];
};

const buildResultRows = (
  results: SearchResult[],
  history: History
): JSX.Element[] => {
  return results.map((curResult, curResultIdx) => {
    return (
      <tr key={curResultIdx}>
        <td>{curResult.altana_canonical_id}</td>
        <td>{curResult.company_name}</td>
        <td>
          <button
            onClick={() => {
              history.push("/home");
            }}
          ></button>
        </td>
      </tr>
    );
  });
};

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { searchResults } = props;

  const history = useHistory();

  const shouldShowResults = searchResults && searchResults.length;

  return (
    <>
      <Table className={css.table} striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Suppliers</th>
          </tr>
        </thead>
        <tbody>
          {shouldShowResults ? (
            buildResultRows(searchResults, history)
          ) : (
            <tr>
              <td className={css.tdNoResults}>No results</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default SearchResults;
