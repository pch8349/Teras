import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GradeGraph from "./GradeGraph";

const Grade = () => {
  const [art, setArt] = useState(false);
  const [english, setEnglish] = useState(false);
  const [korean, setKorean] = useState(false);
  const [math, setMath] = useState(false);
  const [music, setMusic] = useState(false);
  const [social, setSocial] = useState(false);
  const [science, setScience] = useState(false);

  const OnClick = (e) => {
    if (e === "미술") setArt(!art);
    else if (e === "영어") setEnglish(!english);
    else if (e === "국어") setKorean(!korean);
    else if (e === "수학") setMath(!math);
    else if (e === "음악") setMusic(!music);
    else if (e === "사회문화") setSocial(!social);
    else if (e === "과학") setScience(!science);
  };

  useEffect(() => {}, [math]);
  useEffect(() => {}, [english]);
  useEffect(() => {}, [art]);
  useEffect(() => {}, [korean]);
  useEffect(() => {}, [music]);
  useEffect(() => {}, [social]);

  return (
    <MainFlexGrid>
      <GraphAria>
        <GradeGraph
          arr={[
            { value: art },
            { value: english },
            { value: korean },
            { value: math },
            { value: music },
            { value: social },
            { value: science },
          ]}
        />
      </GraphAria>

      <FlexRow>
        <LegendItem color="#6BFAE7" onClick={() => OnClick("미술")}>
          미술
        </LegendItem>
        <LegendItem color="#D34DFF" onClick={() => OnClick("영어")}>
          영어
        </LegendItem>
        <LegendItem color="#FCEB60" onClick={() => OnClick("국어")}>
          국어
        </LegendItem>
        <LegendItem color="#28A128" onClick={() => OnClick("수학")}>
          수학
        </LegendItem>
        <LegendItem color="#FF503F" onClick={() => OnClick("음악")}>
          음악
        </LegendItem>
        <LegendItem color="#566BE3" onClick={() => OnClick("사회문화")}>
          사회문화
        </LegendItem>
        <LegendItem color="#76E356" onClick={() => OnClick("과학")}>
          과학
        </LegendItem>
      </FlexRow>
    </MainFlexGrid>
  );
};

const GraphAria = styled.div`
  margin: 50px auto 50px auto;
  width: 70%;
  height: 70%;
`;

const MainFlexGrid = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  width: flex;
`;

const FlexRow = styled.div`
  gap: 35x;
  width: 100%;
  text-align: center;
  margin: 0 0 0 0;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  display: flex;
`;

const LegendItem = styled.div`
  border-radius: 5px;
  margin: 0 10px 0 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 30px;
  width: 50px;
  font-size: 12px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export default Grade;
