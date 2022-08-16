import React, { useEffect, useState } from "react";
import { getUserScore } from "api/users";
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
import "./gradeGraph.css";

const GradeGraph = ({ arr }) => {
  console.log("그래프 출력", arr);
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

  useEffect(() => {
    getScore();
  }, []);
  const getScore = async () => {
    try {
      await getUserScore()
        .then((response) => {
          console.log("겟유저스코어", response);
        })
        .catch((e) => console.log("겟유저스코어 에러", e));
    } catch (e) {
      console.log("내부 다른에러", e);
    }
  };

  return (
    <ResponsiveContainer className={"responsiveChart"} height="80%" width="80%">
      <LineChart data={data}>
        {arr[0].value && (
          <Line type="linear" dataKey="수학" stroke="#8884d8" strokeWidth={3} />
        )}
        {arr[1].value && (
          <Line type="linear" dataKey="영어" stroke="#CDCDCD" strokeWidth={3} />
        )}
        {arr[2].value && (
          <Line type="linear" dataKey="과학" stroke="#28A128" strokeWidth={3} />
        )}

        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray=" 0 100 " />
        <XAxis dataKey="name" />
        <YAxis height="2000px" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GradeGraph;
