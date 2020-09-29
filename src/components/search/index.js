import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Search({
  searchTerm,
  onSearch,
  onSearchSubmit,
  loading,
}) {
  return (
    <Form onSubmit={onSearchSubmit}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="search" column sm="2">
          Search:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="search"
            type="text"
            value={searchTerm}
            onChange={onSearch}
          />
        </Col>
        <Button type="submit" disabled={loading || !searchTerm}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
