import React from "react";
import {Routes, Route} from 'react-router-dom'
import ScheduleList from "./ScheduleList";



function main() {
  return (
  <div>
    <Routes>
      <Route path="" element={<ScheduleList />} />
    </Routes>
  </div>);
}

export default main;