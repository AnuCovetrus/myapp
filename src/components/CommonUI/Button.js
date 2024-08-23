import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // CSS for styling Button

const Button = ({ variant, children, ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;