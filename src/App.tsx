// App.tsx
import React, { useState } from "react";
import Map from "./components/Map";
import InputForm from "./components/InputForm";
import "./App.css";

const App: React.FC = () => {
  const [dronePosition, setDronePosition] = useState({
    latitude: 28.614903,
    longitude: 77.328142,
  });
  const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>(
    []
  );
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = (
    latitude: number,
    longitude: number,
    time: number
  ) => {
    setIsSimulating(true);
    // Logic to calculate pathCoordinates based on the start and end positions, and time
    // For simplicity, you can just use a straight line between start and end points
    const newPathCoordinates: [number, number][] = [
      [dronePosition.longitude, dronePosition.latitude],
      [longitude, latitude],
    ];
    setPathCoordinates(newPathCoordinates);

    // Update the drone position based on time
    const totalSteps = 20; // Adjust this value based on the desired animation smoothness
    const stepInterval = (+time * 1000) / totalSteps;
    let step = 1;
    const timer = setInterval(() => {
      if (step <= totalSteps) {
        const newLatitude =
          dronePosition.latitude +
          (latitude - dronePosition.latitude) * (step / totalSteps);
        const newLongitude =
          dronePosition.longitude +
          (longitude - dronePosition.longitude) * (step / totalSteps);
        setDronePosition({ latitude: newLatitude, longitude: newLongitude });
        step++;
      } else {
        clearInterval(timer);
        setIsSimulating(false);
      }
    }, stepInterval);
  };

  return (
    <div>
      <h1>Drone Simulator</h1>
      <InputForm
        isSimulating={isSimulating}
        startSimulation={startSimulation}
      />
      <Map dronePosition={dronePosition} pathCoordinates={pathCoordinates} />
    </div>
  );
};

export default App;
