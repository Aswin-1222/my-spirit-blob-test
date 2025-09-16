import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { 
  Grid, 
  AppBar, 
  Box, 
  // IconButton, 
  // TextField, 
  Toolbar, 
  Typography 
} from '@mui/material';
import Exceptions from '../Exceptions';
import Highlights from '../Highlights';
import DataQualitySummary from '../DataQualitySummary';
import ClientManagement from '../ClientManagement';
import BookOfWork from '../BookOfWork';
import StatsMetrics from '../StatsMetrics';
// import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import UrlCatalog from '../urlcatalog.js';
// import UrlCatalogTable from '../page/urlcatalogtable.js';
// import TotalUrlProcessed from '../totalurlprocessed.js';
// import TotalUrlProcessedTable from '../page/totalurlprocessedtable.js';
// import UrlWithException from '../urlwithexception.js';
// import UrlWithExceptionTable from '../page/urlwithexceptiontable.js';
// import TotalPropertyDataCount from '../totalpropertydatacount.js';
// import TotalPropertyDataCountTable from '../page/totalpropertydatacounttable.js';
// import PropertyDataExceptionCount from '../propertydataexceptioncount.js';
// import PropertyDataExceptionCountTable from '../page/propertydataexceptioncounttable.js';

const Dashboard = () => {
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <div style={{ backgroundColor: '#477A8D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <AppBar position="static" sx={{backgroundColor: '#EEF2F4'}}>
        <Toolbar>
          <Typography variant="h6" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
            <strong>Operational Excellence Dashboard</strong>
          </Typography>
          <div>
          <Typography variant="h6" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
            <strong>Apartments Finding</strong>
          </Typography>
          </div>
          {/* <TextField
            label="Select Date"
            type="date"
            sx ={{marginRight: '10px'}}
            value={selectedDate.toISOString().split('T')[0]} // Convert date to ISO string format
            onChange={(e) => handleDateChange(new Date(e.target.value))} // Convert selected value to Date object
            InputLabelProps={{
            shrink: true,
            }}
          /> */}
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px'  }}>
        <Grid container spacing={1} justifyContent="center">
          
          {/* Exceptions */}
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Exceptions</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/url-catalog-table">{UrlCatalogTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <Exceptions />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>

          {/* Highlights */}

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Highlights</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/total-url-processed-table">{TotalUrlProcessedTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <Highlights />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>

          {/* Data Quality Summary */}
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Data Quality Summary</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/url-with-exception-table">{UrlWithExceptionTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <DataQualitySummary />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>

          {/* Client Management */}
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Client Management</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/total-property-data-count-table">{TotalPropertyDataCountTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <ClientManagement />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>

          {/* Book of Work */}

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Book of Work</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/property-data-exception-count-table">{PropertyDataExceptionCountTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <BookOfWork />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>
          
          {/* Stats & Metrics */}

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#E7EAEC', height: '100%' }}>
              <CardContent>
                <Typography variant="h7" component="div" color="#4C768B" sx={{ flexGrow: 1 }}>
                  <center><b>Stats & Metrics</b></center>
                </Typography>
                {/* <IconButton color="inherit" sx={{ marginTop: '10px', marginBottom: '5px' }} >{<Link to="/property-data-exception-count-table">{PropertyDataExceptionCountTable}<NavigateNextRoundedIcon fontSize="large"/></Link>}</IconButton> */}
                <Typography variant="body2" color="text.secondary">
                  <StatsMetrics />
                </Typography>          
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
