import { format } from 'date-fns';
import RequestTableDetail from '../RequestTableDetail/RequestTableDetail';
import ColumnFilter from './ColumnFilter';

// Tut for components inside the table
// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

export const COLUMNS = [
  {
    Header: 'Fecha de solicitud',
    accessor: 'order_date',
    // disableFilters: false,
    // Cell: ( { value } ) => { return format( value, 'dd/MM/yyyy' ) },
    Cell: ( { value } ) => { return format( new Date( value) , 'dd/MM/yyyy' ) },
    Filter: ColumnFilter,
  },
  {
    Header: 'Nombre del punto BASE',
    accessor: 'base_name',
    // disableFilters: false,
    Filter: ColumnFilter,
  },
  {
    Header: 'Estado',
    accessor: 'order_state',
    // disableFilters: false,
    Filter: ColumnFilter,
  },
  {
    Header: 'Detalle',
    accessor: 'order_detail',
    disableFilters: true,
    Filter: ColumnFilter,
    Cell: ( { cell: { value } } ) => <RequestTableDetail data={ value } />
  },
  {
    Header: 'Informe',
    accessor: 'order_download',
    disableFilters: true,
    Filter: ColumnFilter,
  },
]