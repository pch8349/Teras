import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GradeGraph from "./GradeGraph";

const Grade = () => {
  const [art, setArt] = useState(false);
  const [english, setEnglish] = useState(false);
  const [korean, setKorean] = useState(true);
  const [math, setMath] = useState(true);
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
      <GradeTitleBox>성적</GradeTitleBox>
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
        <LegendItem
          color="#AC4425"
          isClicked={art}
          onClick={() => OnClick("미술")}
        >
          미술
        </LegendItem>
        <LegendItem
          color="#2B7A0B"
          isClicked={english}
          onClick={() => OnClick("영어")}
        >
          영어
        </LegendItem>
        <LegendItem
          color="#D61C4E"
          isClicked={korean}
          onClick={() => OnClick("국어")}
        >
          국어
        </LegendItem>
        <LegendItem
          color="#319DA0"
          isClicked={math}
          onClick={() => OnClick("수학")}
        >
          수학
        </LegendItem>
        <LegendItem
          color="#FFB200"
          isClicked={music}
          onClick={() => OnClick("음악")}
        >
          음악
        </LegendItem>
        <LegendItem
          color="#781C68"
          isClicked={social}
          onClick={() => OnClick("사회문화")}
        >
          사회문화
        </LegendItem>
        <LegendItem
          color="#277BC0"
          isClicked={science}
          onClick={() => OnClick("과학")}
        >
          과학
        </LegendItem>
      </FlexRow>
    </MainFlexGrid>
  );
};

const GradeTitleBox = styled.div`
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80px;
  font-size: 40px;
  font-weight: bolder;
  font-family: "MICEGothic Bold";
  color: green;
  margin: 30px 140px 0 0;
`;

const GraphAria = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 60px;
`;

const MainFlexGrid = styled.div`
  display: grid;
  grid-template-rows: 100px 500px 100px;
  width: 100%;
`;

const FlexRow = styled.div`
  gap: 35x;
  grid-row-start: 3;
  grid-row-end: 4;
  margin: 0;
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
  color: ${(props) => (props.isClicked ? "white" : props.color)};
  background-color: ${(props) => (props.isClicked ? props.color : "white")};
  width: 75px;
  font-size: 16px;
  border: solid 1px ${(props) => props.color};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.color};
    color: white;
  }
`;

export default Grade;
