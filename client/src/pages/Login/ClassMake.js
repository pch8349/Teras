import React, { useState } from "react";
import styled from "styled-components";
import { classCreate } from "../../api/users";

const ClassMake = ({}) => {
  const [code, setCode] = useState("");
  const [grade, setGrade] = useState("");
  const [classroom, setClassRoom] = useState("");

  const body = {
    schoolCode: "S000003540",
    gradeNumber: grade,
    classNumber: classroom,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(body);
    try {
      await classCreate(
        body,
        (response) => {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          console.log("성공", accessToken);
        },
        () => {
          console.log("전송 실패");
        }
      );
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmit}>
      <IdForm
        value={grade}
        onChange={({ target: { value } }) => setGrade(value)}
        placeholder="반 입력"
      />
      <IdForm
        value={classroom}
        onChange={({ target: { value } }) => setClassRoom(value)}
        placeholder="반 입력"
      />
      <GreenBtn>
        <TextBtnInter>로그인</TextBtnInter>
      </GreenBtn>
    </form>
  );
};

const IdForm = styled.input`
  border-color: #096c25;
  border-style: solid;
  width: 450px;
  min-height: 35px;
  background-color: #ffffff;
  align-self: center;
  border-radius: 5px;
  margin: 0px 0px 0px 0px;
  border-width: 1px;
  font-size: 15px;
`;
const GreenBtn = styled.button`
  background-color: #e0ffc1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
`;
const TextBtnInter = styled.div`
  text-align: center;
  width: 450px;
  height: 52px;
  display: flex;
  font-size: 13px;
  font-family: Inter;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default ClassMake;
