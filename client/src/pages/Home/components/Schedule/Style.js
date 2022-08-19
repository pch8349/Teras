import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";

const Container = styled.div`
  .react-calendar {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 100%; /*달력과 밑에 표시되는 그날 일정표시 사이 간격 벌어짐 */
    background-color: #5ab151;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    height: 44.5px;
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button {
    color: #fff;
    height: 0px;
    min-width: 44px;
    background: none;
    font-size: 20px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #5ab151;
    color: white;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Style() {
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
    <Container>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (mark[x] === moment(date).format("YYYY-MM-DD")) {
            x++;
            return (
              <>
                <Center>
                  <Dot></Dot>
                </Center>
              </>
            );
          }
        }}
      />
    </Container>
  );
}

export default Style;
