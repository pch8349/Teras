import React from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import {
  NewRoot,
  BackForm,
  LoginContent,
  LogoForm,
  FlexRow,
  EmptyPart,
  IdForm,
  PwForm,
  FlexRow1,
  RadioWithLabel,
} from "../../styles/LoginStyle";
import {
  TextBigInter,
  TextSmallInter,
  TextBtnInter,
} from "../../styles/LoginText";
import { LoginBtn, WhiteBtn } from "../../styles/LoginBtn";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const UserLogin = ({}) => {
  const WhiteBtnFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const LoginBtnFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const IdRememberCheck = (e, name, check) => {
    alert(`${name} was clicked`);
  };

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <LogoForm src={`https://file.rendit.io/n/hqghxg3SfioHvsa6lVy3.png`} />
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
          <TextBigInter>아이디</TextBigInter>
          <IdForm placeholder="아이디를 입력하세요" />
          <TextBigInter>비밀번호</TextBigInter>
          <PwForm placeholder="비밀번호를 입력하세요" />
          <FlexRow1>
            <RadioWithLabel>
              <Checkbox {...label} />
              <TextSmallInter>아이디 기억</TextSmallInter>
            </RadioWithLabel>
            <WhiteBtn
              onClick={(e) => WhiteBtnFunction(e, "SignUp")}
              margin={`0px 10px 0px 0px`}
            >
              <TextSmallInter>회원가입</TextSmallInter>
            </WhiteBtn>
            <WhiteBtn
              onClick={(e) => WhiteBtnFunction(e, "LookForID")}
              margin={`0px 10px 0px 0px`}
            >
              <TextSmallInter>아이디 찾기</TextSmallInter>
            </WhiteBtn>
            <WhiteBtn
              onClick={(e) => WhiteBtnFunction(e, "LookForPW")}
              margin={`0`}
            >
              <TextSmallInter>비밀번호 찾기</TextSmallInter>
            </WhiteBtn>
          </FlexRow1>
          <LoginBtn onClick={(e) => LoginBtnFunction(e, "LoginBtn")}>
            <TextBtnInter>로그인</TextBtnInter>
          </LoginBtn>
        </LoginContent>
      </BackForm>
    </NewRoot>
  );
};
