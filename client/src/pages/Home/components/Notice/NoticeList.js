import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoticeItem from "./NoticeItem";
import { getNoticeList } from "../../../../api/notice";
import Button from "../../../../components/Button/Button";
import Pagination from "react-js-pagination";
import "../../../../assets/pagination.css";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";

const NoticeComponentTitle = styled.div`
  height: 80px;
  font-size: 40px;
  font-weight: bolder;
  font-family: "MICEGothic Bold";
  color: green;
`;

const Container = styled.div`
  width: 100%;
  padding: 3rem 5rem;
  box-sizing: border-box;
  height: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width};
`;

const StyledTh = styled.td`
  background-color: #ebffd2;
  height: 2.2rem;
  vertical-align: middle;
  text-align: center;
  font-weight: 600;
  border-radius: 3px;
  color: #999999;
  & + & {
    border-left: 2px solid white;
  }
`;

const PageContainer = styled.div`
  margin-top: 1rem;
`;

function NoticeList() {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] =
    useState(true);
  const [page, setPage] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getNoticeList(page).then((res) => {
        setTotalItemsCount(res.data.total * 10 + res.data.list.length);
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

  const handlePageChange = (page) => {
    setPage(page - 1);
    Navigate(`?page=${page}`);
    setIsLoading(true);
  };

  return (
    <>
      <Container>
        <NoticeComponentTitle>공지사항</NoticeComponentTitle>
        <ButtonContainer>
          {user.authority === "TEACHER" && (
            <Button
              height="30px"
              width="100px"
              name="글쓰기"
              onClick={() => Navigate("./register")}
            />
          )}
        </ButtonContainer>
        <StyledTable>
          <colgroup>
            <StyledCol width="10%"></StyledCol>
            <StyledCol width="50%"></StyledCol>
            <StyledCol width="20%"></StyledCol>
            <StyledCol width="20%"></StyledCol>
          </colgroup>
          <thead>
            <tr>
              <StyledTh>글번호</StyledTh>
              <StyledTh>제목</StyledTh>
              <StyledTh>작성자</StyledTh>
              <StyledTh>등록일</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data &&
              !isLoading &&
              data.map((item, idx) => (
                <NoticeItem
                  index={totalItemsCount - page * 10 - idx - 1}
                  key={item.noticeNo}
                  data={item}
                />
              ))}
          </tbody>
        </StyledTable>
        <PageContainer>
          <Pagination
            activePage={page + 1}
            itemsCountPerPage={10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PageContainer>
      </Container>
    </>
  );
}

export default NoticeList;
