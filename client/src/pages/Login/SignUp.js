import React, { useEffect, useState } from "react";
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
} from "./styles/LoginStyle";
import {
  TextBigInter,
  TextSmallInter,
  TextColorArt,
  TextSmallGreen,
} from "./styles/LoginText";
import { DropDown } from "./styles/DropDown";
import { GreenBtn } from "./styles/LoginBtn";
import { signUp } from "../../api/users";
import { ClassNames } from "@emotion/react";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({}) => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [matchpw, setMatchPw] = useState("");
  const [schoolcode, setSchoolCode] = useState("");
  const [classcode, setClassCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    // 사용자 아이디 유효성검사
    const result = USER_REGEX.test(id); // username validcheck
    setValidId(result);
  }, [id]);

  useEffect(() => {
    // 비밀번호 유효성 검사
    const result = PWD_REGEX.test(pw);
    setValidPw(result); // 비밀번호 유효성(길이, 특수문자 등) 검사
    const match = pw === matchpw;
    setValidMatch(match); // 비밀번호 매칭 검사
  });

  const body = {
    id: id,
    password: pw,
    name: name,
    email: email,
    phoneNumber: phone,
    authority: role,
    classCode: "S0000035400103",
  };

  const NewUser = async (e) => {
    console.log(body);
    e.preventDefault();
    try {
      console.log("여기까진");
      await signUp(
        body,
        () => {
          console.log("성공");
          window.location.href = "/signup";
        },
        () => {
          console.log("실패");
        }
      );
    } catch (error) {
      console.log("실패");
    }
  };
  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <Logofixed
            src={`https://file.rendit.io/n/GuXE32OOzWWWXqrS8jTY.png`}
          />
          <DropDown
            setValue={setRole} // 하위 컴포넌트에서 전달한 값 받음
            value={role}
            onChange={({ target: { value } }) => setRole(value)}
          />
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
          <IdForm
            value={id}
            onChange={({ target: { value } }) => setId(value)}
            required
            aria-invalid={validId ? "false" : "true"}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>
              *특수문자, 대문자, 소문자, 숫자를 포함한 12자리 이상
            </TextColorArt>
          </FlexRow>
          <PwForm
            value={pw}
            onChange={({ target: { value } }) => setPw(value)}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 재입력</TextBigInter>
            <TextColorArt color={`#ea5757`}>*비밀번호가 다릅니다</TextColorArt>
          </FlexRow>
          <PwForm />
          <EmptyPart />
          <TextBigInter>이름</TextBigInter>
          <IdForm
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>이메일</TextBigInter>
          </FlexRow>
          <IdForm
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>핸드폰 번호</TextBigInter>
          </FlexRow>
          <IdForm
            value={phone}
            onChange={({ target: { value } }) => setPhone(value)}
          />
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
            <GreenBtn onClick={NewUser}>
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

export default SignUp;
