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
<<<<<<< HEAD
              data.push({
                name: res[i].date,
=======
              //데이터가 없으면 새로 배열 넣기
              data.push({
                name: res[i].date + "월",
>>>>>>> b8728837d7dd46f55b47833f2123261b3c32273b
                [sbjname(res[i].subjectCode)]: res[i].score,
              });
            } else {
              for (const j in data) {
<<<<<<< HEAD
                if (data[j].name === res[i].date) {
=======
                if (data[j].name === res[i].date + "월") {
>>>>>>> b8728837d7dd46f55b47833f2123261b3c32273b
                  flag = false;
                  data[j][sbjname(res[i].subjectCode)] = res[i].score;
                  break;
                }
              }
              if (flag) {
                data.push({
<<<<<<< HEAD
                  name: res[i].date,
=======
                  name: res[i].date + "월",
>>>>>>> b8728837d7dd46f55b47833f2123261b3c32273b
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
<<<<<<< HEAD
    <ResponsiveContainer className={"responsiveChart"} height="80%" width="80%">
=======
    <ResponsiveContainer
      className={"responsiveChart"}
      height="100%"
      width="100%"
    >
>>>>>>> b8728837d7dd46f55b47833f2123261b3c32273b
      <LineChart data={score}>
        {arr[0].value && (
          <Line type="linear" dataKey="미술" stroke="#6BFAE7" strokeWidth={3} />
        )}
        {arr[1].value && (
          <Line type="linear" dataKey="영어" stroke="#D34DFF" strokeWidth={3} />
        )}
        {arr[2].value && (
          <Line type="linear" dataKey="국어" stroke="#FCEB60" strokeWidth={3} />
        )}
        {arr[3].value && (
          <Line type="linear" dataKey="수학" stroke="#28A128" strokeWidth={3} />
        )}
        {arr[4].value && (
          <Line type="linear" dataKey="음악" stroke="#FF503F" strokeWidth={3} />
        )}
        {arr[5].value && (
          <Line
            type="linear"
            dataKey="사회문화"
            stroke="#566BE3"
            strokeWidth={3}
          />
        )}
        {arr[6].value && (
          <Line type="linear" dataKey="과학" stroke="#76E356" strokeWidth={3} />
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
