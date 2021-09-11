import React, { useState } from "react";

const StatisticLine = ({text, value, percentages }) => {
  if (percentages) {
    return <tr><td>{text}</td> <td>{value*100}%</td></tr>;
  }
  return <tr><td>{text}</td> <td>{value}</td></tr>;
};

const Button = ({ variable, setVariable, name}) => {
  return (
    <div>
      <button onClick={() => setVariable(variable + 1)}>{name}</button>
    </div>
  );
};

// a proper place to define a component
const Statistics = ({good, neutral, bad}) => {
  const all = bad + neutral + good
  const average = (good - bad)/all
  const positiveRatio = good/all
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positiveRatio} percentages={true} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> give feedback </h1>
      <Button name="good" variable={good} setVariable={setGood}/>
      <Button name="neutral" variable={neutral} setVariable={setNeutral}/>
      <Button name="bad" variable={bad} setVariable={setBad}/>
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}   />
    </div>
  );
};
export default App;
