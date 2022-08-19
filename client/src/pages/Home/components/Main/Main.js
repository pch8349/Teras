import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Main_Assign from "./Main_Assign";
import Main_Notice from "./Main_Notice";
import GradeGraph from "pages/Home/components/Grade/GradeGraph";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Style from "../Schedule/Style";

function Main() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <MainFlexGrid>
      <FlexRow>
        <Part>
          <Main_Notice />
        </Part>
        <Part>
          <Main_Assign />
        </Part>
      </FlexRow>
      <FlexRow>
        <Part onClick={handleOpen}>
          <GradeTitleContainer>성적</GradeTitleContainer>
          <GraphAria>
            <GradeGraph
              arr={[
                { value: true },
                { value: true },
                { value: true },
                { value: true },
                { value: true },
                { value: true },
                { value: true },
              ]}
            />
          </GraphAria>
        </Part>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                성적 그래프
              </Typography>
              <GradeGraph
                arr={[
                  { value: true },
                  { value: true },
                  { value: true },
                  { value: true },
                  { value: true },
                  { value: true },
                  { value: true },
                ]}
              />
            </Box>
          </Fade>
        </Modal>
        <Part>
          <Style />
        </Part>
      </FlexRow>
    </MainFlexGrid>
  );
}

const GraphAria = styled.div`
  margin-top: 25px;
  width: 80%;
  height: 80%;
  padding-left: 40px;
`;

const FlexRow = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const GradeTitleContainer = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bolder;
  background-color: #5ab151;
  padding: 5px 0;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const MainFlexGrid = styled.div`
  justify-content: center;
  max-width: 1000px;
  height: 700px;
  width: flex;
`;

const Part = styled.div`
  box-shadow: 3px 3px 3px 3px rgba(100, 100, 100, 0.1);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 5px 5px 5px 5px;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.03);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  }
  overflow: hidden;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default Main;
