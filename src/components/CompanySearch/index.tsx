import React from "react";
import { Form } from "react-bootstrap";

import SearchResults from "./subcomponents/SearchResults";
import css from "./index.module.css";

const CompanySearch = () => {
  return (
    <>
      <h2>Company Suppliers Page</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Company by Name</Form.Label>
          <Form.Control type="text" placeholder="e.g. NORTHFACE" />
        </Form.Group>
      </Form>
      <SearchResults />
    </>
  );
};

export default CompanySearch;
