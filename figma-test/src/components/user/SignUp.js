import React from "react";
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export const SignUp = ({}) => {
  const SpringGreenFlexColumnFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const BackBtn = (e, name) => {
    alert(`${name} was clicked`);
  };
  const [role, setRole] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  return (
    <NewRootRoot>
      <UserForm>
        <WhiteFlexColumn>
        <Logofixed src={`https://file.rendit.io/n/GuXE32OOzWWWXqrS8jTY.png`} />
        <FormControl sx={{ m: 1, minWidth: 420 }} size="small">
      <InputLabel id="demo-select-small">Role</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={role}
        label="Role"
        onChange={handleChange}
      >
        <MenuItem value={10}>Student</MenuItem>
        <MenuItem value={20}>Teacher</MenuItem>
      </Select>
    </FormControl>
        <FlexRow>
          <Text1>아이디 입력</Text1>
          <FlexColumn>
            <Text2 fontSize={`13px`}>*사용 중인 아이디입니다</Text2>
            <Text3>*사용 가능한 아이디입니다</Text3>
          </FlexColumn>
        </FlexRow>
        <InputForm />
        <FlexRow1>
          <Text1>비밀번호 입력</Text1>
          <Text2 fontSize={`12px`}>
            *특수문자, 대문자, 소문자, 숫자를 포함한 12자리 이상
          </Text2>
        </FlexRow1>
        <PwForm />
        <FlexRow2>
          <Text1>비밀번호 재입력</Text1>
          <Text2 fontSize={`12px`}>*비밀번호가 다릅니다</Text2>
        </FlexRow2>
        <PwForm />
        <Text1>이름</Text1>
        <InputForm />
        <FlexRow>
          <Text1>이메일</Text1>
        </FlexRow>
        <InputForm />
        <FlexRow>
        <Text1>핸드폰 번호</Text1>
        </FlexRow>
        <InputForm />
        <FlexRow>
          <Text1>긴급 연락처</Text1>
        </FlexRow>
        <InputForm/>
        <FlexRow4>
        </FlexRow4>
        <FlexRow5>
          <WhiteBtn onClick={(e) => BackBtn(e, "LookForID")}
              margin={`0px 10px 0px 0px`}>
          <Text13>뒤로가기</Text13>
          </WhiteBtn>
          <SpringGreenFlexColumn
            onClick={(e) =>
              SpringGreenFlexColumnFunction(e, "입력")
            }
          >
            <Element16>입력</Element16>
          </SpringGreenFlexColumn>
        </FlexRow5>
        </WhiteFlexColumn>
        </UserForm>
    </NewRootRoot>
  );
};

const WhiteBtn = styled.button`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  border-width: 0px;
  box-sizing: content-box;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
  margin: ${(props) => props.margin};
`;
const NewRootRoot = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserForm = styled.div`
  width: 1440px;
  background-color: #f4f4f4;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 32px 0px 33px 0px;
`;
const Text2 = styled.div`
  font-family: Inter;
  color: #ea5757;
  align-self: flex-end;
  font-size: ${(props) => props.fontSize};
`;
const Text4 = styled.div`
  font-size: 16px;
  font-family: Inter;
`;
const WhiteRectangle1 = styled.div`
  border-color: #096c25;
  border-style: solid;
  width: 406px;
  height: 38px;
  background-color: #ffffff;
  border-radius: 5px;
  border-width: 1px;
  margin: ${(props) => props.margin};
`;
const Text8 = styled.div`
  font-size: 16px;
  font-family: Inter;
  margin: 0px 0px 2px 0px;
`;
const Ellipse2 = styled.img`
  width: 12px;
  height: 12px;
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
const Logofixed = styled.img`
  width: 129px;
  height: 169px;
  
  margin: 0px 0px 15px 0px;
`;
const FlexRow = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 176px;
  align-items: flex-end;
  padding: 0px 3px;
`;
const Text1 = styled.div`
font-size: 15px;
font-family: Inter;
font-weight: 500;
align-self: flex-start;
margin : {0px ,0px, 2px, 0px};
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
const Text3 = styled.div`
  font-size: 13px;
  font-family: Inter;
  color: #486ed0;
`;
const InputForm = styled.input`
border-color: #096c25;
  border-style: solid;
  width: 420px;
  height: 70px;
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
  width: 420px;
  height: 70px;
  background-color: #ffffff;
  align-self: flex-end;
  border-radius: 5px;
  margin: 0px 0px 36px 0px;
  border-width: 1px;
`;
const FlexRow1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 35px;
  align-items: center;
  margin: 0px 0px 2px 0px;
`;
const FlexRow2 = styled.div`
  align-self: stretch;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 190px;
  align-items: flex-start;
`;
const FlexRow3 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  gap: 57px;
  justify-content: center;
  align-items: flex-start;
  margin: 0px 0px 40px 0px;
`;
const FlexColumn1 = styled.div`
  align-self: stretch;
  width: 408px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
`;
const Text9 = styled.div`
  font-size: 16px;
  font-family: Inter;
  align-self: flex-start;
`;
const Text10 = styled.div`
  font-size: 20px;
  font-family: Inter;
  font-weight: 300;
  margin: 8px 0px 0px 0px;
`;
const FlexRow4 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 13px;
  align-items: center;
  padding: 0px 175px;
  margin: 0px 0px 2px 0px;
`;
const FlexRow5 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 289px;
  align-items: center;
`;
const Text13 = styled.a`
  href: "/";
  font-size: 14px;
  font-family: Inter;
  font-weight: 300;
  align-self: flex-end;
  margin: 0px 0px 7px 0px;
`;
const SpringGreenFlexColumn = styled.button`
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
const Element16 = styled.div`
  text-align: center;
  width: 71px;
  height: 32px;
  display: flex;
  font-size: 13px;
  font-family: Inter;
  color: #363636;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const WhiteFlexColumn1 = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 171px;
  background-color: #ffffff;
  display: flex;
  position: absolute;
  top: 734px;
  left: 982px;
  flex-direction: column;
  justify-content: flex-start;
  gap: 13px;
  align-items: center;
  padding: 8px 8px 8px 6px;
`;
const Text14 = styled.div`
  font-size: 20px;
  font-family: Inter;
  font-weight: 300;
  align-self: flex-start;
  margin: 0px 0px 0px 10px;
`;
const Line = styled.img`
  width: 389px;
  height: 1px;
`;
const WhiteText = styled.div`
  display: flex;
  font-size: 20px;
  font-family: Inter;
  font-weight: 300;
  color: #8c8c8c;
  border-color: #096c25;
  border-style: solid;
  width: 380px;
  height: 23px;
  background-color: #ffffff;
  position: absolute;
  top: 696px;
  left: 979px;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 7px 13px 8px 13px;
  border-width: 1px;
`;
const Polygon = styled.img`
  width: 25.98px;
  height: 12px;
  position: absolute;
  top: 696px;
  left: 1349.01px;
`;
