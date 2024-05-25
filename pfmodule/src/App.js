import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
  }, []);

  return (
      <div>
        <h1>React and Symfony Integration</h1>
        {data ? (
            <div>
              <p>{data.message}</p>
              <p>{data.date}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
}

export default App;