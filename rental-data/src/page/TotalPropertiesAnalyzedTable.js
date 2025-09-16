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

function TotalPropertiesAnalyzedTable() {
  const [totalPropertiesAnalyzedTable, settotalPropertiesAnalyzedTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null); // Track the sorting configuration
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const getFilteredRows = () => {
    let selectedRows = totalPropertiesAnalyzedTable;
  
    if (!searchQuery && selectedDate === null) {
      // Return the original rows when no search query or date is provided
      return selectedRows;
    }
  
    selectedRows = selectedRows.filter((row) => {
      // Filter rows based on the search query
      if (searchQuery) {
        const searchableValues = [
          row.id,
          row.url,
          row.url_id,
          row.process_id,
          row.floor_planname,
          row.unit_number,
          row.bed_count,
          row.bath_count,
          row.sqft,
          row.rent,
          row.available_date,
          row.addedon,
          row.run_id
        ];
  
        const matchFound = searchableValues.some((value) => {
          if (value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          return false;
        });
  
        if (!matchFound) {
          return false;
        }
      }
  
      // Filter rows based on the selected date for "addedon" column
      if (selectedDate !== null) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        if (row.addedon === null || row.addedon.split('T')[0] !== formattedDate) {
          return false;
        }
      }
  
      return true;
    });
  
    return selectedRows;
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:5000/total_properties_analyzed_table')
      .then((response) => {
        console.log(response.data);
        settotalPropertiesAnalyzedTable(response.data.data);
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

  const formatTimestamp = (timestamp) => {
    const parsedDateTime = new Date(timestamp);
    const formattedDateTime = parsedDateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: 'true',
    });
    return formattedDateTime;
  };

  const renderStatus = (status) => {
    return status === null ? 'NULL' : status;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPage(0);
  };

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
          <TextField
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
          />
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
                        Total Properties Analyzed
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
                            direction={
                              sortConfig && sortConfig.columnKey === 'url' ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort('url')}
                          >
                            <b>URL</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'floor_planname'}
                            direction={
                              sortConfig && sortConfig.columnKey === 'floor_planname' ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort('floor_planname')}
                          >
                            <b>FLOOR PLAN NAME</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'unit_number'}
                            direction={sortConfig && sortConfig.columnKey === 'unit_number' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('unit_number')}
                          >
                            <b>UNIT NUMBER</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'bed_count'}
                            direction={sortConfig && sortConfig.columnKey === 'bed_count' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('bed_count')}
                          >
                            <b>BED COUNT</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'bath_count'}
                            direction={sortConfig && sortConfig.columnKey === 'bath_count' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('bath_count')}
                          >
                            <b>BATH COUNT</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'sqft'}
                            direction={sortConfig && sortConfig.columnKey === 'sqft' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('sqft')}
                          >
                            <b>SQFT</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'rent'}
                            direction={sortConfig && sortConfig.columnKey === 'rent' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('rent')}
                          >
                            <b>RENT</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'available_date'}
                            direction={sortConfig && sortConfig.columnKey === 'available_date' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('available_date')}
                          >
                            <b>AVAILABLE DATE</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'addedon'}
                            direction={sortConfig && sortConfig.columnKey === 'addedon' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('addedon')}
                          >
                            <b>ADDEDON</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'run_id'}
                            direction={sortConfig && sortConfig.columnKey === 'run_id' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('run_id')}
                          >
                            <b>RUN ID</b>
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
                            <TableCell>{renderStatus(row.floor_planname)}</TableCell>
                            <TableCell>{renderStatus(row.unit_number)}</TableCell>
                            <TableCell>{renderStatus(row.bed_count)}</TableCell>
                            <TableCell>{row.bath_count}</TableCell>
                            <TableCell>{row.sqft}</TableCell>
                            <TableCell>{row.rent}</TableCell>
                            <TableCell>{formatTimestamp(row.available_date)}</TableCell>
                            <TableCell>{formatTimestamp(row.addedon)}</TableCell>
                            <TableCell>{row.run_id}</TableCell>
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

export default TotalPropertiesAnalyzedTable;
