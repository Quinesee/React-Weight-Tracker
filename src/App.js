import React, { useState } from 'react';
import Graph from "./Graph";

import './App.css';

function App() {
  const [points, setPoints] = useState([
      {d: `2019-09-18`, w: `220`},
      {d: `2019-09-17`, w: `224`},
      {d: `2019-09-20`, w: `222`},
      {d: `2019-09-23`, w: `218`},
      {d: `2019-09-04`, w: `235`},
      ]);
  const [newDate, setNewDate] = useState('');
  const [newWeight, setNewWeight] = useState(0);

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentPoints= points;
    const exists = currentPoints.some((value) => {
      return value.d === newDate
    });

    if (exists) {
      setPoints(() => {
        return currentPoints.map((weight, i) => {
          if (weight.d === newDate) {
            weight.w = newWeight
          }
          return weight
        })
      })
    } else {
      setPoints(() => {
        return [...points, { d:newDate, w: newWeight}]
      })
    }
  };

  return (
    <div className="App">
      <h1>Weight Tracker</h1>
      <Graph points={points} />

      <form method="POST" action="" onSubmit={handleSubmit}>
        <h2>Add New Weight</h2>
        <div className="form-input">
          <label htmlFor="newDate">Date</label>
          <input
              type="date"
              name="newDate"
              value={newDate}
              onChange={handleDateChange}
              required="required"
          />
        </div>
        <div className="form-input">
          <label htmlFor="newWeight">Weight</label>
          <input
              type="number"
              name="newWeight"
              value={newWeight}
              onChange={handleWeightChange}
              required="required"
              min="50"
              step=".01"
          />
        </div>
        <button type="submit">Add</button>
      </form>

    </div>
  );
}

export default App;
