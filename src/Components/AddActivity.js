import React, { useState } from 'react';
import './AddActivity.css';

const AddActivity = ({ addActivity }) => {
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!activityType || !duration || !date) {
      setError("Please fill out all required fields.");
      return;
    }

    // Check if date is in the past
    if (new Date(date) < new Date()) {
      setError("Date cannot be in the past.");
      return;
    }

    const newActivity = {
      activityType,
      duration: parseFloat(duration),
      date,
      notes
    };

    addActivity(newActivity);
    resetForm();
    setError(null); // Clear any previous errors
  };

  const resetForm = () => {
    setActivityType('');
    setDuration('');
    setDate('');
    setNotes('');
  };

  return (
    <div className="add-activity">
      <h1>Log New Activity</h1>

      {/* Display error message if present */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Activity Type *</label>
        <select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
        >
          <option value="">Select an activity</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Walking">Walking</option>
        </select>

        <label>Duration (in minutes) *</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration"
        />

        <label>Date *</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes (optional)"
        ></textarea>

        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
};

export default AddActivity;
