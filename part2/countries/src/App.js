import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./CountryList"

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]); // overridden with useEffect later
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <CountryList filter={filter} countries={countries}></CountryList>
    </div>
  );
}

export default App;
