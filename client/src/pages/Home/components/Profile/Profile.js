import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./profile.css";

function Profile() {
  const user = useSelector(selectUser);
  const [attendance, setAttendance] = useState(false);
  const [showCurrentStatus, setShowCurrentStatus] = useState(false);
  const [attendanceTime, setAttendanceTime] = useState();
  const profileImg =
    user.authority === "TEACHER"
      ? "/avatar_teacher.png"
      : "/avatar_student.png";

  const checkTime = () => {
    setShowCurrentStatus(true);
  };

  const handleAttendance = () => {
    let today = new Date();
    setAttendanceTime(today.toLocaleTimeString());
  };

  useEffect(() => {
    checkTime();
  });
  return (
    <>
      {showCurrentStatus ? <div className="currentStatusBox">3교시</div> : null}
      <div className="profileBox">
        <div className="profileContainer">
          <div className="profile">
            <img src={profileImg} alt="avatar" height="60" />
            <div>
              <div className="schoolInfo">
                {user.schoolName}&nbsp;
                {user.classCode.slice(-4, -2).replace(/(^0+)/, "")}
                학년 {user.classCode.slice(-2).replace(/(^0+)/, "")}반
              </div>
              <div className="nameInfo">
                {user.name} {user.authority === "TEACHER" ? "선생님" : "학생"}
              </div>
            </div>
          </div>
        </div>
        <div className="attendanceButtonContainer">
          {user.authority === "STUDENT" ? (
            <button
              className={attendanceTime ? "attended" : "attendanceButton"}
              onClick={handleAttendance}
            >
              {attendanceTime ? attendanceTime : "출석"}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Profile;
