import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./studyroom.css";
import VideoContainer from "./components/VideoContainer/VideoContainer";

function Classroom() {
  const location = useLocation();
  const sessionId = location.state.sessionId;
  const studyroomName = location.state.studyroomName;

  const user = useSelector(selectUser);

  return (
    <div className="studyroomFelxContainer">
      <div className="studyroomGridContainer">
        <div className="studyroomHeaderContainer">
          <div className="studyroomYellowBox">스터디룸</div>
          <div className="studyroomNameBox">{studyroomName}</div>
        </div>
        <div className="studyroomMainContainer">
          <VideoContainer sessionId={sessionId} userName={user.name} />
        </div>
      </div>
    </div>
  );
}

export default Classroom;
