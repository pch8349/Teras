import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, matchPath } from "react-router-dom";
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
import { GreenBtn, YellowBtn } from "./styles/LoginBtn";
import { signUp, userCheck } from "../../api/users";
import { ClassNames } from "@emotion/react";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEX = /^(?=.*[0-9]).{11}$/;

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
  const [flag, setFlag] = useState("0");

  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

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
    console.log(validId);
    e.preventDefault();
    try {
      console.log("입력버튼");
      if (validId && validPw && validMatch) {
        await signUp(
          body,
          () => {
            console.log("성공");
            window.location.href = "/signupfin";
          },
          () => {
            console.log("실패");
          }
        );
      } else console.log("유효성 테스트 실패");
    } catch (error) {
      console.log("실패");
    }
  };
  const getDropDownValue = (role) => {
    setRole(role);
    console.log(role);
  };
  //아이디 중복 검사
  const IdCheck = async (e) => {
    e.preventDefault();
    try {
      await userCheck(
        id,
        (response) => {
          setFlag(response.data.flag);
          console.log("response", flag);
        },
        () => {
          console.log("실패");
        }
      );
    } catch (error) {
      console.log("실패");
    }
  };

  // 유효성 체크. useCallBack은 함수의 재사용을 위함
  const onValidCheck = useCallback((e) => {
    if (e[0].id === "id") {
      const result = USER_REGEX.test(e[0].value);
      setValidId(result);
    } else if (e[0].id === "pw") {
      const result = PWD_REGEX.test(e[0].value);
      setValidPw(result);
    } else if (e[0].id === "matchpw") {
      const result = pw === matchpw;
      setValidMatch(result);
    }
  }, []);

  const idUnderLine = () => {
    console.log("i'm here");
    if(flag==="1"){
      console.log("아닛!");
      return <TextColorArt color={`#ea5757`}>
      *이미 사용중인 아이디입니다.
    </TextColorArt>
    } else if(validId) {
      return <TextColorArt color={`#ea5757`}>
                *아이디 길이는 4~22자 내로 가능합니다
              </TextColorArt>
    } else{
      return <TextColorArt color={`#0087FF`}>*사용 가능한 아이디입니다</TextColorArt>
    }
  };

  useEffect(() => {
    console.log(flag);
  }, [flag]);

  useEffect(() => {
    // 함수형의 동기를 맞추기 위해 useEffect를 한번 더 사용
    console.log(validId);
  }, [validId]);

  useEffect(() => {
    console.log(validPw);
  }, [validPw]);

  useEffect(() => {
    console.log(validMatch);
  }, [validMatch]);

  useEffect(() => {
    console.log(pw, matchpw);
    setValidMatch(pw === matchpw);
  }, [pw, matchpw]);

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <Logofixed
            src={`https://file.rendit.io/n/GuXE32OOzWWWXqrS8jTY.png`}
          />
          <DropDown
            arr={[
              { id: "TEACHER", name: "교사" },
              { id: "STUDENT", name: "학생" },
            ]} // 배열로 선택할 값 전달
            getDropDownValue={getDropDownValue} // 자식 컴포넌트에서 보낸 값 받기 위함
          />
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
          <FlexRow>
            <TextBigInter>아이디 입력</TextBigInter>
            <FlexColumn>
              {/* {if(validId){
                (<TextColorArt color={`#ea5757`}>
                *아이디 길이는 4~22자 내로 가능합니다
              </TextColorArt>
              )} else{
                (<TextColorArt color={`#0087FF`}>*사용 가능한 아이디입니다</TextColorArt>)
              } */}
              {idUnderLine()}
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <IdForm
              value={id}
              onChange={({ target: { value } }) => {
                setId(value);
                onValidCheck([{ id: "id", value: value }]);
              }}
            />
            <YellowBtn onClick={IdCheck}>아이디 검사</YellowBtn>
          </FlexRow>

          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 입력</TextBigInter>
            <FlexColumn>
              {!validPw && (
                <TextColorArt color={`#ea5757`}>
                  *특수문자, 대문자, 소문자, 숫자를 포함한 8~24자리
                </TextColorArt>
              )}
            </FlexColumn>
          </FlexRow>
          <PwForm
            value={pw}
            onChange={({ target: { value } }) => {
              setPw(value);
              onValidCheck([{ id: "pw", value: value }]);
            }}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>비밀번호 재입력</TextBigInter>
            <FlexColumn>
              {!validMatch && (
                <TextColorArt color={`#ea5757`}>
                  *비밀번호가 다릅니다
                </TextColorArt>
              )}
            </FlexColumn>
          </FlexRow>
          <PwForm
            value={matchpw}
            onChange={({ target: { value } }) => {
              setMatchPw(value);
              onValidCheck([{ id: "matchpw", value: value }]);
            }}
          />
          <EmptyPart />
          <TextBigInter>이름</TextBigInter>
          <IdForm
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
            }}
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
            <FlexColumn>
              <TextColorArt color={`#0087FF`}>
                *숫자만 입력해 주세요
              </TextColorArt>
            </FlexColumn>
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
