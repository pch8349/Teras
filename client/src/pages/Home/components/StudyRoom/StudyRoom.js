import React, { useState } from "react";
import "./studyRoom.css";
import { useNavigate } from "react-router-dom";
import StudyRoomItem from "./StudyRoomItem.js";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";

const boxColorList = [
  "redContainer",
  "yellowContainer",
  "greenContainer",
  "blueContainer",
  "purpleContainer",
];

function StudyRoom() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [studyroomList, setStudyroomList] = useState([
    {
      studyroomName: "중간고사 리뷰",
      sessionId: "studyroom1",
      boxColor: boxColorList[Math.floor(Math.random() * 5)],
    },
    {
      studyroomName: "잡담방",
      sessionId: "studyroom2",
      boxColor: boxColorList[Math.floor(Math.random() * 5)],
    },
    {
      studyroomName: "화학숙제",
      sessionId: "studyroom3",
      boxColor: boxColorList[Math.floor(Math.random() * 5)],
    },
    {
      studyroomName: "미적분 같이 풀어요",
      sessionId: "studyroom4",
      boxColor: boxColorList[Math.floor(Math.random() * 5)],
    },
    {
      studyroomName: "3학년 11반 모여",
      sessionId: "studyroom5",
      boxColor: boxColorList[Math.floor(Math.random() * 5)],
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [newStudyroomName, setNewStudyroomName] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const openNewStudyroom = () => {
    navigate("/studyroompage", {
      state: {
        sessionId: user.userId,
        studyroomName: newStudyroomName,
      },
    });
  };

  return (
    <>
      <div className="studyRoomContainer">
        <div className="titleContainer">
          <div className="title">스터디룸</div>
          <div className="openStudyroomButton" onClick={handleOpenModal}>
            스터디룸 만들기
          </div>
        </div>
        <div className="studyroomsContainer">
          {studyroomList.map((studyroom, index) => (
            <StudyRoomItem
              key={index}
              studyroomName={studyroom.studyroomName}
              sessionId={studyroom.sessionId}
              boxColor={studyroom.boxColor}
            />
          ))}
        </div>
      </div>
      <Modal
        keepMounted
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="createStudyroomModalContainer"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="createStudyroomTitle">
            <Box
              sx={{
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 30,
                py: 1,
                px: 2,
                borderRadius: 1,
              }}
              color="green"
            >
              스터디룸 생성하기
            </Box>
          </div>
          <div className="studyroomNameInput">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="스터디룸 이름"
              margin="normal"
              color="success"
              onChange={({ target: { value } }) => setNewStudyroomName(value)}
            />
          </div>
          <div className="createStudyroomModalButtonContainer">
            <Button
              sx={{
                width: 200,
                height: 50,
                border: 1.2,
                fontWeight: "bold",
                fontSize: 16,
              }}
              variant="outlined"
              color="success"
              onClick={openNewStudyroom}
            >
              스터디룸 생성
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default StudyRoom;
