import "./App.css";
import React from "react";

const Notification = ({ notification }) => {

  if (notification === null) {
    return null;
  }
  const {message, type} = notification

  return <div className={type}>{message}</div>;
};

export default Notification;
