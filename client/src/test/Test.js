import React, { useState, useEffect } from "react";
import Sending from "./Sending";

const Test = ({}) => {
  const USER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [data, setData] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    // 사용자 아이디 유효성검사
    const result = USER_REGEX.test(data); // username validcheck
    setValid(result);
    console.log(valid);
  }, [data]);

  return (
    <>
      <form>
        <input
          value={data}
          onChange={({ target: { value } }) => setData(value)}
        />
      </form>
    </>
  );
};
export default Test;
