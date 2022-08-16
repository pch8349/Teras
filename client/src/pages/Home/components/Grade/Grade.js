import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import GradeGraph from "./GradeGraph";

const Grade = () => {
  const [math, setMath] = useState(false);
  const [english, setEnglish] = useState(false);
  const [science, setScience] = useState(false);


  const data = [
    {
      name: "3월",
      수학: 60,
      영어: 88,
      과학: 24,
    },
    {
      name: "4월",
      수학: 30,
      영어: 39,
      과학: 21,
    },
    {
      name: "5월",
      수학: 20,
      영어: 98,
      과학: 90,
    },
    {
      name: "6월",
      수학: 78,
      영어: 83,
      과학: 80,
    },
    {
      name: "7월",
      수학: 89,
      영어: 48,
      과학: 81,
    },
    {
      name: "8월",
      수학: 39,
      영어: 38,
      과학: 25,
    },
    {
      name: "9월",
      수학: 90,
      영어: 100,
      과학: 100,
    },
  ];

  const OnClick = (e) => {
    if (e === "수학") setMath(!math);
    else if (e === "영어") setEnglish(!english);
    else setScience(!science);
  };

  useEffect(() => {}, [math]);
  useEffect(() => {}, [english]);
  useEffect(() => {}, [science]);

  return (
    <>
      <GradeGraph
        arr={[{ value: math }, { value: english }, { value: science }]}
      />
      <LegendItem onClick={() => OnClick("수학")}>수학</LegendItem>
      <LegendItem onClick={() => OnClick("영어")}>영어</LegendItem>
      <LegendItem onClick={() => OnClick("과학")}>과학</LegendItem>
    </>
  );
};

const Graded = styled.div`
width: 2000px
height: 2000px
display: 
`;

const LegendItem = styled.div`
  height: 50px;
  width: 100px;
  background-color: gray;
`;

export default Grade;
