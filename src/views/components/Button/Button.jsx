import React from "react";
import './Button.scss'


/**
 * Button Component - Renders a customizable button.
 */

export const Button = ({ children, onClick,classname, disabled, ...props }) => {
  return (
    <button className={classname} {...props} onClick={onClick} disabled={disabled} tabIndex="0">
      {children}
    </button>
  );
};
