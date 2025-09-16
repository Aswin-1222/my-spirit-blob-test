import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InvalidPropertyDataTable from './page/InvalidPropertyDataTable';
import MissingUnitDetailsTable from './page/MissingUnitDetailsTable';

function DataQualitySummary() {
  const [invalidPropertyData, setinvalidPropertyData] = useState(null);
  const [missingUnitDetails, setmissingUnitDetails] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:5000/invalid_property_data')
      .then(response => setinvalidPropertyData(response.data.invalid_property_data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/missing_unit_details')
      .then(response => setmissingUnitDetails(response.data.missing_unit_details))
      .catch(error => console.error(error));

  }, []);

  return (
    <div>
      <div>
      <p><b>Invalid Property Data </b>{<Link to="/invalid-property-data-table">{InvalidPropertyDataTable}{invalidPropertyData}</Link>}</p>
      </div>
      <div>
      <p><b>Missing Unit Details </b>{<Link to="/missing-unit-details-table">{MissingUnitDetailsTable}{missingUnitDetails}</Link>}</p>
      </div>
      <div>
      <p><b>Change in Available Units </b></p>
      </div>
      <div>
      <p><b>Buildings Without Units </b></p>
      </div>
    </div>
  );
}

export default DataQualitySummary;
