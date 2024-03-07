import { useState, useEffect } from 'react';
import axios from 'axios'

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios('http://localhost:3000/cakemodels')
      .then(response => response.data)
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>
          <h2>{item.Cake_Name}</h2>
          <p>{item.Popularity}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;