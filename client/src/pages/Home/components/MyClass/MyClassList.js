import React, {useEffect, useState} from 'react'
import { getMyClass } from 'api/myclass';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MyClassItem from './MyClassItem';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  text-align: center;
  justify-content: center;
  box-shadow: 0px 0.2px #525252;
  line-height: 100px;
  font-size: 1.5em;
`

const TeacherContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  text-align: center;
  justify-content: center;
  box-shadow: 0px 0.2px #525252;
  line-height: 100px;
  font-size: 1.5em;
`

const StudentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`

const StudentItem = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column: span 5;
  align-items: center;
  justify-items: center;
  margin-top: 30px;
`

function MyClassList() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const Navigate = useNavigate();
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    if (isLoading) {
      getMyClass()
      .then((res) => {
        setData(res.data.list);
        setTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: `${e.response.status} Error`,
          text: '우리반을 불러올 수 없습니다.',
        });
        Navigate('../');
        setIsLoading(false);
      })
    };
  }, [isLoading]);

  return (
    <div>
      <TitleContainer>
        {data[0].gradeNumber.slice(1,2)}학년 {data[0].classNumber.slice(1,2)}반
      </TitleContainer>
      <TeacherContainer>
        담임 선생님
      </TeacherContainer>
      <StudentContainer>
        <StudentItem>
        {data &&
          !isLoading &&
          data.map((item, idx) => (
            <MyClassItem
              index={total - idx - 1}
              key={item.id}
              data={item}
            />
          ))}
        </StudentItem>
      </StudentContainer>
    </div>
  )
}

export default MyClassList