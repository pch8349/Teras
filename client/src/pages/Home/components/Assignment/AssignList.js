import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAssignList } from "../../../../api/assign";
import Button from "../../../../components/Button/Button";
import Pagination from "react-js-pagination";
import AssignItem from "./AssignItem";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const ListContainer = styled.div``;

const AssignmentComponentTitle = styled.div`
  height: 80px;
  font-size: 40px;
  font-weight: bolder;
  font-family: "MICEGothic Bold";
  color: green;
`;

const Container = styled.div`
  width: 980px;
  padding: 3rem 5rem;
  box-sizing: border-box;
  height: 700px;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const StyledSelect = styled.div`
  width: 5rem;
  height: 2rem;
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

function AssignList() {
  const Navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("전체");
  const subjectCode = {
    전체: "all",
    국어: "korean",
    수학: "math",
    영어: "english",
    사회: "social",
    과학: "science",
    음악: "music",
    미술: "art",
  };
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] =
    useState(true);
  const [page, setPage] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getAssignList(subjectCode[selectedSubject], page).then((res) => {
        setTotalItemsCount(res.data.list.length);
        setIsTotalItemsCountLoading(false);
      });
    } else {
      setIsLoading(true);
    }
  }, [isTotalItemsCountLoading]);

  // useEffect 데이터 read
  useEffect(() => {
    if (isLoading) {
      getAssignList(subjectCode[selectedSubject], page).then((res) => {
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

  const onDropDown = (e) => {
    setSelectedSubject(e.target.value);
  };

  useEffect(() => {
    getAssignList(subjectCode[selectedSubject], page)
      .then((res) => {
        setData(res.data.list);
        setIsLoading(false);
      })
      .catch((error) => {});
  }, [selectedSubject]);

  return (
    <ListContainer>
      <Container>
        <AssignmentComponentTitle>과제</AssignmentComponentTitle>
        <ButtonContainer>
          <StyledSelect width="10rem" height="1rem">
            <FormControl fullWidth={true} size="small">
              <InputLabel id="demo-simple-select-label">과목</InputLabel>
              <Select
                style={{ minHeight: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="과목"
                onChange={onDropDown}
              >
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="국어">국어</MenuItem>
                <MenuItem value="수학">수학</MenuItem>
                <MenuItem value="영어">영어</MenuItem>
                <MenuItem value="사회">사회</MenuItem>
                <MenuItem value="과학">과학</MenuItem>
                <MenuItem value="음악">음악</MenuItem>
                <MenuItem value="미술">미술</MenuItem>
              </Select>
            </FormControl>
          </StyledSelect>
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
            <StyledCol width="35%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
            <StyledCol width="15%"></StyledCol>
            <StyledCol width="10%"></StyledCol>
          </colgroup>
          <thead>
            <tr>
              <StyledTh>과목</StyledTh>
              <StyledTh>제목</StyledTh>
              <StyledTh>작성자</StyledTh>
              <StyledTh>등록일</StyledTh>
              <StyledTh>마감일</StyledTh>
              <StyledTh>제출여부</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data &&
              !isLoading &&
              data.map((item, idx) => (
                <AssignItem
                  index={totalItemsCount - page * 10 - idx - 1}
                  key={item.assignNo}
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
    </ListContainer>
  );
}

export default AssignList;
