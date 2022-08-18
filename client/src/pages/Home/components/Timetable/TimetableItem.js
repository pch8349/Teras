import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import "./timetableItem.css";
import { getSession } from "../../../../api/classroom";

function TimetableItem({ period, item, active }) {
  const user = useSelector(selectUser);
  const authority = user.authority;
  const [openModal, setOpenModal] = useState(false);
  const [goal, setGoal] = useState("");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();

  const openClass = () => {
    navigate("/classroom", {
      state: {
        goal: goal,
        classCode: item,
        period: period,
        sessionId: item,
        subject: "수학",
      },
    });
  };

  const joinClass = async () => {
    await getSession(
      `${user.classCode}`,
      (response) => {
        console.log(response.data.openvidu);
        navigate("/classroom", {
          state: {
            goal: response.data.openvidu.goal,
            hostId: response.data.openvidu.hostId,
            classCode: user.classCode,
            sessionId: user.classCode,
            subject: item,
            period: period,
          },
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <>
      <button className={`tableItem ${active}`} onClick={handleOpenModal}>
        <p className="period">{period}</p>
        <p className="subject">
          {authority === "TEACHER"
            ? item.slice(-4, -2).replace(/(^0+)/, "") +
              "-" +
              item.slice(-2).replace(/(^0+)/, "")
            : item}
        </p>
        <p className="arrowIcon">
          <DoubleArrowIcon />
        </p>
      </button>
      {authority === "TEACHER" ? (
        <Modal
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box
            className="teacherModalContainer"
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
                {period}교시
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
                {item.slice(-4, -2).replace(/(^0+)/, "")}학년{" "}
                {item.slice(-2).replace(/(^0+)/, "")}반
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
      ) : (
        <Modal
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box
            className="studentModalContainer"
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
                {period}교시
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
                {item} - 김민성 선생님
              </Box>
            </div>
            <Typography
              sx={{ fontWeight: "bold", mb: 1, fontSize: 25 }}
              variant="h6"
              component="h2"
            >
              강의실에 입장하시겠습니까?
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
                onClick={joinClass}
              >
                강의실 입장
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default TimetableItem;
