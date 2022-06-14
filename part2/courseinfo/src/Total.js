import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((subtotal, part) => subtotal + part.exercises, 0);
  return <b><p>Total of {total} exersices.</p></b>;
};

export default Total;
