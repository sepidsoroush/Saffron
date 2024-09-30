import React, { useState } from "react";
import { Button } from "../ui/button";

interface TimePickerProps {
  onTimeSet: (hour: number, minute: number) => void;
}

const CustomTimePicker: React.FC<{
  valueGroups: { hour: number; minute: number };
  onChange: (name: string, value: number) => void;
  onTimeSet: () => void;
}> = ({ valueGroups, onChange, onTimeSet }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    i * 5 < 10 ? `0${i * 5}` : `${i * 5}`
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center space-x-4 text-gray-500 font-semibold">
        <div className="flex flex-col items-center">
          <label htmlFor="hour" className="text-sm mb-2">
            Hour
          </label>
          <select
            id="hour"
            className="border border-gray-300 rounded p-2"
            value={valueGroups.hour}
            onChange={(e) => onChange("hour", parseInt(e.target.value))}
          >
            {hours.map((hour) => (
              <option key={hour} value={parseInt(hour)}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="minute" className="text-sm mb-2">
            Minute
          </label>
          <select
            id="minute"
            className="border border-gray-300 rounded p-2"
            value={valueGroups.minute}
            onChange={(e) => onChange("minute", parseInt(e.target.value))}
          >
            {minutes.map((minute) => (
              <option key={minute} value={parseInt(minute)}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button variant="secondary" onClick={onTimeSet}>
        Set Time
      </Button>
    </div>
  );
};

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSet }) => {
  const [valueGroups, setValueGroups] = useState({
    hour: 9,
    minute: 30,
  });

  const handleChange = (name: string, value: number) => {
    setValueGroups({
      ...valueGroups,
      [name]: value,
    });
  };

  const handleTimeSet = () => {
    onTimeSet(valueGroups.hour, valueGroups.minute);
  };

  return (
    <CustomTimePicker
      valueGroups={valueGroups}
      onChange={handleChange}
      onTimeSet={handleTimeSet}
    />
  );
};

export default TimePicker;
