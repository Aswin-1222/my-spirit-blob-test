import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  TableSortLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UrlWithExceptionTable() {
  const [urlWithExceptionTable, seturlWithExceptionTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null); // Track the sorting configuration
  const navigate = useNavigate();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  
  const getFilteredRows = () => {
    let selectedRows = urlWithExceptionTable;

    if (!searchQuery) {
      // Return the original rows when no search query is provided
      return selectedRows;
    }

    // Filter the rows based on the search query
    selectedRows = selectedRows.filter((row) =>
      Object.values(row).some((value) => value && value.toString().includes(searchQuery))
    );

    return selectedRows;
  };

  useEffect(() => {
    axios.get('http://localhost:5000/url_with_exception_table')
      .then(response => {
        console.log(response.data);
        seturlWithExceptionTable(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, getFilteredRows().length - page * rowsPerPage);

  const handleBackButtonClick = () => {
    // Navigate to the dashboard
    navigate('/dashboard');
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleSort = (columnKey) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.columnKey === columnKey) {
      // If the same column is being sorted, toggle the sort direction
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortConfig({ columnKey, direction });
  };

  const getSortedRows = () => {
    const selectedRows = getFilteredRows();

    if (sortConfig !== null) {
      const { columnKey, direction } = sortConfig;

      selectedRows.sort((a, b) => {
        const aValue = a[columnKey];
        const bValue = b[columnKey];

        if (aValue < bValue) {
          return direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return selectedRows;
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <div style={{ backgroundColor: '#E9E9EF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>RENTALBEAST</strong>
          </Typography>
          {/* <TextField
            label="Select Date"
            type="date"
            sx ={{marginRight: '15px'}}
            value={selectedDate.toISOString().split('T')[0]} // Convert date to ISO string format
            onChange={(e) => handleDateChange(new Date(e.target.value))} // Convert selected value to Date object
            InputLabelProps={{
            shrink: true,
            }}
          /> */}
          <IconButton edge="start" color="inherit" onClick={handleBackButtonClick}>
            <Button variant="contained">BACK</Button>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{ backgroundColor: '#bbdefb', height: '100%' }}>
              <CardContent>
                <Typography sx={{ flexGrow: 1, marginBottom: '10px'}}variant="h5" component="div">
                    <center><i>
                        Number Of Apartments Failed
                    </i></center>
                </Typography>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  fullWidth
                  margin="dense"
                />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'id'}
                            direction={sortConfig && sortConfig.columnKey === 'id' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('id')}
                          >
                            <b>ID</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'url'}
                            direction={
                              sortConfig && sortConfig.columnKey === 'url' ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort('url')}
                          >
                            <b>URL ID</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'exceptions_count'}
                            direction=
                                {sortConfig && sortConfig.columnKey === 'exceptions_count' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('exceptions_count')}
                          >
                            <b>EXCEPTIONS COUNT</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'exceptions'}
                            direction=
                                {sortConfig && sortConfig.columnKey === 'exceptions' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('exceptions')}
                          >
                            <b>EXCEPTIONS MESSAGE</b>
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getSortedRows()
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell>{row.url}</TableCell>
                            <TableCell>{row.exceptions_count}</TableCell>
                            <TableCell>{row.exceptions}</TableCell>
                          </TableRow>
                        ))}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={4} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[100, 500, 1000]}
                  component="div"
                  count={getSortedRows().length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default UrlWithExceptionTable;
