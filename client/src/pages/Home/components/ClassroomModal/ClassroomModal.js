import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./classroomModal.css";

function ClassroomModal() {
  const [openModal, setOpenModal] = useState(false);
  const [goal, setGoal] = useState("");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();

  const openClass = () => {
    navigate("/classroom", {
      state: {
        goal: goal,
      },
    });
  };

  return (
    <>
      <Button
        sx={{
          width: 200,
          height: 50,
          fontSize: 18,
          fontWeight: "bold",
        }}
        color="success"
        variant="contained"
        onClick={handleOpenModal}
      >
        강의실 열기
      </Button>
      <Modal
        keepMounted
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="modalContainer"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="classroomTitle">
            <Box
              sx={{
                bgcolor: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 20,
                py: 1,
                px: 2,
                borderRadius: 1,
              }}
              color="white"
            >
              3교시
            </Box>
            <Box
              sx={{
                color: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                px: 2,
                fontSize: 20,
              }}
            >
              3학년 13반
            </Box>
          </div>
          <div className="classGoalInput">
            <Typography
              sx={{ fontWeight: "bold", mb: 1 }}
              variant="h6"
              component="h2"
            >
              오늘의 학습목표를 입력해주세요
            </Typography>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="오늘의 수업목표"
              multiline
              rows={4}
              margin="normal"
              color="success"
              onChange={({ target: { value } }) => setGoal(value)}
            />
          </div>
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
              onClick={openClass}
            >
              강의실 열기
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ClassroomModal;
