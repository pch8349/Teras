import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./profile.css";

const Main = () => {
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   console.log("Profile.js/useEffect", user);
  //   UserData();
  // }, [user]);
  const UserData = () => {
    console.log("Profile.js/UserData", user);
    return (
      <>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.classCode}</div>
        <div>{user.authority}</div>
        <div>{user.id}</div>
      </>
    );
  };

  return (
    <div className="profileBox">
      <div>프로필</div>
      <UserData></UserData>
    </div>
  );
};

export default Main;
=======
import "./profile.css";

function Profile() {
  const [showCurrentStatus, setShowCurrentStatus] = useState(false);

  const checkTime = () => {
    setShowCurrentStatus(true);
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
            <p>배명고등학교 3학년 12반</p>
            <p>박찬혁 학생</p>
          </div>
        </div>
        <div className="attendanceButtonContainer">
          <button>출석</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
>>>>>>> 3777c5c ([FE] openvidu host update)
