import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ParsingErrorTable from './page/ParsingErrorTable';
import NoDataFoundTable from './page/NoDataFoundTable';
import NoPropertyDataFoundTable from './page/NoPropertyDataFoundTable';
import PropertyDataExceptionsTable from './page/PropertyDataExceptionsTable';

function Exceptions() {
  const [parsingErrorCount, setparsingErrorCount] = useState(null);
  const [noDataFound, setnoDataFound] = useState(null);
  const [noPropertyDataFound, setnoPropertyDataFound] = useState(null);
  const [propertydataexceptionsCount, setpropertydataexceptionsCount] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:5000/parsing_error')
      .then(response => setparsingErrorCount(response.data.parsing_error))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/no_data_found')
      .then(response => setnoDataFound(response.data.no_data_found))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/no_property_data_found')
      .then(response => setnoPropertyDataFound(response.data.no_property_data_found))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/property_data_exceptions')
      .then(response => setpropertydataexceptionsCount(response.data.property_data_exceptions))
      .catch(error => console.error(error));

  }, []);

  return (
    <div className="stat-box-container">
      <div className="stat-box-row">
        <p className="stat-box"><b>Parsing Error </b>{<Link to="/parsing-error-table">{ParsingErrorTable}{parsingErrorCount}</Link>}</p>
        <p className="stat-box"><b>No Data Found </b>{<Link to="/no-data-found-table">{NoDataFoundTable}{noDataFound}</Link>}</p>
        <p className="stat-box"><b>Invalid URLs </b></p>
        <p className="stat-box"><b>URL Timeout </b></p>
        <p className="stat-box"><b>No Property Data Found </b>{<Link to="/no-property-data-found-table">{NoPropertyDataFoundTable}{noPropertyDataFound}</Link>}</p>
        <p className="stat-box"><b>Property Data Exceptions </b>{<Link to="/property-data-exceptions-table">{PropertyDataExceptionsTable}{propertydataexceptionsCount}</Link>}</p>
      </div>
    </div>
  );
}

export default Exceptions;
