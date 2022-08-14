import React, { useState } from "react";
import "./style.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./Store";

function test() {
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        {/* 울티리의 provider. store가 필요한 애들을 감싸면 됨. prop으로 반드시 store를 정의해야함 */}
        <Provider store={store}>
          <Left1 />
          <Right1 />
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1 : </h1>
      <Left2 />
    </div>
  );
}
function Left2(props) {
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3 />
    </div>
  );
}
function Left3(props) {
  const number = useSelector((state) => state.number);
  const content = useSelector((state) => state.content);
  return (
    <div>
      <h1>Left3 : {number}</h1>
      <h1>content : {content}</h1>
    </div>
  );
}

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 />
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 />
    </div>
  );
}
function Right3(props) {
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({
      type: "PLUS",
      content: content,
    });
  };
  const [content, setContent] = useState("");
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="text"
        value={content}
        onChange={({ target: { value } }) => setContent(value)}
      />
      <button onClick={onSubmit}></button>
    </div>
  );
}

export default test;
