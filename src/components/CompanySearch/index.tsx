import React from "react";
import { Form } from "react-bootstrap";

import SearchResults from "./subcomponents/SearchResults";

type CompanySearchProps = {
  searchCompanyResults: any; // FIXME: make type for this
  setSearchCompanyName: (companyName: string) => void;
};

const CompanySearch: React.FC<CompanySearchProps> = (props) => {
  const { setSearchCompanyName, searchCompanyResults } = props;

  return (
    <>
      <h1>Company Suppliers Page</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Company by Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(evt) => {
              // TODO: if API call is expensive in any way, change to onSubmit
              setSearchCompanyName(evt.target.value);
            }}
            placeholder="e.g. NORTHFACE"
          />
        </Form.Group>
      </Form>
      <SearchResults searchResults={searchCompanyResults} />
    </>
  );
};

export default CompanySearch;
