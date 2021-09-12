import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DoneIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

//set some style classes 
const useStyles = makeStyles({
  root: {
    alignSelf: "center",
    marginLeft: "10%",

    width: "80%",
    backgroundColor: "gray",
  },
  container: {
    maxHeight: 750,
  },
  head: {
    backgroundColor: "#151515",
    color: "#fff",
  },
  row: {
    backgroundColor: "#515151",
    color: "#fff",
  },
  paging: {
    backgroundColor: "#212121",
    color: "#fff",
  },
});

// the component code here 
export default function StickyHeadTable() {
  const classes = useStyles();
  // states of the component for the pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // the array of the header names 
  const columns = [
    { id: "userId", label: "User Id", minWidth: 170 },
    { id: "id", label: "ID", minWidth: 100 },
    {
      id: "title",
      label: "Title",
      minWidth: 170,
      align: "right",
    },
    {
      id: "completed",
      label: "Completed",
      minWidth: 170,
      align: "right",
    },
  ];

// state for holding and updating the table data 
  const [rows, setRows] = useState([]);

  // bool type checker for the rendering
  const isBoolean = (val) => "boolean" === typeof val;

  // handeling the pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect hook to fetching the data from the api after the initial render ( better performance )
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
//setting the data in the state for re rendering 
      setRows(data);
    };
    fetchData();
  }, []);
// rendering jsx 
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.head}
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return !isBoolean(value) ? (
                        <TableCell
                          className={classes.row}
                          key={column.id}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      ) : value ? (
                        <TableCell
                          className={classes.row}
                          key={column.id}
                          align={column.align}
                        >
                          <DoneIcon
                            style={{ color: "#7dd87d", fontSize: 40 }}
                          ></DoneIcon>
                        </TableCell>
                      ) : (
                        <TableCell
                          className={classes.row}
                          key={column.id}
                          align={column.align}
                        >
                          <CancelIcon
                            style={{ color: "#dc2f2f", fontSize: 40 }}
                          ></CancelIcon>
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
        className={classes.paging}
        rowsPerPageOptions={[10, 50, 200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
