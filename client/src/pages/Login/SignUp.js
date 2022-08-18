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
import { classCreate, signUp, userCheck } from "../../api/users";
import { ClassNames } from "@emotion/react";
import { errorAlert, successAlert, warnAlert } from "./styles/alert";
import { ReactNewWindowStyles } from "react-new-window-styles";
import SchoolCode from "./SchoolSearch/SchoolCode";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEX = /^(?=.*[0-9]).{11}$/;

const SignUp = ({}) => {
  const Navigate = useNavigate();

  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [matchpw, setMatchPw] = useState("");
  const [schoolname, setSchoolName] = useState("");
  const [schoolcode, setSchoolCode] = useState("");
  const [gradecode, setGradeCode] = useState("");
  const [classcode, setClassCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flag, setFlag] = useState(1);
  const [openSchoolSearch, setOpenSchoolSearch] = useState(false);
  const [trigger, setTrigger] = useState("");

  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validSchoolName, setValidSchoolName] = useState(false);
  const [validGrade, setValidGrade] = useState(false);
  const [validClass, setValidClass] = useState(false);

  const body = {
    id: id,
    password: pw,
    name: name,
    email: email,
    phoneNumber: phone,
    authority: role,
    classCode: schoolcode + gradecode + classcode,
  };

  const ClassMake = async (e) => {
    try {
      await classCreate(
        {
          schoolCode: schoolcode,
          gradeNumber: gradecode,
          classNumber: classcode,
        },
        (response) => {
          console.log("성공");
        },
        () => {
          console.log("전송 실패");
        }
      );
    } catch (error) {
      console.log("아예실패");
    }
  };

  const NewUser = async (e) => {
    e.preventDefault();
    if (
      role !== "" &&
      flag === 0 &&
      validId &&
      validPw &&
      validMatch &&
      validName &&
      validEmail &&
      validPhone &&
      validSchoolName &&
      validGrade &&
      validClass
    ) {
      try {
        await signUp(
          body,
          () => {
            successAlert("회원가입에 성공했습니다.");
            Navigate("/signupfin");
          },
          () => {
            errorAlert(null, "반을 생성했습니다. 다시 입력버튼을 눌러주세요.");
            ClassMake();
          }
        );
      } catch (error) {
        errorAlert("회원가입에 실패했습니다.");
      }
    } else {
      warnAlert("빈 입력사항을 확인해주세요.");
    }
  };

  const openSchoolCode = () => {
    setOpenSchoolSearch(true);
  };
  const closeSchoolCode = () => {
    setOpenSchoolSearch(false);
    if (schoolname.length > 0) setValidSchoolName(true);
  };

  const getDropDownValue = (role) => {
    setRole(role);
  };
  const getDropDownGrade = (role) => {
    setValidGrade(true);
    setGradeCode(role);
  };
  const getDropDownClass = (role) => {
    setValidClass(true);
    setClassCode(role);
  };

  //아이디 중복 검사
  const IdCheck = async (e) => {
    e.preventDefault();
    setTrigger((n) => n + 1);
    if (flag === 0 && validId) {
      successAlert("사용 가능한 아이디입니다");
    } else if (flag === 1 && validId) {
      warnAlert("이미 사용중인 아이디입니다");
    }
  };
  useEffect(() => {
    async function get() {
      try {
        await userCheck(id, (response) => {
          setFlag(() => {
            return response.data.flag;
          });
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
      setValidId(result);
    } else if (e[0].id === "pw") {
      const result = PWD_REGEX.test(e[0].value);
      setValidPw(result);
    } else if (e[0].id === "matchpw") {
      const result = pw === matchpw;
      setValidMatch(result);
    } else if (e[0].id === "name") {
      const result = name.length > 0;
      setValidName(result);
    } else if (e[0].id === "email") {
      const result = email.length < 0;
      setValidEmail(result);
    } else if (e[0].id === "phone") {
      const result = NUM_REGEX.test(e[0].value);
      setValidPhone(result);
    } else if (e[0].id === "schoolname") {
      const result = schoolname.length > 0;
      setValidSchoolName(result);
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

  useEffect(() => {}, [validSchoolName]);

  useEffect(() => {
    // 함수형의 동기를 맞추기 위해 useEffect를 한번 더 사용
  }, [validId]);

  useEffect(() => {}, [validPw]);

  useEffect(() => {}, [validMatch]);

  useEffect(() => {
    setValidMatch(pw === matchpw);
  }, [pw, matchpw]);

  useEffect(() => {
    setValidName(name !== "");
  }, [name, validName]);

  useEffect(() => {
    setValidEmail(email !== "");
  }, [email, validEmail]);

  useEffect(() => {}, [validPhone]);

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          {openSchoolSearch && (
            <ReactNewWindowStyles
              title="학교명찾기"
              onClose={closeSchoolCode}
              windowProps={{ width: 600, height: 650 }}
            >
              <SchoolCode
                setSchoolCode={setSchoolCode}
                setSchoolName={setSchoolName}
                setValidSchoolName={setValidSchoolName}
                onClose={closeSchoolCode}
              />
            </ReactNewWindowStyles>
          )}
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
          <FlexRow>
            <TextBigInter>학교명 입력</TextBigInter>
          </FlexRow>
          <FlexRow>
            <IdForm
              value={schoolname}
              readOnly
              onChange={({ target: { value } }) => {
                setFlag((n) => {
                  return n + 1;
                });
                onValidCheck([{ id: "id", value: value }]);
              }}
            />
            <YellowBtn
              onClick={() => {
                openSchoolCode();
              }}
            >
              학교 검색
            </YellowBtn>
          </FlexRow>
          <EmptyPart />
          <FlexRow>
            <TextBigInter>학년</TextBigInter>
            <div style={{ width: "145px" }}></div>
            <TextBigInter>반</TextBigInter>
          </FlexRow>
          <FlexRow>
            <DropDown
              arr={[
                { id: "01", name: 1 },
                { id: "02", name: 2 },
                { id: "03", name: 3 },
              ]} // 배열로 선택할 값 전달
              getDropDownValue={getDropDownGrade} // 자식 컴포넌트에서 보낸 값 받기 위함
            />
            <DropDown
              arr={[
                { id: "01", name: 1 },
                { id: "02", name: 2 },
                { id: "03", name: 3 },
                { id: "04", name: 4 },
                { id: "05", name: 5 },
                { id: "06", name: 6 },
                { id: "07", name: 7 },
                { id: "08", name: 8 },
                { id: "09", name: 9 },
                { id: "10", name: 10 },
                { id: "11", name: 11 },
                { id: "12", name: 12 },
                { id: "13", name: 13 },
              ]} // 배열로 선택할 값 전달
              getDropDownValue={getDropDownClass} // 자식 컴포넌트에서 보낸 값 받기 위함
            />
          </FlexRow>
          <FlexRow>
            <EmptyPart></EmptyPart>
          </FlexRow>
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
