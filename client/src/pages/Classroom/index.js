import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "./classroom.css";
import VideoContainer from "./components/VideoContainer/VideoContainer";

function Classroom() {
  const location = useLocation();
  const subject = "3교시 - 영어";
  const goal = location.state.goal;
  const sessionId = location.state.sessionId;
  const classCode = location.state.classCode;
  const period = location.state.period;

  return (
    <div className="classroomFelxContainer">
      <div className="classroomGridContainer">
        <div className="headerContainer">
          <div className="subjectBoxContainer">
            <Box sx={{}}>
              {period} - {classCode}
            </Box>
          </div>
          <div className="goalBoxContainer">
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 30,
                width: 800,
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
        <VideoContainer sessionId={sessionId} />
      </div>
    </div>
  );
}

export default Classroom;
