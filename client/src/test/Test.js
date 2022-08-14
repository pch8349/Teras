import React, { useState, useEffect } from "react";
import { Info } from "./Sending";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Test = ({}) => {
  const Navigate = useNavigate();

  const onSubmit = () => {
    Navigate("/login");
  };

  return (
    <>
      <button onClick={onSubmit}>하이</button>
    </>
  );
};
export default Test;
