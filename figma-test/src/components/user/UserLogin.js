import React from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";

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
          <Text1 margin={`0px 0px 1px 3px`}>비밀번호</Text1>
          <PwForm />
          <FlexRow1>
            <RadioWithLabel>
              <Checkbox {...label} />
              <Text3>아이디 기억</Text3>
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
const Column = styled.div`
  position: absolute;
`;
const Text1 = styled.div`
  font-size: 15px;
  font-family: Inter;
  font-weight: 500;
  align-self: flex-start;
  margin: ${(props) => props.margin};
`;
const Text4 = styled.div`
  text-align: center;
  font-size: 11px;
  font-family: Inter;
  font-weight: 500;
  margin: ${(props) => props.margin};
`;
const NewRootRoot = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Login = styled.div`
  width: 1440px;
  background-color: #f4f4f4;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 32px 0px 33px 0px;
`;
const WhiteFlexColumn = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 807px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 76px 181px 76px 168px;
`;
const Removebgpreview = styled.img`
  width: 292px;
  height: 353px;
  margin: 0px 0px 51px 0px;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px 0px 27px 0px;
`;
const Element8 = styled.div`
  width: 0;
  height: 15px;
  position: relative;
`;
const IdForm = styled.input`
  border-color: #096c25;
  border-style: solid;
  width: 406px;
  height: 46px;
  background-color: #ffffff;
  align-self: flex-end;
  border-radius: 5px;
  margin: 0px 0px 36px 0px;
  border-width: 1px;
`;

const PwForm = styled.input.attrs((props) => ({
  type: "password",
}))`
  border-color: #096c25;
  border-style: solid;
  width: 406px;
  height: 46px;
  background-color: #ffffff;
  align-self: flex-end;
  border-radius: 5px;
  margin: 0px 0px 19px 0px;
  border-width: 1px;
`;
const FlexRow1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 0px 0px 19px 0px;
`;
const RadioWithLabel = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  margin: 0px 101px 0px 0px;
`;
const Radio1 = styled.img`
  width: 22px;
  height: 20px;
`;
const Text3 = styled.div`
  font-size: 11px;
  font-family: Inter;
  font-weight: 500;
  line-height: 20px;
`;

const WhiteBtn = styled.button`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
  margin: ${(props) => props.margin};
`;
const LoginBtn = styled.button`
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

const Text7 = styled.div`
  text-align: center;
  width: 410px;
  height: 52px;
  display: flex;
  font-size: 13px;
  font-family: Inter;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
