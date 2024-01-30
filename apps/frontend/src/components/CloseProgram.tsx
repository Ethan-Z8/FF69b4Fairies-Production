import "../styling/login.css";

import React from "react";

const CloseButton: React.FC = () => {
  const handleCloseClick = () => {
    if (window) {
      window.close();
    } else {
      console.log("thats not a window silly");
    }
  };

  return <button onClick={handleCloseClick}>Close Page</button>;
};

export default CloseButton;
