import React from "react";

const Token = ({
  by = "",
}) => {
  const getTokenClass = () => by || 'neutral';

  return (
    <div className={`token ${getTokenClass()}`}></div>
  );
};

export default Token;
