import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Test() {
  const [data, setData] = useState();
  const dumy = { value: "값", num: 123 };

  useEffect(() => {
    setData(dumy);
    console.log("데이타", data);
  }, []);

  const OnClick = () => {
    setData((prev) => {
      console.log(prev);
      if (prev === undefined) {
        return dumy;
      } else {
        return [prev, dumy];
      }
    });
    console.log("온클릭", data);
  };

  return <div onClick={OnClick}>하이</div>;
}

export default Test;
