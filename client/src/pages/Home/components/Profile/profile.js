import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./profile.css";

const Main = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profileBox">
      <div>프로필</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.classCode}</div>
      <div>{user.authority}</div>
      <div>{user.id}</div>
    </div>
  );
};

export default Main;
