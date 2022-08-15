import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAssignList } from '../../../../api/assign';
import Button from '../../../../components/Button/Button';
import Pagination from 'react-js-pagination';
import AssignItem from './AssignItem';

const Container = styled.div`
  width: 100%;
  padding: 1rem 5rem;
  box-sizing: border-box;
  height: 80%;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-bottom: 1rem;
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

const PageContainer = styled.div`
  margin-top: 1rem;
`;

function AssignList() {
  const Navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('전체')
  const subjectCode = {
    전체: 'all',
    국어: 'korean',
    수학: 'math',
    영어: 'english',
    사회: 'social',
    과학: 'science',
    음악: 'music',
    미술: 'art',
  };
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (isTotalItemsCountLoading) {
      getAssignList(subjectCode[selectedSubject], page).then((res) => {
        setTotalItemsCount(res.data.total*10 + res.data.list.length);
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
    setSelectedSubject(e.target.value)
  };

  useEffect(()=>{
    getAssignList(subjectCode[selectedSubject], page)
    .then((res) => {
      setData(res.data.list);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error)
      console.log(subjectCode[selectedSubject])
    });
  }, [selectedSubject])


  return (
  <>
    <Title>공지사항</Title>
    <Container>
      <ButtonContainer>
        <div>
          <select 
            onChange = {onDropDown}
            >
            <option value="전체">전체</option>
            <option value="국어">국어</option>
            <option value="수학">수학</option>
            <option value="영어">영어</option>
            <option value="사회">사회</option>
            <option value="과학">과학</option>
            <option value="음악">음악</option>
            <option value="미술">미술</option>
          </select>
        </div>
        <Button
          name='글쓰기'
          onClick={()=> Navigate("./register")} />
      </ButtonContainer>
      <StyledTable>
        <colgroup>
          <StyledCol width="10%"></StyledCol>
          <StyledCol width="45%"></StyledCol>
          <StyledCol width="15%"></StyledCol>
          <StyledCol width="15%"></StyledCol>
          <StyledCol width="15%"></StyledCol>
        </colgroup>
        <thead>
          <tr>
            <StyledTh>과목</StyledTh>
            <StyledTh>제목</StyledTh>
            <StyledTh>작성자</StyledTh>
            <StyledTh>등록일</StyledTh>
            <StyledTh>마감일</StyledTh>
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
      </Container>
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
  </>
  )
}

export default AssignList