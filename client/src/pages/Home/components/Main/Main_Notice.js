import styled from "styled-components";
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
      <SubjectText onClick={() => Navigate(`/notice`)}>공지사항</SubjectText>
      <StyledTable>
        <colgroup>
          <StyledCol width="70%"></StyledCol>
          <StyledCol width="30%"></StyledCol>
        </colgroup>
        <tbody>
          {data &&
            !isLoading &&
            data.slice(0, 4).map((item) => (
              <StyledTr data={item}>
                <StyledTd>
                  <TextClick
                    onClick={() => Navigate(`/notice/${item.noticeNo}`)}
                  >
                    <span>{item.title}</span>
                  </TextClick>
                </StyledTd>
                <StyledTd>{item.name}</StyledTd>
              </StyledTr>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

const TextClick = styled.div`
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  width: 100%;
`;

const SubjectText = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 5px 0;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  background-color: #5ab151;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const StyledTr = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: ${({ theme }) => theme.noticeHoverColor};
  }
`;

const StyledTd = styled.td`
  border-bottom: 1px solid #ddd;
  height: 3rem;
  vertical-align: middle;
  text-align: ${(props) => props.ta || "left"};
  padding: 0 1.5rem;
  box-shadow: 0 0.4px #525252;
`;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 80%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width};
`;

export default Main_Notice;
