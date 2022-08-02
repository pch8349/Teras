import React from "react";
import styled from "styled-components";
import {
  NewRoot,
  BackForm,
  LoginContent,
  IdForm,
  PwForm,
} from "../../styles/LoginStyle";
import {
  TextBigInter,
  TextSmallInter,
  TextColorArt,
} from "../../styles/LoginText";
import { DropDown } from "../../styles/DropDownButton";
import { WhiteBtn } from "../../styles/LoginBtn";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const SignUp = ({}) => {
  const SpringGreenFlexColumnFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const BackBtn = (e, name) => {
    alert(`${name} was clicked`);
  };
  const [role, setRole] = React.useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <Logofixed
            src={`https://file.rendit.io/n/GuXE32OOzWWWXqrS8jTY.png`}
          />
          <DropDown />
          <PwFormmargin />
          <FlexRow>
            <TextBigInter>아이디 입력</TextBigInter>
            <FlexColumn>
              <TextColorArt color={`#ea5757`}>
                *사용 중인 아이디입니다
              </TextColorArt>
              {/* <TextColorArt colot={`#486ed0`}>*사용 가능한 아이디입니다</TextColorArt> */}
            </FlexColumn>
          </FlexRow>
          <IdForm />
          <FlexRow1>
            <TextBigInter>비밀번호 입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>
              *특수문자, 대문자, 소문자, 숫자를 포함한 12자리 이상
            </TextColorArt>
          </FlexRow1>
          <PwForm />
          <PwFormmargin />
          <FlexRow2>
            <TextBigInter>비밀번호 재입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>*비밀번호가 다릅니다</TextColorArt>
          </FlexRow2>
          <PwForm />
          <PwFormmargin />
          <TextBigInter>이름</TextBigInter>
          <IdForm />
          <FlexRow>
            <TextBigInter>이메일</TextBigInter>
          </FlexRow>
          <IdForm />
          <FlexRow>
            <TextBigInter>핸드폰 번호</TextBigInter>
          </FlexRow>
          <IdForm />
          <FlexRow5>
            <WhiteBtn
              onClick={(e) => BackBtn(e, "LookForID")}
              margin={`0px 10px 0px 0px`}
            >
              <TextSmallInter>뒤로가기</TextSmallInter>
            </WhiteBtn>
            <SpringGreenFlexColumn
              onClick={(e) => SpringGreenFlexColumnFunction(e, "입력")}
            >
              <Element16>입력</Element16>
            </SpringGreenFlexColumn>
          </FlexRow5>
        </LoginContent>
      </BackForm>
    </NewRoot>
  );
};
const PwFormmargin = styled.div`
  margin: 0px 0px 36px 0px;
`;
const Logofixed = styled.img`
  width: 129px;
  height: 169px;

  margin: 0px 0px 15px 0px;
`;
const FlexRow = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 150px;
  align-items: flex-end;
  padding: 0px 3px;
`;
const FlexColumn = styled.div`
  align-self: stretch;
  width: 152px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
`;
const FlexRow1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 35px;
  align-items: center;
  margin: 0px 0px 2px 0px;
`;
const FlexRow2 = styled.div`
  align-self: stretch;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 190px;
  align-items: flex-start;
`;
const FlexRow5 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 300px;
  align-items: center;
`;
const SpringGreenFlexColumn = styled.button`
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
const Element16 = styled.div`
  text-align: center;
  width: 71px;
  height: 32px;
  display: flex;
  font-size: 13px;
  font-family: Inter;
  color: #363636;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
