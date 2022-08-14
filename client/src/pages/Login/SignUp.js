import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
import { errorAlert, successAlert, warnAlert } from "./styles/alert";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEX = /^(?=.*[0-9]).{11}$/;
const TEXT_REGEX = /^.{0, 24}$/;

const SignUp = ({}) => {
  const Navigate = useNavigate();

  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [matchpw, setMatchPw] = useState("");
  const [schoolcode, setSchoolCode] = useState("");
  const [classcode, setClassCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flag, setFlag] = useState(1);
  const [trigger, setTrigger] = useState("");

  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const body = {
    id: id,
    password: pw,
    name: name,
    email: email,
    phoneNumber: phone,
    authority: role,
    classCode: "S0000035400101",
  };

  const NewUser = async (e) => {
    console.log("login flag", flag);
    console.log(body);
    e.preventDefault();
    if (
      role !== "" &&
      flag === 0 &&
      validId &&
      validPw &&
      validMatch &&
      validName &&
      validEmail &&
      validPhone
    ) {
      try {
        console.log("입력버튼");
        await signUp(
          body,
          () => {
            successAlert("회원가입에 성공했습니다.");
            Navigate("/signupfin");
          },
          () => {
            errorAlert(null, "회원가입에 실패했습니다.");
          }
        );
      } catch (error) {
        errorAlert("회원가입에 실패했습니다.");
      }
    } else {
      warnAlert("빈 입력사항을 확인해주세요.");
      console.log(
        role,
        flag,
        validId,
        validPw,
        validMatch,
        validName,
        validEmail,
        validPhone
      );
    }
  };
  const getDropDownValue = (role) => {
    setRole(role);
    console.log(role);
  };

  //아이디 중복 검사
  const IdCheck = async (e) => {
    e.preventDefault();
    setTrigger((n) => n + 1);
    console.log("이번");
    if (flag === 0 && validId) {
      successAlert("사용 가능한 아이디입니다");
    } else if (flag === 1 && validId) {
      warnAlert("이미 사용중인 아이디입니다");
    }
  };
  useEffect(() => {
    console.log("일번");
    async function get() {
      try {
        await userCheck(id, (response) => {
          setFlag(() => {
            return response.data.flag;
          });
          console.log("IdCheck", flag);
        });
      } catch (error) {
        console.log("error");
      }
    }
    get();
  }, [flag]);
  // 유효성 체크. useCallBack은 함수의 재사용을 위함
  const onValidCheck = useCallback((e) => {
    if (e[0].id === "id") {
      const result = USER_REGEX.test(e[0].value);
      console.log("id", result);
      setValidId(result);
    } else if (e[0].id === "pw") {
      const result = PWD_REGEX.test(e[0].value);
      console.log("pw", result);
      setValidPw(result);
    } else if (e[0].id === "matchpw") {
      const result = pw === matchpw;
      console.log("pwd", result);
      setValidMatch(result);
    } else if (e[0].id === "name") {
      const result = name.length > 0;
      console.log("name", result);
      setValidName(result);
    } else if (e[0].id === "email") {
      const result = email.length < 0;
      console.log("asdfasdf", email);
      setValidEmail(result);
    } else if (e[0].id === "phone") {
      const result = NUM_REGEX.test(e[0].value);
      console.log("phone", result);
      setValidPhone(result);
    }
  }, []);

  const idUnderLine = () => {
    if (!validId) {
      return (
        <TextColorArt color={`#ea5757`}>
          *아이디 길이는 4~22자 내 영문/숫자로만 가능합니다
        </TextColorArt>
      );
    }
  };

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

  useEffect(() => {
    console.log(validName);
    setValidName(name !== "");
  }, [name, validName]);

  useEffect(() => {
    console.log(validEmail);
    setValidEmail(email !== "");
  }, [email, validEmail]);

  useEffect(() => {
    console.log(validPhone);
  }, [validPhone]);

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <Logofixed
            src={`https://file.rendit.io/n/GuXE32OOzWWWXqrS8jTY.png`}
          />
          <FlexRow>
            <TextBigInter>역할 입력</TextBigInter>
          </FlexRow>
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
            <FlexColumn>{idUnderLine()}</FlexColumn>
          </FlexRow>
          <FlexRow>
            <IdForm
              value={id}
              onChange={({ target: { value } }) => {
                setId(value);
                setFlag((n) => {
                  return n + 1;
                });
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
          <FlexRow>
            <TextBigInter>이름</TextBigInter>
            <FlexColumn>
              {!validName && (
                <TextColorArt color={`#ea5757`}>
                  *값을 입력해 주세요
                </TextColorArt>
              )}
            </FlexColumn>
          </FlexRow>
          <IdForm
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
              onValidCheck([{ id: "name", value: value }]);
            }}
          />
          <EmptyPart />
          {/* <FlexRow>
            <DropDown
              arr={[
                { id: "TEACHER", name: "교사" },
                { id: "STUDENT", name: "학생" },
              ]} // 배열로 선택할 값 전달
              getDropDownValue={getDropDownValue} // 자식 컴포넌트에서 보낸 값 받기 위함
            />
            <DropDown
              arr={[
                { id: "TEACHER", name: "교사" },
                { id: "STUDENT", name: "학생" },
              ]} // 배열로 선택할 값 전달
              getDropDownValue={getDropDownValue} // 자식 컴포넌트에서 보낸 값 받기 위함
            />
          </FlexRow>
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow> */}
          <FlexRow>
            <TextBigInter>이메일</TextBigInter>
            <FlexColumn>
              {!validEmail && (
                <TextColorArt color={`#ea5757`}>
                  *값을 입력해 주세요
                </TextColorArt>
              )}
            </FlexColumn>
          </FlexRow>
          <IdForm
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value);
              onValidCheck([{ id: "email", value: value }]);
            }}
          />
          <EmptyPart />
          <FlexRow>
            <TextBigInter>핸드폰 번호</TextBigInter>
            <FlexColumn>
              {!validPhone && (
                <TextColorArt color={`#0087FF`}>
                  *숫자만 입력해 주세요
                </TextColorArt>
              )}
            </FlexColumn>
          </FlexRow>
          <IdForm
            value={phone}
            onChange={({ target: { value } }) => {
              setPhone(value);
              onValidCheck([{ id: "phone", value: value }]);
            }}
          />
          <EmptyPart />
          <FlexRow1>
            <LinkContainer>
              <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
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
