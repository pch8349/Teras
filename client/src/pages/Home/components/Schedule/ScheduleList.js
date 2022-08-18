import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import "./Calendar.css";
import moment, { locale } from "moment";
import styled from "styled-components";

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

const Center = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function ScheduleList() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState(["2022-08-18", "2022-08-19", "2022-08-20"]);
  const [data, setData] = useState({
    "2022-08-18": "오프라인",
    "2022-08-19": "발표날",
    "2022-08-20": "뒷풀이",
  });

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const day =
      value.getFullYear() +
      "-" +
      (value.getMonth() + 1) +
      "-" +
      value.getDate();

    if (data[day]) {
      setEvent(data[day]);
    } else {
      setEvent("오늘의 일정은 없습니다.");
    }
  }, [value]);
  var x = 0;

  return (
    <Center>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (mark[x] === moment(date).format("YYYY-MM-DD")) {
            return (
              <>
                <Center>
                  <Dot />
                  {data[mark[x++]]}
                </Center>
              </>
            );
          }
        }}
      />
      {/* <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      {event && <div>{event}</div>} */}
    </Center>
  );
}

export default ScheduleList;
