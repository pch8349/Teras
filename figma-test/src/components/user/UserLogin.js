import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
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
  LinkContainer,
} from "../../styles/LoginStyle";
import {
  TextBigInter,
  TextSmallInter,
  TextBtnInter,
} from "../../styles/LoginText";
import { GreenBtn } from "../../styles/LoginBtn";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const UserLogin = ({}) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const LoginBtnFunction = (e, name) => {
    alert(`${name} was clicked`);
  };

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <LogoForm src={`https://file.rendit.io/n/hqghxg3SfioHvsa6lVy3.png`} />

          <TextBigInter>아이디</TextBigInter>
          <IdForm
            value={id}
            onChange={({ target: { value } }) => setId(value)}
            placeholder="아이디를 입력하세요"
          />
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
          <TextBigInter>비밀번호</TextBigInter>
          <PwForm value={pw} placeholder="비밀번호를 입력하세요" />
          <FlexRow1>
            <RadioWithLabel>
              <Checkbox {...label} />
              <TextSmallInter>아이디 기억</TextSmallInter>
            </RadioWithLabel>
            <LinkContainer>
              <Link
                to={"/signUp"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <TextSmallInter>회원가입</TextSmallInter>
              </Link>
            </LinkContainer>
          </FlexRow1>
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
          <GreenBtn onClick={(e) => LoginBtnFunction(e, "LoginBtn")}>
            <TextBtnInter>로그인</TextBtnInter>
          </GreenBtn>
        </LoginContent>
      </BackForm>
    </NewRoot>
  );
};
