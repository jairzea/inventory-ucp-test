import { Tooltip } from "react-bootstrap";

export  const tooltip = (label) => {
  return (<Tooltip id="tooltip">
    <strong>{label}</strong>
  </Tooltip>)
};