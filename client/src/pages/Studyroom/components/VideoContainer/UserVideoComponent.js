import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./videoContainer.css";

function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className="studyroomNameTag">
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserVideoComponent;
