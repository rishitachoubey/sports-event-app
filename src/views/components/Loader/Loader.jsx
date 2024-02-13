import React from "react";
import './Loader.scss'

/**
 * Loader Component - Displays a visual indicator for loading state.
 */

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};
