import { getSchool } from "api/users";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Test() {
  const [data, setData] = useState();
<<<<<<< HEAD
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
=======
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
>>>>>>> b8728837d7dd46f55b47833f2123261b3c32273b
}

export default Test;
