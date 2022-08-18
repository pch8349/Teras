import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import TimetableItem from "./TimetableItem";
import "./timeTable.css";
import { getTimetable } from "../../../../api/users";
import { Modal, Box } from "@mui/material";

function TimeTable() {
  const user = useSelector(selectUser);

  const authority = user.authority;

  const [totalTimetable, setTotalTimetable] = useState(
    Array.from(Array(5), () => Array(7).fill("")),
  );
  const [todayTimetable, setTodayTimetable] = useState(Array(7).fill("-"));
  const [openTimetableModal, setOpenTimetableModal] = useState(false);

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
      () => {},
    );
  };

  useEffect(() => {
    let today = new Date();
    let day = today.getDay();
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

  const handleCloseTimetableModal = () => setOpenTimetableModal(false);
  const handleOpenTimetableModal = () => setOpenTimetableModal(true);

  return (
    <>
      <div
        className="btn-flip"
        data-back="전체 시간표"
        data-front="오늘의 시간표"
        onClick={handleOpenTimetableModal}
      ></div>
      {todayTimetable.map((item, index) => (
        <TimetableItem
          key={index}
          item={item}
          period={index + 1}
          active={item === "" ? "" : "slide"}
        />
      ))}
      <Modal
        keepMounted
        open={openTimetableModal}
        onClose={handleCloseTimetableModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="timetableModalContainer"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 630,
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="timetableModalTitleContainer">전체 시간표</div>
          <div className="timetableModalHeaderContainer">
            <div className="tableHeader"></div>
            <div className="tableHeader">월</div>
            <div className="tableHeader">화</div>
            <div className="tableHeader">수</div>
            <div className="tableHeader">목</div>
            <div className="tableHeader">금</div>
          </div>
          <div className="timetableItemBoxContainer">
            <div className="timetableNumberBox">
              <div className="numberBox">1</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">2</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">3</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">4</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">5</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">6</div>
            </div>
            <div className="timetableNumberBox">
              <div className="numberBox">7</div>
            </div>
            {totalTimetable.map((dayTable) =>
              dayTable.map((item) => (
                <div className="timetableItemBox">
                  {user.authority === "TEACHER"
                    ? item.slice(-4, -2).replace(/(^0+)/, "") +
                      "-" +
                      item.slice(-2).replace(/(^0+)/, "")
                    : item}
                </div>
              )),
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default TimeTable;
