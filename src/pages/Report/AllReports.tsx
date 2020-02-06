import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import React from 'react';

// interfaces
import { Column } from './interface';

// Styles
import './Report.scss';

const columns: Column[] = [
  { id: 'avatar', label: 'Employee', minWidth: 20 },
  { id: 'name', label: 'Name', minWidth: 20 },
  {
    id: 'slack',
    label: 'Slack Time',
    minWidth: 20,
    align: 'right',
    format: (value: number) => value.toLocaleString()
  },
  {
    id: 'bonus',
    label: 'Bonus(₦)',
    minWidth: 20,
    align: 'right',
    format: (value: number) => value.toLocaleString()
  }
];

const Report = ({ records, clearData }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <header className="report__company">
        Powernik Employee Bonus Tme Report
        <Button
          color="secondary"
          onClick={clearData}
          variant="contained"
          className="cursor report__clear"
        >
          Clear data
        </Button>
      </header>
      <Paper className="report__table-container">
        <TableContainer className="report__table">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, indx: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={indx}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="report__pagination"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default Report;
