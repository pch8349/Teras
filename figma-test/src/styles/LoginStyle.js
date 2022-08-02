import styled from "styled-components";

const TextBigInter = styled.div`
  font-size: 15px;
  font-family: Inter;
  font-weight: 500;
  align-self: flex-start;
  margin: ${(props) => props.margin};
`;
const TextSmallInter = styled.div`
  text-align: center;
  font-size: 11px;
  font-family: Inter;
  font-weight: 500;
  margin: ${(props) => props.margin};
`;
const NewRoot = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BackForm = styled.div`
  width: 1440px;
  background-color: #f4f4f4;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 32px 0px 33px 0px;
`;
const LoginContent = styled.div`
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
const LogoForm = styled.img`
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
const EmptyPart = styled.div`
  width: 0;
  height: 15px;
  position: relative;
`;
const IdForm = styled.input.attrs({
  placeholderTextColor: "red",
})`
  border-color: #096c25;
  border-style: solid;
  width: 420px;
  height: 30px;
  background-color: #ffffff;
  align-self: center;
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
  height: 30px;
  background-color: #ffffff;
  align-self: center;
  border-radius: 5px;
  margin: 0px 0px 0px 0px;
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

export {
  TextBigInter,
  TextSmallInter,
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
  Radio1,
};
