import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useProductStore } from "../../hooks/useProductStore";
import FilterComponent from "../commons/FilterComponent";
import { ActionTable } from "../commons/ActionsTable";
import { ToastUI } from "../commons/ToastUI";
import { notifySuccess } from "../utils/notifySuccess";
import { confirmationAlert } from "../utils/confirmationAlert";

export const ProductTable = () => {
  const { products, deleteProduct, setProductToEdit } = useProductStore();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredProducts = products.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    { name: "Code", selector: (row) => row?.code, sortable: true },
    { name: "Nombre", selector: (row) => row?.name, sortable: true },
    {
      name: "Description",
      selector: (row) => row?.description,
      style: {
        maxWidth: "200px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    { name: "Amount", selector: (row) => row?.amount, sortable: true },
    { name: "Creation", selector: (row) => row?.creation, sortable: true },
    {
      name: "Actions",
      cell: (product) => (
        <ActionTable
          deleted={ async (id) =>{
            confirmationAlert().then((isDeleted) => {
                if(isDeleted){
                    notifySuccess("Product removed successfully.")
                    deleteProduct(id);
                }
            });
          }
          }
          product={product}
          edit={setProductToEdit}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        responsive
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "de",
        }}
        noDataComponent="No products available"
        striped
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
      <ToastUI/>
    </div>
  );
};
