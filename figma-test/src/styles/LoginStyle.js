import styled from "styled-components";

const Column = styled.div`
  position: absolute;
`;
const Text1 = styled.div`
  font-size: 15px;
  font-family: Inter;
  font-weight: 500;
  align-self: flex-start;
  margin: ${(props) => props.margin};
`;
const Text4 = styled.div`
  text-align: center;
  font-size: 11px;
  font-family: Inter;
  font-weight: 500;
  margin: ${(props) => props.margin};
`;
const NewRootRoot = styled.div`
  width: auto;
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
const IdForm = styled.input`
  border-color: #096c25;
  border-style: solid;
  width: 406px;
  height: 46px;
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
  margin: 0px 120px 0px 0px;
`;
const Radio1 = styled.img`
  width: 22px;
  height: 20px;
`;
const Text3 = styled.div`
  font-size: 11px;
  font-family: Inter;
  font-weight: 500;
  line-height: 20px;
`;

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
const LoginBtn = styled.button`
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

const Text7 = styled.div`
  text-align: center;
  width: 410px;
  height: 52px;
  display: flex;
  font-size: 13px;
  font-family: Inter;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export {
    Column,
    Text1,
    Text4,
    NewRootRoot,
    Login,
    WhiteFlexColumn,
    Removebgpreview,
    FlexRow,
    Element8,
    IdForm,
    PwForm,
    FlexRow1,
    RadioWithLabel,
    Radio1,
    Text3,
    WhiteBtn,
    LoginBtn,
    Text7
};