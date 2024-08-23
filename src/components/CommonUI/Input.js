import React from 'react';
import PropTypes from 'prop-types';
import './Input.css'; // CSS for styling Input

const Input = ({ value, onChange, error, ...props }) => {
  return (
    <div className={`input-container ${error ? 'error' : ''}`}>
      <input
        className={`input ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;