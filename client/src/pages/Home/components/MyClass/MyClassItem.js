import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 150px;
  width: 130px;
  text-align: center;
  justify-content: center;
  border: solid 1px #7ccc77;
  box-shadow: 2px 2px 2px #dedede;
  border-radius: 10px;
  margin: 5px 20px;
  img {
    margin-top: 10px;
  }
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-top: 15%;
  }
`;

function MyClassItem({ data, imgSrc }) {
  return (
    <Card>
      <img src={imgSrc} width="80" height="80" alt="" />
      <div className="name">{data.name}</div>
    </Card>
  );
}

export default MyClassItem;
