import React, { useState } from 'react';
import './ActivityHistory.css';

const ActivityHistory = ({ activities }) => {
  const [filterType, setFilterType] = useState(''); // Filter by activity type
  const [filterStartDate, setFilterStartDate] = useState(''); // Filter by start date
  const [filterEndDate, setFilterEndDate] = useState(''); // Filter by end date
  const [sortKey, setSortKey] = useState('date'); // Default sort by date
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order
  const [searchQuery, setSearchQuery] = useState(''); // Search query for notes

  // Filter activities based on type, date range, and search query
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const endDate = filterEndDate ? new Date(filterEndDate) : null;

    // Check if the search query is in the notes (case insensitive)
    const matchesSearch = activity.notes
      ? activity.notes.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    return (
      (!filterType || activity.activityType === filterType) &&
      (!startDate || activityDate >= startDate) &&
      (!endDate || activityDate <= endDate) &&
      (searchQuery === '' || matchesSearch)
    );
  });

  // Sorting logic
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortKey === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortKey === 'duration') {
      return sortOrder === 'asc'
        ? a.duration - b.duration
        : b.duration - a.duration;
    } else if (sortKey === 'type') {
      return sortOrder === 'asc'
        ? a.activityType.localeCompare(b.activityType)
        : b.activityType.localeCompare(a.activityType);
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="activity-history">
      <h1>Activity History</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <label>
          Activity Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Walking">Walking</option>
          </select>
        </label>

        <label>
          Start Date:
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Activity Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('type')}>Activity Type</th>
            <th onClick={() => handleSort('duration')}>Duration (minutes)</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sortedActivities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.activityType}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
              <td>{activity.notes || 'No notes'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedActivities.length === 0 && <p>No activities found.</p>}
    </div>
  );
};

export default ActivityHistory;
