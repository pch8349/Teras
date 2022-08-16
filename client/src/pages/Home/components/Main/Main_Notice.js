import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNoticeList } from "api/notice";

function Main_Notice({}) {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] =
    useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getNoticeList(page).then((res) => {
        setTotalItemsCount(3);
        setIsTotalItemsCountLoading(false);
      });
    } else {
      setIsLoading(true);
    }
  }, [isTotalItemsCountLoading]);

  // useEffect 데이터 read
  useEffect(() => {
    if (isLoading) {
      getNoticeList(page).then((res) => {
        setData(res.data.list);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Container>
      <StyledTable>
        <colgroup>
          <StyledCol width="70%"></StyledCol>
          <StyledCol width="30%"></StyledCol>
        </colgroup>
        <thead>
          <tr>
            <StyledTh>제목</StyledTh>
            <StyledTh>작성자</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data &&
            !isLoading &&
            data.slice(0, 4).map((item, totalItemsCount) => (
              <StyledTr
                data={item}
                onClick={() => Navigate(`/notice/${item.noticeNo}`)}
              >
                <StyledTd>{item.title}</StyledTd>
                <StyledTd>{item.name}</StyledTd>
              </StyledTr>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

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

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 80%;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width};
`;

const StyledTh = styled.td`
  background-color: #fec25c;
  height: 2.2rem;
  vertical-align: middle;
  text-align: center;
  font-weight: 600;
  border-radius: 3px;
  color: black;
  & + & {
    border-left: 2px solid white;
  }
`;

export default Main_Notice;
