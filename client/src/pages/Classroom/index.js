import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import { Box, Typography } from "@mui/material";
import "./classroom.css";
import VideoContainer from "./components/VideoContainer/VideoContainer";

function Classroom() {
  const location = useLocation();
  const subject = location.state.subject;
  const goal = location.state.goal;
  const sessionId = location.state.sessionId;
  const classCode = location.state.classCode;
  const period = location.state.period;
  const hostId = location.state.hostId;

  const user = useSelector(selectUser);

  return (
    <div className="classroomFelxContainer">
      <div className="classroomGridContainer">
        <div className="headerContainer">
          <div className="subjectBoxContainer">
            <div className="subjectBox">
              {period}교시 {subject}
            </div>
          </div>
          <div className="goalBoxContainer">
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 30,
                width: 900,
                height: 60,
                boxShadow: 5,
              }}
              className="goalBox"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  display: "inline-block",
                  mx: 5,
                }}
                color="green"
                variant="h6"
                component="h2"
              >
                오늘의 학습목표
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", mb: 1, display: "inline-block" }}
                variant="h6"
                component="h2"
              >
                {goal}
              </Typography>
            </Box>
          </div>
        </div>
        <div className="roleTabContainer"></div>
        <VideoContainer
          sessionId={sessionId}
          classCode={classCode}
          goal={goal}
          preiod={period}
          hostId={hostId}
          userName={user.name}
          authority={user.authority}
        />
      </div>
    </div>
  );
}

export default Classroom;
