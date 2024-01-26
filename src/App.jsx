import { useState } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [values, setValues] = useState([]);

  const searchTime = () => {
    axios
      .get(`https://api.api-ninjas.com/v1/worldtime?city=${selectedCity}`, {
        headers: {
          "X-Api-Key": "TyvX7NrvmCbJ9xsiNW6f4A==ioWR7qO7m2TsUYMx",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setValues(response.data);
        console.log(values);
      })
      .catch((error) => {
        console.error("Error fetching time:", error);
      });
  };

  return (
    <>
      <Panel header="Header">
        <span className="p-float-label">
          <InputText
            id="username"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          />
          <label htmlFor="username">Select City</label>
        </span>
        <br />
        <h3>
          {values.hour} : {values.minute} : {values.second}
        </h3>
        <button onClick={searchTime}>Search</button>
      </Panel>
    </>
  );
}

export default App;
