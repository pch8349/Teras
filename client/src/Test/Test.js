import { getSchool } from "api/users";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Test() {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const [inputs, setInputs] = useState({
    schoolCode: "",
    schoolName: "",
  });

  const OnClick = async () => {
    console.log("온클릭", data);
    console.log("플래그", flag);
    try {
      await getSchool(data)
        .then((response) => {
          console.log(response.data.list);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <input
        value={data}
        onChange={({ target: { value } }) => {
          setData(value);
        }}
      />
      <button onClick={OnClick}>하이</button>
    </>
  );
}

export default Test;
