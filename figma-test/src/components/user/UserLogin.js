import React from "react";
import styled from "styled-components";
export const UserLogin = ({}) => {
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
          <WhiteRectangle />
          <Text1 margin={`0px 0px 1px 3px`}>비밀번호</Text1>
          <WhiteRectangle1 />
          <FlexRow1>
            <RadioWithLabel>
              <Radio1
                src={`https://file.rendit.io/n/JXYQOMUdqMH4vu2pwhl3.svg`}
              />
              <Text3>아이디 기억</Text3>
            </RadioWithLabel>
            <Text4 margin={`1px 19px 0px 0px`}>회원가입</Text4>
            <Text4 margin={`1px 20px 0px 0px`}>아이디 찾기</Text4>
            <Text4 margin={`1px 0px 0px 0px`}>비밀번호 찾기</Text4>
          </FlexRow1>
          <SpringGreenText>로그인</SpringGreenText>
        </WhiteFlexColumn>
      </Login>
    </NewRootRoot>
  );
};
const Column = styled.div`
  position: absolute;
`;
const Text1 = styled.div`
  font-size: 20px;
  font-family: GangwonEduAll;
  font-weight: 700;
  align-self: flex-start;
  margin: ${(props) => props.margin};
`;
const Text4 = styled.div`
  text-align: center;
  font-size: 15px;
  font-family: GangwonEduAll;
  font-weight: 700;
  margin: ${(props) => props.margin};
`;
const NewRootRoot = styled.div`
  width: 1440px;
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
const WhiteRectangle = styled.div`
  border-color: #096c24;
  border-style: solid;
  width: 406px;
  height: 46px;
  background-color: #fdfdfd;
  align-self: flex-end;
  border-radius: 5px;
  margin: 0px 0px 36px 0px;
  border-width: 1px;
`;
const WhiteRectangle1 = styled.div`
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
  font-size: 15px;
  font-family: GangwonEduAll;
  font-weight: 700;
  line-height: 20px;
`;
const SpringGreenText = styled.div`
  display: flex;
  font-size: 15px;
  font-family: GangwonEduAll;
  font-weight: 700;
  width: 411px;
  height: 17px;
  background-color: #e0ffc1;
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  padding: 18px 0px 16px 0px;
`;
