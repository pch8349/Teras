import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <div className="classroomNameTag">
            <p>{getNicknameTag()}</p>
          </div>
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      ) : null}
    </>
  );
}

export default UserVideoComponent;
