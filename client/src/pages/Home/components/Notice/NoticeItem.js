import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.noticeHoverColor};
  }
  & + & {
    border-top: 1px solid #dedede;
  }
`;

const StyledTd = styled.td`
  height: 4.5rem;
  vertical-align: middle;
  text-align: ${(props) => props.ta || "center"};
  padding: 0 1.5rem;
  box-shadow: 0.2px 0.2px #525252;
`;

function NoticeItem({ data, index }) {
  const Navigate = useNavigate();

  return (
    <StyledTr onClick={() => Navigate(`./${data.noticeNo}`)}>
      <StyledTd>{index + 1}</StyledTd>
      <StyledTd>{data.title}</StyledTd>
      <StyledTd>{data.name}</StyledTd>
      <StyledTd>{data.createdDate.slice(0, 16)}</StyledTd>
    </StyledTr>
  );
}

export default NoticeItem;
