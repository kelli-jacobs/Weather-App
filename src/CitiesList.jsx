import React, { useState } from 'react';
import citiesStates from './citiesStates.json';

const CitiesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCitiesStates = citiesStates.filter(
    (item) =>
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city or state"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {filteredCitiesStates.map((item, index) => (
          <li key={index}>
            {item.city}, {item.state}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesList;