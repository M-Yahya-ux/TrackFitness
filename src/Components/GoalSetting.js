import React, { useState } from 'react';
import './GoalSetting.css';

const GoalSetting = ({ activities, addGoal }) => {
  const [goalName, setGoalName] = useState('');
  const [targetActivity, setTargetActivity] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState(null);

  const handleAddGoal = (e) => {
    e.preventDefault();

    // Validate form
    if (!goalName || !targetActivity || !targetAmount || !targetDate) {
      setError("Please fill out all required fields.");
      return;
    }
    if (new Date(targetDate) < new Date()) {
      setError("Target date cannot be in the past.");
      return;
    }

    const newGoal = {
      goalName,
      targetActivity,
      targetAmount: parseFloat(targetAmount),
      targetDate,
      progress: 0,
      completed: false
    };

    addGoal(newGoal);
    resetForm();
    setError(null);
  };

  const resetForm = () => {
    setGoalName('');
    setTargetActivity('');
    setTargetAmount('');
    setTargetDate('');
  };

  return (
    <div className="goal-setting">
      <h1>Set a New Fitness Goal</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleAddGoal}>
        <label>Goal Name *</label>
        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="E.g., Run 100 km in a month"
        />

        <label>Target Activity *</label>
        <select
          value={targetActivity}
          onChange={(e) => setTargetActivity(e.target.value)}
        >
          <option value="">Select an activity</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Walking">Walking</option>
        </select>

        <label>Target Amount (in hours ) *</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="Enter target amount"
        />

        <label>Target Date *</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />

        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalSetting;
