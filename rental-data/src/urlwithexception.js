import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UrlWithException() {
  const [urlwithException, seturlwithException] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/url_with_exception')
      .then(response => seturlwithException(response.data.url_with_exception))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <p className="stat-box"><strong>Number Of Apartments Failed : </strong>{urlwithException}</p>
    </div>
  );
}

export default UrlWithException;
