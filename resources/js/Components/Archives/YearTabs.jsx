import React from 'react';

const YearTabs = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div className="year-tabs">
      {years.map(year => (
        <button
          key={year}
          className={selectedYear === year ? 'active' : ''}
          onClick={() => onSelectYear(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearTabs;