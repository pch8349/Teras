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
  box-shadow: 0.2px 0.2px #525252;
`;

function AssignItem({data, index}) {
  const Navigate = useNavigate();
  const submit = ['미제출','제출']

  return (
    <StyledTr onClick={() => Navigate(`./${data.assignNo}`)}>
        <StyledTd>{data.subjectName}</StyledTd>
        <StyledTd>{data.title}</StyledTd>
        <StyledTd>{data.name}</StyledTd>
        <StyledTd>{data.createdDate.slice(0,16)}</StyledTd>
        <StyledTd>{data.deadLine}</StyledTd>
        <StyledTd>{submit[data.state]}</StyledTd>
    </StyledTr>
  );
}

export default AssignItem