import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SplashScreen from './Components/SplashScreen';
import Dashboard from './Components/Dashboard';
import AddActivity from './Components/AddActivity';
import GoalSetting from './Components/GoalSetting';
import ActivityHistory from './Components/ActivityHistory';


// Define initial state for activities and goals
const initialState = {
  activities: [],
  goals: []
};

// Reducer function to manage activities and goals
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload]
      };
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, action.payload]
      };
    case 'UPDATE_GOAL_PROGRESS':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.goalName === action.payload.goalName
            ? { ...goal, progress: action.payload.progress, completed: action.payload.completed }
            : goal
        )
      };
    default:
      return state;
  }
}

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Function to add an activity
  const addActivity = (newActivity) => {
    dispatch({ type: 'ADD_ACTIVITY', payload: newActivity });
    setSuccessMessage('Activity added successfully!');
    clearSuccessMessage();
  };

  // Function to add a goal
  const addGoal = (newGoal) => {
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
    setSuccessMessage('Goal added successfully!');
    clearSuccessMessage();
  };

  // Function to update progress of goals
  const updateGoalProgress = (goalName, progress, completed) => {
    dispatch({
      type: 'UPDATE_GOAL_PROGRESS',
      payload: { goalName, progress, completed }
    });
  };

  // Update goal progress based on activities
  useEffect(() => {
    state.goals.forEach((goal) => {
      const matchingActivities = state.activities.filter(
        (activity) =>
          activity.activityType === goal.targetActivity &&
          new Date(activity.date) <= new Date(goal.targetDate)
      );

      const totalAchieved = matchingActivities.reduce(
        (total, activity) => total + parseFloat(activity.duration),
        0
      );

      const progress = Math.min((totalAchieved / goal.targetAmount) * 100, 100);
      const completed = progress >= 100;

      updateGoalProgress(goal.goalName, progress, completed);
    });
  }, [state.activities, state.goals]);

  // Clear success message after 3 seconds
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <Router>
          <nav>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/add-activity" className="nav-link">Add Activity</Link>
            <Link to="/goal-setting" className="nav-link">Set Goals</Link>
            <Link to="/activity-history" className="nav-link">Activity History</Link>
          </nav>

          {/* Display success message */}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <Routes>
            <Route
              path="/"
              element={<Dashboard activities={state.activities} goals={state.goals} />}
            />
            <Route
              path="/add-activity"
              element={<AddActivity addActivity={addActivity} />}
            />
            <Route
              path="/goal-setting"
              element={<GoalSetting activities={state.activities} addGoal={addGoal} />}
            />
            <Route
              path="/activity-history"
              element={<ActivityHistory activities={state.activities} />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
