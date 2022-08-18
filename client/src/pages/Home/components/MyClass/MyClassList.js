import React, {useEffect, useState} from 'react'
import { getMyClass } from 'api/myclass';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MyClassItem from './MyClassItem';
import styled from 'styled-components';


const ListContainer = styled.div`
  height: 700px;
  overflow: auto;
`

const TitleContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  text-align: center;
  justify-content: center;
  line-height: 100px;
  font-size: 1.5em;
  box-shadow: 0px 0.2px #525252;
`

const TeacherContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  justify-content: center;
  font-size: 1.5em;
  align-items: center;
`
const TextContainer = styled.div`
  margin-top: 30px;
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
  var [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTeacherLoading, setIsTeacherLoading] = useState(false);
  const Navigate = useNavigate();
  var [total, setTotal] = useState(0);
  const [teacherData, setTeacherData] = useState(null);
  
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
      })
    }else{
      setIsTeacherLoading(true);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isTeacherLoading) {
      getMyClass()
      .then((res) => {
        res.data.list.forEach((element) => {
          if (element.authority === 'TEACHER') {
            setTeacherData(element);
            setIsTeacherLoading(false);
          };
        })
      })
    }
  },[isTeacherLoading]);         


  useEffect(() => {
    if (data) {
      for (var j = 0; j<total; j++) {
        if (data[j].authority === 'TEACHER') {
          data.splice(j, 1);
          j--;
          total--;
        }
      }
    }
  },[data])
  
  return (
    <ListContainer>
      {teacherData &&
        !isTeacherLoading && (
      <TitleContainer>
        {teacherData.gradeNumber.slice(1,2)}학년 {teacherData.classNumber.slice(1,2)}반
      </TitleContainer>
        )}
      <TeacherContainer>
        <TextContainer>담임 선생님</TextContainer>
        {teacherData &&
          !isTeacherLoading && (
            <MyClassItem
              index={1}
              key={teacherData.id}
              data={teacherData}
            />
          )}
        <TextContainer>학생</TextContainer>
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
    </ListContainer>
  )
}

export default MyClassList