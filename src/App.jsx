import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const fetchItem = () => {
    axios
      .get(`https://api.api-ninjas.com/v1/worldtime?city=${selectedCity}`, {
        headers: {
          "X-Api-Key": "TyvX7NrvmCbJ9xsiNW6f4A==ioWR7qO7m2TsUYMx",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setValues(response.data);
        setIsValid(false);
      });
  };
  const searchTime = () => {
    setIsValid(true);
    fetchItem();
  };

  useEffect(() => {
    if (!isValid)
      if (selectedCity !== "") {
        const intervalId = setInterval(() => {
          fetchItem();
        }, 500);

        return () => clearInterval(intervalId);
      }
  }, [isValid]);

  return (
    <div>
      <Panel header="Digital Clock">
        <span className="p-float-label">
          <InputText
            id="username"
            value={selectedCity}
            onChange={handleChange}
          />
          <label htmlFor="username">City Name</label>
        </span>
        <br />
        <button onClick={searchTime}>Search</button>
        <br /> <br />
        {isValid ? (
  selectedCity !== "" ? (
    <ProgressSpinner
      style={{ width: "50px", height: "50px" }}
      strokeWidth="4"
      fill="var(--surface-ground)"
      animationDuration="1s"
    />
  ) : (
    values !== "" && (
      <p>Undefined City</p>
    )
  )
) : (
  values.hour !== undefined && (
    <>
      <h2>
        {values.hour} : {values.minute} : {values.second}
      </h2>
      <p>
        {values.day_of_week}, {values.day}
      </p>
    </>
  )
)}


      </Panel>
    </div>
  );
}

export default App;
