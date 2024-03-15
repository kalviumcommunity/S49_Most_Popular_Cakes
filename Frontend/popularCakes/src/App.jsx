import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login.jsx';
import './App.css'; // Import the CSS file

function App() {
  const [data, setData] = useState(null);
  const [newCakeName, setNewCakeName] = useState('');
  const [newRating, setNewRating] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/cakemodels')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddCake = () => {
    const newCake = {
      cakeName: newCakeName, // Use 'cakeName' instead of 'Cake_Name'
      rating: newRating      // Use 'rating' instead of 'Rating'
    };
  
    axios.post('http://localhost:3000/cakes', newCake)
      .then(response => {
        setData(prevData => [...prevData, response.data]);
        setNewCakeName('');
        setNewRating('');
        setIsPopupOpen(false); // Close the popup after adding the cake
      })
      .catch(error => console.error(error));
  };
  

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => setIsPopupOpen(true)}>Add Cake</button>
      <div className={`popup ${isPopupOpen ? 'active' : ''}`}>
        <div>
          <input
            type="text"
            placeholder="Cake Name"
            value={newCakeName}
            onChange={e => setNewCakeName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating"
            value={newRating}
            onChange={e => setNewRating(e.target.value)}
          />
          <button onClick={handleAddCake}>Add Cake</button>
          <button onClick={() => setIsPopupOpen(false)}>Close</button>
        </div>
      </div>
      
      {data.map(item => (
        <div key={item._id}>
          <h2>{item.Cake_Name}</h2>
          <p>{item.Popularity}</p>
        </div>
      ))}

      <Login />
    </div>
  );
}

export default App;
