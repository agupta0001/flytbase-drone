import { useState } from "react";

interface InputFormProps {
  isSimulating: boolean;
  startSimulation: (latitude: number, longitude: number, time: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  isSimulating,
  startSimulation,
}) => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [time, setTime] = useState("0");

  const handleStartSimulation = () => {
    startSimulation(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(time)
    );
  };

  return (
    <div>
      <input
        type="number"
        value={+latitude || ""}
        onChange={(e) => setLatitude(e.target.value)}
        disabled={isSimulating}
        placeholder="Latitude"
      />
      <input
        type="number"
        value={+longitude || ""}
        onChange={(e) => setLongitude(e.target.value)}
        disabled={isSimulating}
        placeholder="Longitude"
      />
      <input
        type="number"
        value={+time || ""}
        onChange={(e) => setTime(e.target.value)}
        disabled={isSimulating}
        placeholder="Time in Seconds"
      />
      {!isSimulating && (
        <button onClick={handleStartSimulation}>Simulate</button>
      )}
    </div>
  );
};

export default InputForm;
