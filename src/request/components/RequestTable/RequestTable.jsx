import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';

import { COLUMNS } from './columns';
import GlobalFilter from './GlobalFilter';

const RequestTable = ( { data } ) => {

  const columns = useMemo( ( ) => COLUMNS, [ ] );
  const tableData = useMemo( ( ) => data, [ data ] );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable({
    columns: columns,
    data: tableData,
    // initialState: { pageIndex: 0 },
  }, useFilters, useGlobalFilter, useSortBy, usePagination );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
      <div className='table-container' >
        <div className='table__header' >
          <span>
            <span>Mostar </span>
            <select
            className='select-page-size'
                value={ pageSize } 
                onChange={ e => setPageSize( Number( e.target.value ) ) } 
              >
                {
                  [ 10 , 25, 50 ].map( pageSize => (
                    <option key={ pageSize } value={ pageSize } >
                      { pageSize } 
                    </option>
                  ))
                }
            </select>
            <span> registros</span>
          </span>
          {/* <GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } /> */}
        </div>

        <table { ...getTableProps( ) }>
          <thead>
            {
              headerGroups.map( headerGroup => (
                <tr { ...headerGroup.getHeaderGroupProps( ) }>
                  {
                    headerGroup.headers.map( column => (
                      <th { ...column.getHeaderProps( column.getSortByToggleProps( ) ) }>
                        { column.render( 'Header' ) }
                        <span>
                          { column.isSorted ? ( column.isSortedDesc ? ' >' : ' <' ) : ' ' }
                        </span>
                        <div>{ column.canFilter ? column.render( 'Filter' ) : null }</div>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody { ...getTableBodyProps( ) }>
            {
              page.map( row => {
                prepareRow( row );
                return (
                  <tr { ...row.getRowProps( ) }>
                    {
                      row.cells.map( cell => {
                        return <td { ...cell.getCellProps( ) }>{ cell.render('Cell')}</td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
          {/* <tfoot>
            <tr>
              
            </tr>
          </tfoot> */}
        </table>
        <div className='table__footer' >
          <span>
            <span>
              Pagina { ' ' }
              <strong>
                { pageIndex + 1  } de { pageOptions.length }
              </strong>{ ' ' }
            </span>
            <span>
              | Ir a la página: { ' ' } 
              <input 
                type='number' 
                defaultValue={ pageIndex + 1 } 
                onChange={ e => { 
                  const pageNumber = e.target.value ? Number( e.target.value ) - 1 : 0;
                  gotoPage( pageNumber );
                }} 
              />
            </span>
          </span>
          
          <span>
            <button className='btn btn--NoMargin' onClick={ ( ) => gotoPage( 0 ) } disabled={ !canPreviousPage } >{ '<<' }</button>
            <button className='btn btn--NoMargin' onClick={ ( ) => previousPage( ) } disabled={ !canPreviousPage } >Anterior</button>
            <button className='btn btn--NoMargin' onClick={ ( ) => nextPage( )} disabled={ !canNextPage } >Siguiente</button>
            <button className='btn btn--NoMargin' onClick={ ( ) => gotoPage( pageCount - 1 ) } disabled={ !canNextPage } >{ '>>' }</button>
          </span>
        </div>
      </div>
  )
}

export default RequestTable;
