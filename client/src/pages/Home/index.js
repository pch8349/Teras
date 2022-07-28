import React from "react";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome home!</p>
      <button onClick={() => (window.location.href = "/classroom")}>
        강의실로 이동
      </button>
    </>
  );
}

export default Home;
