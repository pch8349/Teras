import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate } from "react-router-dom";
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
import { doLogin, getUser } from "../../api/users";
import { Cookies } from "react-cookie";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const UserLogin = ({}) => {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");
  const [success, setSuccess] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doLogin(
        { id, password },
        async (response) => {
          const accessToken = response.data.accessToken;
          if (ischecked) {
            localStorage.setItem("accessToken", accessToken);
          } else {
            sessionStorage.setItem("accessToken", accessToken);
          }
          setSuccess(true);

          try {
            await getUser(
              async (response) => {
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("userName", response.data.user.name);
                Cookies.setItem("userId", response.data.user.id);
              },
              (error) => {
                console.log(error);
              }
            );
          } catch {}

          Navigate("/");
        },
        () => {
          console.log("로그인 실패");
          setSuccess(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(success);
  }, [success]);

  return (
    <NewRoot>
      <BackForm>
        <LoginContent>
          <LogoForm src={`https://file.rendit.io/n/hqghxg3SfioHvsa6lVy3.png`} />
          <form onSubmit={onSubmit}>
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
            <PwForm
              value={password}
              onChange={({ target: { value } }) => setPw(value)}
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
