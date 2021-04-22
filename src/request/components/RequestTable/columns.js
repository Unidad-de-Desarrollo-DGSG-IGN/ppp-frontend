import { format } from 'date-fns';
import ColumnFilter from './ColumnFilter';

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
  },
  {
    Header: 'Descarga',
    accessor: 'order_download',
    disableFilters: true,
    Filter: ColumnFilter,
  },
]