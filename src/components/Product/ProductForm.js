import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Para generar identificadores únicos
import { useProductStore } from "../../hooks/useProductStore";
import { InputUI } from "../commons/InputUI";
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect } from "react";
import { Save, X } from "react-bootstrap-icons";
import { notifySuccess } from "../utils/notifySuccess";
import { ToastUI } from "../commons/ToastUI";
import { tooltip } from "../commons/Tooltip";

// Componente para el formulario de creación/edición de productos
export const ProductForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const {
    products,
    addProduct,
    productToEdit,
    setProductToEdit,
    updateProduct,
  } = useProductStore();

  const onSubmit = (data) => {
    // Genera un nuevo código basado en los existentes
    const maxCode = products?.reduce(
      (prev, curr) => Math.max(prev, curr?.code),
      0
    );
    const newProduct = {
      ...data,
      code: maxCode + 1,
      id: uuidv4(),
      creation: new Date().toISOString(),
    };
    addProduct(newProduct);
    notifySuccess("Product added successfully.");
    reset();
  };

  const onUpdate = () => {
    const { name, id, description, amount } = getValues();
    if(!name){
        setError("name", { message:  "Name is required" });
        return;
    }
    if (!description) {
      setError("description", { message: "Description is required" });
      return;
    } 
    if (!amount) {
      setError("amount", { message: "Amount is required" });
      return;
    } 
    updateProduct(id, getValues());
    notifySuccess("Product updated successfully.");
    reset();
  }

  useEffect(() => {
    if (productToEdit){
        const { name, description, amount, id } = productToEdit;
        setValue("name", name);
        setValue("description", description);
        setValue("amount", amount);
        setValue("id", id);
    }
  }, [productToEdit]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <OverlayTrigger placement="top" overlay={tooltip("Name")}>
          <Col>
            <InputUI
              name="Name"
              type="text"
              register={register}
              required
              placeholder="Enter name"
              onChange={() => clearErrors("name")}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </Col>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip("Description")}>
          <Col>
            <InputUI
              name="Description"
              type="text"
              register={register}
              required
              placeholder="Enter description"
              onChange={() => clearErrors("description")}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </Col>
        </OverlayTrigger>
      </Row>
      <Row>
        <OverlayTrigger placement="top" overlay={tooltip("Amount")}>
          <Col>
            <InputUI
              className="mt-3"
              name="Amount"
              type="number"
              register={register}
              required
              placeholder="Enter amount"
              onChange={() => clearErrors("amount")}
            />
            {errors.amount && (
              <p className="text-danger">{errors.amount.message}</p>
            )}
          </Col>
        </OverlayTrigger>
        <Col>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            {productToEdit?.id ? (
              <Button variant="success" onClick={onUpdate}>
                <Save /> Edit
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                <Save /> Save
              </Button>
            )}

            <Button
              variant="danger"
              onClick={() => (setProductToEdit({}), reset())}
            >
              <X /> Clear
            </Button>
          </div>
        </Col>
      </Row>
      <ToastUI />
    </Form>
  );
};
