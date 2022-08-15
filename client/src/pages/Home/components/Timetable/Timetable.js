import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import TimetableItem from "./TimetableItem";
import "./timeTable.css";
import { getTimetable } from "../../../../api/users";

function TimeTable() {
  const user = useSelector(selectUser);
  const authority = user.authority;

  const [totalTimetable, setTotalTimetable] = useState(
    Array.from(Array(5), () => Array(7).fill(""))
  );
  const [todayTimetable, setTodayTimetable] = useState(Array(7).fill("-"));

  const getTimetableDto = async () => {
    await getTimetable(
      (response) => {
        const timetableDto = response.data.list;
        console.log("타임테이블", response);
        if (authority === "TEACHER") {
          const newTimetable = totalTimetable.slice();
          timetableDto.forEach((item) => {
            newTimetable[item.day - 1][item.period - 1] = item.classCode;
          });
          setTotalTimetable(newTimetable);
        } else {
          const newTimetable = Array.from(Array(5), () => new Array(7));
          timetableDto.forEach((item) => {
            newTimetable[item.day - 1][item.period - 1] = item.subjectName;
          });
          setTotalTimetable(newTimetable);
        }
      },
      () => {}
    );
  };

  useEffect(() => {
    let today = new Date();
    //let day = today.getDay();
    let day = 3;
    if (day > 0 && day < 6) {
      setTodayTimetable(totalTimetable[day - 1].slice());
    }
  }, [totalTimetable]);

  useEffect(() => {
    getTimetableDto();
  }, []);

  useEffect(() => {
    let today = new Date();
    let day = today.getDay();
  });

  return (
    <>
      <div
        className="btn-flip"
        data-back="전체 시간표"
        data-front="오늘의 시간표"
      ></div>
      {todayTimetable.map((item, index) => (
        <TimetableItem
          key={index}
          item={item}
          period={index + 1}
          active={item === "" ? "" : "slide"}
        />
      ))}
    </>
  );
}

export default TimeTable;
