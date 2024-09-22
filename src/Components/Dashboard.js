import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ activities, goals }) => {
  const [overallProgress, setOverallProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (goals.length > 0) {
      const totalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0);
      setOverallProgress(totalProgress / goals.length);
    }
  }, [goals]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      

      <div className="stats">
        <div className="stat-item">
          <h3>Total Activities Logged</h3>
          <p>{activities.length}</p>
        </div>
        <div className="stat-item">
          <h3>Progress Toward All Goals</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${overallProgress}%` }}>
              {overallProgress.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      <button
        className="action-button"
        onClick={() => navigate('/add-activity')}
      >
        Add New Activity
      </button>
      <button
        className="action-button"
        onClick={() => navigate('/goal-setting')}
      >
        Set New Goal
      </button>

      <div className="goal-list">
        <h2>Active Goals</h2>
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <h3>{goal.goalName}</h3>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${goal.progress}%` }}
              >
                {goal.progress.toFixed(2)}%
              </div>
            </div>
            {goal.completed && <p className="goal-completed">Goal Achieved!</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
