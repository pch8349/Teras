import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Schedule = () => {
  const [value, setValue] = useState(new Date());

  function OnChange(nextValue) {
    setValue(nextValue);
  }

  return <Calendar onChange={OnChange} value={value} />;
};

export default Schedule;
