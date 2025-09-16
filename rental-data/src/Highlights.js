import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewUrlOnboardedTable from './page/NewUrlOnboardedTable';
import UrlsInDevelopmentTable from './page/UrlsInDevelopmentTable';
// import lables from './labels.json';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Highlights() {
  const [newUrlOnboarded, setnewUrlOnboarded] = useState(null);
  const [urlsInDevelopment, seturlsInDevelopment] = useState(null);

  const data = [
    { name: 'New Url', count1: newUrlOnboarded, fill: '#8884d8' },
    { name: 'URLs in Prod', count2: newUrlOnboarded, fill: '#82ca9d' },
  ];

  useEffect(() => {
    
    axios.get('http://localhost:5000/new_url_onboarded')
      .then(response => setnewUrlOnboarded(response.data.new_url_onboarded))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/urls_in_development')
      .then(response => seturlsInDevelopment(response.data.urls_in_development))
      .catch(error => console.error(error));

  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <div>
          <p>
            <b>New URL onboarded </b>
            {<Link to="/new-url-onboarded-table">{NewUrlOnboardedTable}{newUrlOnboarded}</Link>}
          </p>
        </div>
        <div>
          <p>
            <b>URLs in Development </b>
            {<Link to="/urls-in-development-table">{UrlsInDevelopmentTable}{urlsInDevelopment}</Link>}
          </p>
        </div>
        <div>
          <p>
            <b>URLs in QA </b>
          </p>
        </div>
        <div>
          <p>
            <b>URLs in Production </b>
          </p>
        </div>
        <div>
          <p>
            <b>Data Quality Score (DQS) </b>
          </p>
        </div>
      </div>
      <div style={{ width: '250px', height: '200px' }}>
        <BarChart width={250} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count1" fill="#8884d8" />
          <Bar dataKey="count2" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default Highlights;
