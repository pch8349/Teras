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
  console.log("메인에서 arr 주기", arr);
  const [score, setScore] = useState();

  const data = [];
  const sbjname = (obj) => {
    switch (obj) {
      case "ART":
        return "미술";
      case "ENGLISH":
        return "영어";
      case "KOREAN":
        return "국어";
      case "MATH":
        return "수학";
      case "MUSIC":
        return "음악";
      case "SOCIAL":
        return "사회문화";
      case "SCIENCE":
        return "과학";
      default:
        break;
    }
  };
  useEffect(() => {
    getScore();
  }, []);
  const getScore = async () => {
    try {
      await getUserScore()
        .then((response) => {
          const res = response.data.list;
          for (const i in res) {
            var flag = true;
            if (data.length === 0) {
              //데이터가 없으면 새로 배열 넣기
              data.push({
                name: res[i].date + "월",
                [sbjname(res[i].subjectCode)]: res[i].score,
              });
            } else {
              for (const j in data) {
                if (data[j].name === res[i].date + "월") {
                  flag = false;
                  data[j][sbjname(res[i].subjectCode)] = res[i].score;
                  break;
                }
              }
              if (flag) {
                data.push({
                  name: res[i].date + "월",
                  [sbjname(res[i].subjectCode)]: res[i].score,
                });
              }
            }
          }
          console.log("데이타", data);
        })
        .catch((e) => console.log("겟유저스코어 에러", e));
    } catch (e) {
      console.log("내부 다른에러", e);
    }
    setScore(data);
  };

  return (
    <ResponsiveContainer className={"responsiveChart"} height="90%" width="90%">
      <LineChart data={score}>
        {arr[0].value && (
          <Line type="linear" dataKey="미술" stroke="#AC4425" strokeWidth={3} />
        )}
        {arr[1].value && (
          <Line type="linear" dataKey="영어" stroke="#2B7A0B" strokeWidth={3} />
        )}
        {arr[2].value && (
          <Line type="linear" dataKey="국어" stroke="#D61C4E" strokeWidth={3} />
        )}
        {arr[3].value && (
          <Line type="linear" dataKey="수학" stroke="#319DA0" strokeWidth={3} />
        )}
        {arr[4].value && (
          <Line type="linear" dataKey="음악" stroke="#FFB200" strokeWidth={3} />
        )}
        {arr[5].value && (
          <Line
            type="linear"
            dataKey="사회문화"
            stroke="#781C68"
            strokeWidth={3}
          />
        )}
        {arr[6].value && (
          <Line type="linear" dataKey="과학" stroke="#277BC0" strokeWidth={3} />
        )}

        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <CartesianGrid stroke="#ccc" strokeDasharray=" 0 100 " />
        <XAxis dataKey="name" />
        <YAxis height="2000px" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GradeGraph;
