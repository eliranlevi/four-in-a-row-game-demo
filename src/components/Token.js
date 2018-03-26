import React from "react";

const Token = ({
  by = "",
}) => (
  <div className={`token ${by}`}></div>
);

export default Token;
