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

function UrlsInDevelopment() {
  const [urlsInDevelopmentTable, seturlsInDevelopmentTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null); // Track the sorting configuration
  const navigate = useNavigate();
  // const [selectedDate, setSelectedDate] = useState(null);
  

  const getFilteredRows = () => {
    let selectedRows = urlsInDevelopmentTable;
  
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
    axios
      .get('http://localhost:5000/urls_in_development_table')
      .then((response) => {
        console.log(response.data);
        seturlsInDevelopmentTable(response.data.data);
      })
      .catch((error) => {
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

  // const formatTimestamp = (timestamp) => {
  //   const parsedDateTime = new Date(timestamp);
  //   const formattedDateTime = parsedDateTime.toLocaleString('en-US', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     hour12: 'true',
  //   });
  //   return formattedDateTime;
  // };

  // const renderStatus = (status) => {
  //   return status === null ? 'NULL' : status;
  // };

  // const handleDateChange = (date) => {
  //   if (date === null) {
  //     window.location.reload(); // Reload the page
  //   } else {
  //     setSelectedDate(date);
  //     setPage(0);
  //   }
  // };

  return (
    <div style={{ backgroundColor: '#477A8D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{backgroundColor: '#EEF2F4'}}>
        <Toolbar>
          <Typography variant="h6" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
            <strong>Operational Excellence Dashboard</strong>
          </Typography>
          {/* <div>
          <Typography variant="h6" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
            <strong>RentalBeast</strong>
          </Typography>
          </div> */}
          {/* <TextField
            label=""
            type="date"
            variant="outlined"
            size="small"
            sx={{ marginRight: '15px' }}
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleDateChange(e.target.value === '' ? null : new Date(e.target.value))}
            inputProps={{
              shrink : true
            }}
          /> */}
          <IconButton edge="start" color="inherit" onClick={handleBackButtonClick}>
            <Button variant="contained" style={{ backgroundColor: '#4C768B', color: 'white' }}>BACK</Button>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography sx={{ flexGrow: 1, marginBottom: '10px', color: '#4C768B' }}variant="h5" component="div">
                  <center><i>
                    Urls In Development
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
                <TablePagination
                  rowsPerPageOptions={[100, 500, 1000]}
                  component="div"
                  count={getSortedRows().length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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
                            direction={sortConfig && sortConfig.columnKey === 'url' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('url')}
                          >
                            <b>URL</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'script_path'}
                            direction={sortConfig && sortConfig.columnKey === 'script_path' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('script_path')}
                          >
                            <b>SCRIPT PATH</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'templateName'}
                            direction={sortConfig && sortConfig.columnKey === 'templateName' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('templateName')}
                          >
                            <b>TEMPLATE NAME</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'template_file'}
                            direction={sortConfig && sortConfig.columnKey === 'template_file' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('template_file')}
                          >
                            <b>TEMPLATE FILE</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'sleep'}
                            direction={sortConfig && sortConfig.columnKey === 'sleep' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('sleep')}
                          >
                            <b>SLEEP</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'driver_wait_time'}
                            direction={sortConfig && sortConfig.columnKey === 'driver_wait_time' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('driver_wait_time')}
                          >
                            <b>DRIVER WAIT TIME</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'status'}
                            direction={sortConfig && sortConfig.columnKey === 'status' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('status')}
                          >
                            <b>STATUS</b>
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
                            <TableCell>{row.script_path}</TableCell>
                            <TableCell>{row.templateName}</TableCell>
                            <TableCell>{row.template_file}</TableCell>
                            <TableCell>{row.sleep}</TableCell>
                            <TableCell>{row.driver_wait_time}</TableCell>
                            <TableCell>{row.status}</TableCell>
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

export default UrlsInDevelopment;
