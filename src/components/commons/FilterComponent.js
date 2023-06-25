import React from "react";
import { Button } from "react-bootstrap";
import { InputGroupUI } from "./InputGroupUI";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <InputGroupUI
      id="search"
      type="text"
      placeholder="Filter table data..."
      value={filterText}
      onChange={onFilter}
      size="sm"
    >
      <Button variant="warning" size="sm" onClick={onClear}>
        X
      </Button>
    </InputGroupUI>
  </>
);

export default FilterComponent;
