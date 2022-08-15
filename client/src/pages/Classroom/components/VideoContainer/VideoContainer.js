import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import "./UserVideo.css";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";

const OPENVIDU_SERVER_URL = "https://i7a706.p.ssafy.io:7060";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

function VideoContainer() {
  const mySessionId = "SessionA";
  const myUserName = "OpenVidu_User_";

  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();
  const [OV, setOV] = useState(null);

  useEffect(() => {
    // mount시 세션 초기화
    window.addEventListener("beforeunload", onbeforeunload);
    // OpenVidu 객체 생성
    setOV(new OpenVidu());
  }, []);

  useEffect(() => {
    // OpenVidu 객체 생성 후 세션 생성
    if (OV !== null) setSession(OV.initSession());
  }, [OV]);

  useEffect(() => {
    if (session === undefined) return;

    var mySession = session;

    // 새로운 subscriber가 세션 참가 시 state update 후 렌더링
    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var subscriber = mySession.subscribe(event.stream, undefined);

      setSubscribers([...subscribers, subscriber]);
    });

    // subscriber가 세션 떠날 시 state update 후 렌더링
    mySession.on("streamDestroyed", (event) => {
      setSubscribers(
        subscribers.filter((subscriber) => {
          return subscriber !== event.stream.streamManager;
        })
      );
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    getToken().then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      console.log(OV);
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Set the main video in the page to display our webcam and store our Publisher

          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  }, [session]);

  useEffect(() => {
    console.log(publisher);
    console.log(subscribers);
  });

  const onbeforeunload = () => {
    leaveSession();
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // 세션 나가기
  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    // setOV(null);
    // setSession(undefined);
    // setSubscribers([]);
    // setMySessionId("SessionA");
    // setMyUserName("Participant" + Math.floor(Math.random() * 100));
    // setMainStreamManager(undefined);
    // setPublisher(undefined);
    // setCurrentVideoDevice(undefined);

    window.location.href = "/";
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);

          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  // OPENVIDU_SERVER_URL + "/openvidu/api/sessions"

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,POST",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const handleMicButton = () => {
    setMicOn(!micOn);
  };

  const handleVideoButton = () => {
    setVideoOn(!videoOn);
  };

  return (
    <div className="mainContainer">
      <div className="videoContainer">
        {publisher !== undefined ? (
          <div className="teacherVideoContainer">
            <UserVideoComponent streamManager={publisher} />
          </div>
        ) : null}
        <div className="studentVideosContainer">
          {mainStreamManager !== undefined ? (
            <div
              className="studentVideoContainer"
              onClick={() => handleMainVideoStream(mainStreamManager)}
            >
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          {subscribers.map((sub, i) => (
            <div
              key={i}
              className="studentVideoContainer"
              onClick={() => handleMainVideoStream(sub)}
            >
              <UserVideoComponent streamManager={sub} />
            </div>
          ))}
        </div>
      </div>
      <div className="buttonContainer">
        <div className="classroomButton greenButton" onClick={handleMicButton}>
          {micOn ? (
            <MicIcon fontSize="large" />
          ) : (
            <MicOffIcon fontSize="large" />
          )}
        </div>
        <div
          className="classroomButton greenButton"
          onClick={handleVideoButton}
        >
          {videoOn ? (
            <VideocamIcon fontSize="large" />
          ) : (
            <VideocamOffIcon fontSize="large" />
          )}
        </div>
        <div className="classroomButton greenButton">
          <ScreenShareIcon fontSize="large" />
        </div>
        <div className="classroomButton redButton" onClick={leaveSession}>
          <CloseIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;
