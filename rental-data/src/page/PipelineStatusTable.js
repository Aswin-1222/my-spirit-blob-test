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

function PipelineStatusTable() {
  const [pipelineStatusTable, setpipelineStatusTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null); // Track the sorting configuration
  const navigate = useNavigate();

  const getFilteredRows = () => {
    let selectedRows = pipelineStatusTable;

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
    axios.get('http://localhost:5000/pipeline_status_table')
      .then(response => {
        console.log(response.data);
        setpipelineStatusTable(response.data.data);
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

  return (
    <div style={{ backgroundColor: '#E9E9EF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>RENTALBEAST</strong>
          </Typography>
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
                        Pipeline Status Table
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
                            active={sortConfig && sortConfig.columnKey === 'run_id'}
                            direction={
                              sortConfig && sortConfig.columnKey === 'run_id' ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort('run_id')}
                          >
                            <b>RUN ID</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'status_id'}
                            direction={sortConfig && sortConfig.columnKey === 'status_id' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('status_id')}
                          >
                            <b>STATUS ID</b>
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={sortConfig && sortConfig.columnKey === 'module_id'}
                            direction={
                              sortConfig && sortConfig.columnKey === 'module_id' ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort('module_id')}
                          >
                            <b>MODULE ID</b>
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
                            active={sortConfig && sortConfig.columnKey === 'updatedon'}
                            direction={sortConfig && sortConfig.columnKey === 'updatedon' ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort('updatedon')}
                          >
                            <b>UPDATEDON</b>
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
                            <TableCell>{row.run_id}</TableCell>
                            <TableCell>{row.status_id}</TableCell>
                            <TableCell>{row.module_id}</TableCell>
                            <TableCell>{formatTimestamp(row.addedon)}</TableCell>
                            <TableCell>{formatTimestamp(row.updatedon)}</TableCell>
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

export default PipelineStatusTable;
