import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";
import UserVideoComponent from "./UserVideoComponent";
import "./UserVideo.css";
import { Modal, Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { openSession } from "../../../../api/classroom";
import { useNavigate } from "react-router-dom";
import {
  deleteSession,
  openSessionApi,
  getTokenApi,
  deleteSessionApi,
} from "../../../../api/classroom";

const OPENVIDU_SERVER_URL = "https://i7a706.p.ssafy.io:8443";

function VideoContainer({ sessionId, goal, period, classCode, hostId }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const mySessionId = sessionId;
  const myUserName = user.name;

  const [openLeaveSessionModal, setOpenLeaveSessionModal] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();
  const [OV, setOV] = useState(null);
  const [host, setHost] = useState();

  const handleOpenModal = () => setOpenLeaveSessionModal(true);
  const handleCloseModal = () => setOpenLeaveSessionModal(false);

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

          if (user.authority === "TEACHER") {
            await openSession(
              {
                sessionId: mySessionId,
                hostId: publisher.stream.session.connection.connectionId,
                goal: goal,
                classCode: classCode,
              },
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );

            setHost(publisher);
          }

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
    if (user.authority === "STUDENT" && host === undefined) {
      const host = subscribers.find((subscriber) => {
        if (subscriber.stream.connection.connectionId === hostId) return true;
      });
      console.log(host);
      setHost(host);
    }
  }, [subscribers]);

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

    if (user.authority === "TEACHER") {
      deleteSessionApi(
        mySessionId,
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      deleteSession(
        mySessionId,
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
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

    navigate("/main");
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
      var data = {};
      openSessionApi(
        data,
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
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

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      openSessionApi(
        data,
        (response) => {
          console.log("CREATE SESSION", response);
          resolve(response.data.id);
        },
        (response) => {
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
        }
      );
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      getTokenApi(
        sessionId,
        data,
        (response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        },
        (error) => reject(error)
      );
    });
  };

  const handleMicButton = () => {
    publisher.publishAudio(micOn);
    setMicOn(!micOn);
  };

  const handleVideoButton = () => {
    publisher.publishVideo(videoOn);
    setVideoOn(!videoOn);
  };

  const handleScreenShare = () => {
    var newScreenShare = OV.initPublisher(undefined, {
      videoSource: "screen",
    });

    newScreenShare.once("accessAllowed", (event) => {
      newScreenShare.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .addEventListener("ended", () => {
          console.log('User pressed the "Stop sharing" button');
          session.unpublish(host);
          session.publish(publisher);
          setHost(publisher);
        });
      session.unpublish(publisher);
      session.publish(newScreenShare);
      setHost(newScreenShare);
    });

    newScreenShare.once("accessDenied", (event) => {
      console.warn("ScreenShare: Access Denied");
    });

    //newPublisher.once("accessAllowed", () => {
    // await session.unpublish(mainStreamManager);
    // await session.publish(newScreenShare);
    // setHost(newScreenShare);
  };

  return (
    <>
      <div className="classroomMainContainer">
        <div className="videoContainer">
          {host !== undefined ? (
            <div className="mainVideoContainer">
              <UserVideoComponent streamManager={host} />
            </div>
          ) : null}
          <div className="subVideosContainer">
            {user.authority === "STUDENT" ? (
              <div
                className="subVideoContainer"
                // onClick={() => handleMainVideoStream(mainStreamManager)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => {
              if (
                host !== undefined &&
                (sub.stream.connection.connectionId ===
                  host.stream.connection.connectionId ||
                  sub.stream.connection.connectionId ===
                    publisher.session.connection.connectionId)
              ) {
                return null;
              } else {
                return (
                  <div
                    key={i}
                    className="subVideoContainer"
                    // onClick={() => handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent
                      streamManager={sub}
                      authority={user.authority}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="buttonContainer">
          <div
            className="classroomButton greenButton"
            onClick={handleMicButton}
          >
            {micOn ? (
              <MicOffIcon fontSize="large" />
            ) : (
              <MicIcon fontSize="large" />
            )}
          </div>
          <div
            className="classroomButton greenButton"
            onClick={handleVideoButton}
          >
            {videoOn ? (
              <VideocamOffIcon fontSize="large" />
            ) : (
              <VideocamIcon fontSize="large" />
            )}
          </div>
          {user.authority === "TEACHER" ? (
            <div
              className="classroomButton greenButton"
              onClick={handleScreenShare}
            >
              <ScreenShareIcon fontSize="large" />
            </div>
          ) : null}
          <div className="classroomButton redButton" onClick={handleOpenModal}>
            <CloseIcon fontSize="large" />
          </div>
        </div>
      </div>
      <Modal
        keepMounted
        open={openLeaveSessionModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="studentModalContainer"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 200,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="classroomTitle">
            <Box
              sx={{
                bgcolor: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 20,
                py: 1,
                px: 2,
                borderRadius: 1,
              }}
              color="white"
            >
              {period}교시
            </Box>
            <Box
              sx={{
                color: "green",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                px: 2,
                fontSize: 20,
              }}
            >
              영어 - 김민성 선생님
            </Box>
          </div>
          <Typography
            sx={{ fontWeight: "bold", mb: 1, fontSize: 25 }}
            variant="h6"
            component="h2"
          >
            {user.authority === "TEACHER"
              ? "수업을 종료하시겠습니까?"
              : "수업을 나가시겠습니까?"}
          </Typography>
          <div className="modalButtonContainer">
            <Button
              sx={{
                width: 200,
                height: 50,
                border: 1.2,
                fontWeight: "bold",
                fontSize: 16,
              }}
              variant="outlined"
              color="error"
              onClick={leaveSession}
            >
              {user.authority === "TEACHER" ? "수업 종료하기" : "수업 나가기"}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default VideoContainer;
