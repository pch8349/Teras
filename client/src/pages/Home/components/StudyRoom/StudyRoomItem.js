import React, { useState } from "react";
import "./studyRoomItem.css";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, Typography } from "@mui/material";

function StudyRoomItem({ studyroomName, sessionId, boxColor }) {
  const navigate = useNavigate();
  const [openStudyroomModal, setOpenStudyroomModal] = useState(false);

  const handleOpenStudyroomModal = () => setOpenStudyroomModal(true);
  const handleCloseStudyroomModal = () => setOpenStudyroomModal(false);
  const handleJoinStudyroomModal = () => {
    navigate("/studyroompage", {
      state: {
        sessionId: sessionId,
        studyroomName: studyroomName,
      },
    });
  };

  return (
    <>
      <div
        className={`studyroom ${boxColor}`}
        onClick={handleOpenStudyroomModal}
      >
        <div className="logoContainer">
          <img src="/Teras_logo_white.png" height="100%" alt="logo"></img>
        </div>
        <div className="studyroomNameContainer">
          <p>{studyroomName}</p>
        </div>
      </div>
      <Modal
        keepMounted
        open={openStudyroomModal}
        onClose={handleCloseStudyroomModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="studyroomModalContainer"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 200,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="studyroomTitle">
            <Box
              sx={{
                color: "white",
                bgcolor: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                fontSize: 20,
              }}
            >
              스터디룸
            </Box>
            <Box
              sx={{
                color: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                px: 2,
                fontSize: 27,
              }}
            >
              {studyroomName}
            </Box>
          </div>
          <Typography
            sx={{ fontWeight: "bold", mb: 1, fontSize: 25 }}
            variant="h6"
            component="h2"
          >
            입장하시겠습니까?
          </Typography>
          <div className="modalButtonContainer">
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
              onClick={handleJoinStudyroomModal}
            >
              입장하기
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default StudyRoomItem;
