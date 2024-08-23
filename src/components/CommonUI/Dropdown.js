import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css'; // CSS for styling Dropdown

const options = [
  {id: 0, label: 'Select your food preference', value: '' },
  {id: 1, label: 'Vegetarian', value: 'Vegetarian Options.' },
  {id: 2, label: 'Vegan', value: 'Vegan Options.' },
  {id: 3, label: 'Non-Vegetarian', value: ' Non-Vegetarian Options.' },
  {id: 4, label: 'Keto', value: 'Keto Options.' },
  {id: 5, label: 'Paleo', value: 'Paleo Options.' },
];

const Dropdown = ({ value, onChange, error, ...props }) => {
  return (
    <div className={`dropdown-container ${error ? 'error' : ''}`}>
      <select
        className={`dropdown ${error ? 'dropdown-error' : ''}`}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Dropdown;