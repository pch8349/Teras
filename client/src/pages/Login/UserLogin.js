import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
} from "./styles/LoginStyle";
import { TextBigInter, TextSmallInter, TextBtnInter } from "./styles/LoginText";
import { GreenBtn } from "./styles/LoginBtn";
import { useDispatch } from "react-redux";
import { doLogin, getUser } from "api/users";
import { login, isLogined } from "storage/UserSlice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const UserLogin = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPw] = useState("");
  const [success, setSuccess] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const OnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") setId(value);
    else if (name === "pw") setPw(value);
  };

  const getJWTData = async () => {
    console.log("이번");
    try {
      console.log("세션 세부", sessionStorage.getItem("accessToken"));
      await getUser(
        async (response) => {
          console.log("리스폰스", response);
          const res = response.data.user;
          dispatch(
            login({
              // type: "login",
              // payload: {
              id: res.id,
              name: res.name,
              email: res.email,
              phoneNumber: res.phoneNumber,
              classCode: res.classCode,
              authority: res.authority,
              schoolName: res.schoolName,
              subjectCode: res.subjectCode,
              isLogin: true,
              schoolName: res.schoolName,
              subjectCode: res.subjectCode,
              // },
            })
            // isLogined(true)
          );

          Navigate("/main");
        },
        (error) => {
          console.log("getUser 에러입니다", error);
        }
      );
    } catch (e) {
      console.log("걍 에러");
    }
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("일번");
      await doLogin(
        { id, password },
        (response) => {
          const accessToken = response.data.accessToken;
          sessionStorage.setItem("accessToken", accessToken);
          if (ischecked) {
            localStorage.setItem("accessToken", accessToken);
          }

          setSuccess(true);
        },
        () => {
          console.log("로그인 실패");
          setSuccess(false);
        }
      );
    } catch (error) {
      console.log("3333", error);
    }
    console.log("4444");
    getJWTData();
  };

  useEffect(() => {
    console.log(success);
  }, [success]);

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <LogoForm src={"/Teras_logo_login.png"} />
          <form onSubmit={OnSubmit}>
            <TextBigInter>아이디</TextBigInter>
            <IdForm
              name="id"
              value={id}
              onChange={OnChange}
              placeholder="아이디를 입력하세요"
            />
            <FlexRow>
              <EmptyPart></EmptyPart>
            </FlexRow>
            <TextBigInter>비밀번호</TextBigInter>
            <PwForm
              name="pw"
              value={password}
              onChange={OnChange}
              placeholder="비밀번호를 입력하세요"
            />
            <FlexRow1>
              <RadioWithLabel>
                <Checkbox
                  checked={ischecked}
                  onChange={() => setIsChecked(!ischecked)}
                  {...label}
                />
                <TextSmallInter>아이디 기억</TextSmallInter>
              </RadioWithLabel>
              <LinkContainer>
                <Link
                  to={"/signup"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <TextSmallInter>회원가입</TextSmallInter>
                </Link>
              </LinkContainer>
            </FlexRow1>
            <InputContainer>
              {!success && (
                <TextHiddenAlrt>
                  아이디 또는 비밀번호를 확인해주세요.
                </TextHiddenAlrt>
              )}
            </InputContainer>
            <GreenBtn>
              <TextBtnInter>로그인</TextBtnInter>
            </GreenBtn>
          </form>
        </LoginContent>
      </BackForm>
    </NewRoot>
  );
};

const InputContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: 30px;
`;

const TextHiddenAlrt = styled.div`
  text-align: center;
  font-size: 14px;
  font-family: Inter;
  font-weight: 700;
  color: red;
`;

export default UserLogin;
