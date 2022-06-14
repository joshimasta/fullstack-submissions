import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({courseName, parts}) => {
  return (
    <div>
      <Header course={courseName} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
