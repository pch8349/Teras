import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

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
  height: 3rem;
  vertical-align: middle;
  text-align: ${(props) => props.ta || "center"};
  padding: 0 1.5rem;
`;

function NoticeItem({data, index}) {
    const Navigate = useNavigate();

  return (
    <StyledTr onClick={() => Navigate(`./${data.noticeNo}`)}>
        <StyledTd>{index + 1}</StyledTd>
        <StyledTd>{data.title}</StyledTd>
        <StyledTd>{data.userId}</StyledTd>
        <StyledTd>{data.createdDate}</StyledTd>
    </StyledTr>
  );
};

export default NoticeItem