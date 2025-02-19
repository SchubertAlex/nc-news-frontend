import React from "react";

const Button = ({ onClick, children, className, disabled, ariaLabel }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
