import React, { useState, useEffect } from "react";
import Sending from "./Sending";

const Test = ({}) => {
  const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
  const [data, setData] = useState("");
  const [valid, setValid] = useState(false);

   useEffect(() => {
    // 사용자 아이디 유효성검사
      const result = USER_REGEX.test(data);
      setValid(result);
  }, [data]);

  useEffect(() => {
    console.log("useState", valid);
  }, [valid])

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
