import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const TableLoading = ({children}) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell >Loading...</TableCell>
    </TableRow>
  )
}

const TableHeaders = ({children}) => {
  return (
      <TableHead>
        <TableRow>
          {children}
        </TableRow>
      </TableHead>
    )
}

export default function StickyHeadTable(props) {
  const { headers, rows, objectClickCallback, ...other } = props
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (!rows){
    return (<div>loading...</div>)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
            <TableHeaders>
              {headers.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableHeaders>
          <TableBody>
            {
              (rows.length >= 1) 
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {
                      headers.map((column, i) => {
                        const value = row[column.id];
                        if(i === 0){
                          return (
                            <TableCell key={column.id} align='center'>
                              <Button variant="outlined" onClick={() => { objectClickCallback(row.id) } } >Edit: { row.id }</Button>
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })
                    }
                  </TableRow>

                );
              }) 
              :(
                <TableLoading />
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(rows.length) ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}