import React from "react";
import "./studyRoom.css";

function main() {
  return (
    <div className="studyRoomContainer">
      <div className="titleContainer"></div>
      <div className="studyroomsContainer">
        <div className="studyroom redContainer">
          <div className="logoContainer">
            <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
          </div>
          <div className="studyroomNameContainer">
            <p>중간고사 리뷰</p>
          </div>
        </div>
        <div className="studyroom yellowContainer">
          <div className="logoContainer">
            <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
          </div>
          <div className="studyroomNameContainer">
            <p>잡담방</p>
          </div>
        </div>
        <div className="studyroom greenContainer">
          <div className="logoContainer">
            <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
          </div>
          <div className="studyroomNameContainer">
            <p>화학숙제</p>
          </div>
        </div>
        <div className="studyroom blueContainer">
          <div className="logoContainer">
            <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
          </div>
          <div className="studyroomNameContainer">
            <p>미적분 같이 풀어요</p>
          </div>
        </div>
        <div className="studyroom purpleContainer">
          <div className="logoContainer">
            <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
          </div>
          <div className="studyroomNameContainer">
            <p>3학년 11반 모여</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default main;
