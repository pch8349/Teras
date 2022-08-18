import React, { useEffect } from "react";

function OpenViduVideoComponent({ streamManager }) {
  const videoRef = React.createRef();

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  });

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  return <video autoPlay={true} ref={videoRef} />;
}

export default OpenViduVideoComponent;
