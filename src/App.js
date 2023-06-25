import React from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductTable } from './components/Product/ProductTable';
import { ProductForm } from './components/Product/ProductForm';

// Componente principal de la aplicación
const App = () => {
  return (
    <Container>
      <h2 className="mt-2">Product Management</h2>
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title>Create Product</Card.Title>
          <ProductForm />
        </Card.Body>
      </Card>
      <hr />
      <h3>Product List</h3>
      <ProductTable />
    </Container>
  );
};

export default App;
