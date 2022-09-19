import { format } from "date-fns";
import RequestTableDetail from "../RequestTableDetail/RequestTableDetail";
import ColumnFilter from "./ColumnFilter";

// Tut for components inside the table
// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

export const COLUMNS = [
    {
        Header: "Fecha de solicitud",
        accessor: "order_date",
        disableFilters: true,
        // Cell: ( { value } ) => { return format( value, 'dd/MM/yyyy' ) },
        Cell: ({ value }) => {
            return format(new Date(value), "dd/MM/yyyy");
        },
        Filter: ColumnFilter,
    },
    {
        // Header: "Nombre del punto",
        Header: "Nombre del punto",
        accessor: "base_name",
        disableFilters: true,
        Filter: ColumnFilter,
    },
    {
        Header: "Descripción del proyecto",
        accessor: "project",
        disableFilters: true,
        Filter: ColumnFilter,
    },
    {
        Header: "Estado",
        accessor: "order_state",
        disableFilters: true,
        Filter: ColumnFilter,
    },
    {
        Header: "Detalle",
        accessor: "order_detail",
        disableFilters: true,
        Filter: ColumnFilter,
        Cell: ({ cell: { value } }) => <RequestTableDetail data={value} />,
    },
    {
        Header: "Informe",
        accessor: "order_download",
        disableFilters: true,
        Filter: ColumnFilter, // TODO: Aca procesar el ICON STATUS del Informe
    },
];
