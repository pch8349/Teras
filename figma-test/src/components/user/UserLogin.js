import React from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import {
  Column,
  Text1,
  Text4,
  NewRootRoot,
  Login,
  WhiteFlexColumn,
  Removebgpreview,
  FlexRow,
  Element8,
  IdForm,
  PwForm,
  FlexRow1,
  RadioWithLabel,
  WhiteBtn,
  LoginBtn,
  Text7
} from "../../styles/LoginStyle"

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
    <NewRootRoot>
      <Login>
        <WhiteFlexColumn>
          <Removebgpreview
            src={`https://file.rendit.io/n/hqghxg3SfioHvsa6lVy3.png`}
          />
          <FlexRow>
            <Element8>
              {[
                {
                  childText: ``,
                },
                {
                  childText: ``,
                },
                {
                  childText: ``,
                },
              ].map((data) => (
                <Column>{data.childText}</Column>
              ))}
            </Element8>
          </FlexRow>
          <Text1 margin={`0px 0px 2px 6px`}>아이디</Text1>
          <IdForm />
          <Text1 margin={`0px 0px 1px 6px`}>비밀번호</Text1>
          <PwForm />
          <FlexRow1>
            <RadioWithLabel>
              <Checkbox {...label} />
              <Text4>아이디 기억</Text4>
            </RadioWithLabel>

            {/* <RadioWithLabel onClick={(e) => IdRememberCheck(e, "IdRemember")}>
              <Radio1
                src={`https://file.rendit.io/n/6dGvxhRB1uhwG4bh2iXM.svg`}
              />
              <Radio1
                src={`https://file.rendit.io/n/JXYQOMUdqMH4vu2pwhl3.svg`}
              />
              <Text3>아이디 기억</Text3>
            </RadioWithLabel> */}
            <WhiteBtn 
              onClick={(e) => WhiteBtnFunction(e, "SignUp")}
              margin={`0px 10px 0px 0px`}
            >
              <Text4 width={`73px`}>회원가입</Text4>
            </WhiteBtn>
            <WhiteBtn
              onClick={(e) => WhiteBtnFunction(e, "LookForID")}
              margin={`0px 10px 0px 0px`}
            >
              <Text4 width={`70px`}>아이디 찾기</Text4>
            </WhiteBtn>
            <WhiteBtn
              onClick={(e) => WhiteBtnFunction(e, "LookForPW")}
              margin={`0`}
            >
              <Text4 width={`78px`}>비밀번호 찾기</Text4>
            </WhiteBtn>
          </FlexRow1>
          <LoginBtn onClick={(e) => LoginBtnFunction(e, "LoginBtn")}>
            <Text7>로그인</Text7>
          </LoginBtn>
        </WhiteFlexColumn>
      </Login>
    </NewRootRoot>
  );
};