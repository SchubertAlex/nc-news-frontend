import React from "react";

const Button = ({ onClick, children, className, ariaLabel }) => {
  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

export default Button;
