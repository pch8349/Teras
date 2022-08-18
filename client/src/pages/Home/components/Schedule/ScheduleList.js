import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment, { locale } from 'moment';
import styled from "styled-components";


const Dot = styled.div `
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
` 



function ScheduleList() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([
    "2022-08-18","2022-08-19","2022-08-20"
  ]);
  const [data, setData] = useState({
    "2022-8-18" : "공통 마지막 오프라인",
    "2022-8-19" : "공통 발표날",
    "2022-8-20" : "뒷풀이는 국룰"
  })
  
  const [event, setEvent] = useState(null);

  useEffect(()=>{
    const day = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate()

    if (data[day]) {
      setEvent(data[day]);
    } else {
      setEvent("오늘의 일정은 없습니다.")
    }
  },[value])
  
  return (
    <div>
      <Calendar 
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        className="mx-auto w-full text-sm border-b"
        tileContent={({date, view}) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <Dot></Dot>
                </div>
              </>
            );
          }
        }}
        />
      <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      {event && (
        <div>{event}</div>
      )}
    </div>
  );
};

export default ScheduleList;

