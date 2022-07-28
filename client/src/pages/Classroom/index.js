import React, { useState } from "react";
import "./classroom.css";

function Classroom() {
  const [subject, setSubject] = useState("3교시 - 영어");

  return (
    <div className="classroomFelxContainer">
      <div className="classroomGridContainer">
        <div className="header">
          <div className="subjectBox">3교시 - 영어</div>
          <div className="goalBox">
            <div>오늘의 목표 Reading Comprehension p.91 까지</div>
          </div>
        </div>
        <div className="videoContainer"></div>
        <div className="chatPanel"></div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Classroom;
