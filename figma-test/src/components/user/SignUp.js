import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  NewRoot,
  BackForm,
  LoginContent,
  IdForm,
  PwForm,
  FlexRow,
  FlexRow1,
  EmptyPart,
  LinkContainer,
} from "../../styles/LoginStyle";
import {
  TextBigInter,
  TextSmallInter,
  TextColorArt,
  TextSmallGreen,
} from "../../styles/LoginText";
import { DropDown } from "../../styles/DropDown";
import { GreenBtn } from "../../styles/LoginBtn";

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
          {/* <PwFormmargin /> */}
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
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
          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>
              *특수문자, 대문자, 소문자, 숫자를 포함한 12자리 이상
            </TextColorArt>
          </FlexRow>
          <PwForm />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 재입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>*비밀번호가 다릅니다</TextColorArt>
          </FlexRow>
          <PwForm />
          <EmptyPart />
          <TextBigInter>이름</TextBigInter>
          <IdForm />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>이메일</TextBigInter>
          </FlexRow>
          <IdForm />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>핸드폰 번호</TextBigInter>
          </FlexRow>
          <IdForm />
          <EmptyPart />
          <FlexRow1>
            <LinkContainer>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <TextSmallInter>뒤로가기</TextSmallInter>
              </Link>
            </LinkContainer>
            <GreenBtn onClick={(e) => SpringGreenFlexColumnFunction(e, "입력")}>
              <TextSmallGreen>입력</TextSmallGreen>
            </GreenBtn>
          </FlexRow1>
        </LoginContent>
      </BackForm>
    </NewRoot>
  );
};
const Logofixed = styled.img`
  width: 129px;
  height: 169px;

  margin: 0px 0px 15px 0px;
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
