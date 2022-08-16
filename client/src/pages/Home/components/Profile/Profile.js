import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./profile.css";

function Profile() {
  const user = useSelector(selectUser);
  const [attendance, setAttendance] = useState(false);
  const [showCurrentStatus, setShowCurrentStatus] = useState(false);
  const [attendanceTime, setAttendanceTime] = useState();

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
        <div className="profile">
          <img src={"/avatar.png"} alt="avatar" height="70" />
          <div>
            <p>
              {user.schoolName}
              {user.classCode.slice(-4, -2).replace(/(^0+)/, "")}
              학년 {user.classCode.slice(-2).replace(/(^0+)/, "")}반
            </p>
            <p>
              {user.name} {user.authority === "TEACHER" ? "선생님" : "학생"}
            </p>
          </div>
        </div>
        <div className="attendanceButtonContainer">
          <button
            className={attendanceTime ? "attended" : "attendanceButton"}
            onClick={handleAttendance}
          >
            {attendanceTime ? attendanceTime : "출석"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
