import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CompanySearchResult } from "../../../../lib/query/getCompanySearchQuery";
import { COMPANY_SUPPLIERS_ROUTE } from "../../../../lib/router/constants";

import css from "./index.module.css";

type History = ReturnType<typeof useHistory>;

type SearchResultsProps = {
  searchResults?: {
    data: CompanySearchResult[];
    error: string;
    isLoading: boolean;
  };
};

const buildResultRows = (
  results: CompanySearchResult[],
  history: History
): JSX.Element[] => {
  return results.map((curResult, curResultIdx) => {
    return (
      <tr key={curResultIdx}>
        <td>{curResult.altana_canon_id}</td>
        <td>{curResult.company_name}</td>
        <td>
          <button
            onClick={() => {
              history.push(
                `${COMPANY_SUPPLIERS_ROUTE}/${curResult.altana_canon_id}`
              );
            }}
          >🔍</button>
        </td>
      </tr>
    );
  });
};

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { searchResults } = props;

  console.log("SearchResults searchResults", searchResults);
  const history = useHistory();

  const shouldShowNoResults =
    !searchResults?.error &&
    !searchResults?.isLoading &&
    !searchResults?.data?.length;

  return (
    <Table className={css.table} striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Preview Suppliers</th>
        </tr>
      </thead>
      <tbody>
        {searchResults?.isLoading && (
          <tr>
            <td className={css.tdNoResults}>Loading...</td>
          </tr>
        )}
        {!!searchResults?.data?.length &&
          buildResultRows(searchResults.data, history)}
        {shouldShowNoResults && (
          <tr>
            <td className={css.tdNoResults}>No results</td>
          </tr>
        )}
        {/* TODO: initial state (no query done yet) */}
      </tbody>
    </Table>
  );
};

export default SearchResults;
