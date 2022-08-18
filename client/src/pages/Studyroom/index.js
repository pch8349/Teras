import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "./studyroom.css";
import VideoContainer from "./components/VideoContainer/VideoContainer";

function Classroom() {
  const location = useLocation();
  const studyroomName = location.state.studyroomName;

  return (
    <div className="studyroomFelxContainer">
      <div className="studyroomGridContainer">
        <div className="studyroomHeaderContainer">
          <div className="studyroomYellowBox">스터디룸</div>
          <div className="studyroomNameBox">{studyroomName}</div>
        </div>
        <div className="studyroomVideoContainer"></div>
      </div>
    </div>
  );
}

export default Classroom;
