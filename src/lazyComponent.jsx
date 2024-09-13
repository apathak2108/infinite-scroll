import React from "react";

const LazyComponent = ({ data }) => {
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
};

export default LazyComponent;