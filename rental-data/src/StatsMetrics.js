import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TotalPropertiesAnalyzedTable from './page/TotalPropertiesAnalyzedTable'
import TotalUniqueDataPointsTable from './page/TotalUniqueDataPointsTable'
// import Pagination from './page/pagination';


function StatsMetrics() {
  const [totalPropertiesAnalyzed, settotalPropertiesAnalyzed] = useState(null);
  const [totalUniqueDataPoints, settotalUniqueDataPoints] = useState(null);
  const [latestProcessingTime, setlatestProcessingTime] = useState(null);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/total_properties_analyzed')
      .then(response => settotalPropertiesAnalyzed(response.data.total_properties_analyzed))
      .catch(error => console.error(error));
      
    axios.get('http://localhost:5000/total_unique_data_points')
      .then(response => settotalUniqueDataPoints(response.data.total_unique_data_points))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/latest_processing_time')
      .then(response => setlatestProcessingTime(response.data.latest_processing_time))
      .catch(error => console.error(error));

  }, []);

  return (
    <div>
      <div>
      <p><b>Total Properties Analyzed </b>{<Link to="/total-properties-analyzed-table">{TotalPropertiesAnalyzedTable}{totalPropertiesAnalyzed}</Link>}</p>
      {/* <p><b>Total Properties Analyzed </b>{<Link to="/pagination">{Pagination}{totalPropertiesAnalyzed}</Link>}</p> */}
      </div>
      <div>
      <p><b>Total Unique Data Points </b>{<Link to="/total-unique-data-points-table">{TotalUniqueDataPointsTable}{totalUniqueDataPoints}</Link>}</p>
      </div>
      <div>
      <p><b>Latest Processing Time </b>{latestProcessingTime}</p>
      </div>
      {/* <div>
      <p><b>Total Properties by Zip code </b></p>
      </div>
      <div>
      <p><b>Total Properties by Zip code </b></p>
      </div>
      <div>
      <p><b>Total Properties by Zip code </b></p>
      </div>
      <div>
      <p><b>Total Properties by Zip code </b></p>
      </div> */}
    </div>
  );
}

export default StatsMetrics;
