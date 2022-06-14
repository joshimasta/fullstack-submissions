import { useState, useEffect } from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
};
const CountryListing = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  if (showDetails) {
    return (
      <>
        <p key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </p>
        <Country country={country}></Country>
      </>
    );
  } else {
    return (
      <>
        <p key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => setShowDetails(true)}>show</button>
        </p>
      </>
    );
  }
};

const CountryList = ({ countries: allCountries, filter }) => {
  const countries = allCountries.filter((country) => {
    if (country.name.common.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
      return true;
    }
    if (
      country.name.official.toLowerCase().indexOf(filter.toLowerCase()) >= 0
    ) {
      return true;
    }
    return false;
  });
  if (countries.length <= 0) {
    return <p>no countries match the search</p>;
  } else if (countries.length == 1) {
    const country = countries[0];
    return <Country country={country}></Country>;
  } else if (countries.length <= 10) {
    return (
      <>
        {countries.map((country) => (
          <CountryListing key={country.name.official} country={country}></CountryListing>
        ))}
      </>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
  return <p>not implemented</p>;
};

export default CountryList;
