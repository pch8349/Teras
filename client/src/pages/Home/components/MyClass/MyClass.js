import React from "react";
import { Routes, Route } from "react-router-dom";
import MyClassList from "./MyClassList";

function main() {
  return (
    <>
      <Routes>
        <Route path="" element={<MyClassList />} />
      </Routes>
    </>
  );
}

export default main;
