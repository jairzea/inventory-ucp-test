import { Form } from "react-bootstrap";

export const InputUI = ({ name, type, register, placeholder, ...props }) => {
  return (
    <Form.Group controlId="formNombre">
      {!placeholder && <Form.Label>{name}</Form.Label>}
      <Form.Control
        type={type}
        required
        placeholder={placeholder}
        {...register(name?.toLowerCase())}
        {...props}
      />
    </Form.Group>
  );
};