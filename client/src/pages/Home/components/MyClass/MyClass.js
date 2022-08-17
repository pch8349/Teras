import React from "react";
import {Routes, Route} from 'react-router-dom'
import MyClassList from './MyClassList'
import MyClassItem from './MyClassItem'

function main() {
  return (
    <div>
      <Routes>
        <Route path="" element={<MyClassList />} />
      </Routes>
    </div>
    );
}

export default main;