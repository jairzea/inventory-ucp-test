import { Form, InputGroup } from "react-bootstrap";

export const InputGroupUI = ({ children, ...props }) => {
  return (
    <InputGroup className="mb-3" style={{ width: "200px" }}>
      <Form.Control {...props} aria-describedby="input-group-addon" />
      {children}
    </InputGroup>
  );
};