import { Button, ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";

export const ActionTable = ({ deleted, edit, product }) => {
  return (
    <ButtonGroup>
      <Button variant="danger" onClick={() => deleted(product?.id)}>
        <Trash />
      </Button>
      <Button variant="success" onClick={() => edit(product)}>
        <Pencil />
      </Button>
    </ButtonGroup>
  );
};