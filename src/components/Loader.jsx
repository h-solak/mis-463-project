import React from "react";

const Loader = ({ style, className }) => {
  return (
    <div className={`p-0 ${className}`} style={style}>
      <div className="spinner">
        <div className="r1"></div>
        <div className="r2"></div>
        <div className="r3"></div>
        <div className="r4"></div>
        <div className="r5"></div>
      </div>
    </div>
  );
};

export default Loader;
