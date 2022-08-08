import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

const Info = ({ info }) => {
  return (
    <>
      <b>{info.id}</b> : <span>({info.name})</span>
    </>
  );
};

const Sending = ({ da }) => {
  const [text, setText] = useState("");

  const submitText = () => {
    console.log();
  };
  return (
    <div>
      {da.map((info) => (
        <Info info={info} />
      ))}
    </div>
  );
};

export default Sending;
