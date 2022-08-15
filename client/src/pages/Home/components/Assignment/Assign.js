import React from "react";
import {Routes, Route} from 'react-router-dom'
import AssignList from './AssignList'
import AssignRegister from './AssignRegister'
import AssignDetail from './AssignDetail'

function main() {
  return (
    <div>
      <Routes>
        <Route path="" element={<AssignList />} />
        <Route path="register" element={<AssignRegister />} />
        <Route path="/:assignNo" element={<AssignDetail />} />
      </Routes>
    </div>
    );
}

export default main;
