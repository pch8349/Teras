import React, { useEffect, useState } from "react";
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
