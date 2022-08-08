import React, { useEffect, useState } from "react";
import "./classroom.css";
import VideoContainer from "./components/VideoContainer/VideoContainer";

function Classroom() {
  const [subject, setSubject] = useState();

  useEffect(() => {
    setSubject("3교시 - 영어");
  }, []);

  return (
    <div className="classroomFelxContainer">
      <div className="classroomGridContainer">
        <div className="header">
          <div className="subjectBox">{subject}</div>
          <div className="goalBox"></div>
        </div>
        <VideoContainer />
      </div>
    </div>
  );
}

export default Classroom;
