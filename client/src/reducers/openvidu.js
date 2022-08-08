export const SETSESSIONNAME = "OPENVIDU/SETSESSIONNAME";

export const SETUSERNAME = "OPENVIDU/SETUSERNAME";

export const setSessionName = (sessionName) => ({
  type: SETSESSIONNAME,
  sessionName,
});

export const setUserName = (userName) => ({
  type: SETUSERNAME,
  userName,
});

const initalState = {
  sessionName: "sessionA",
  userName: "김민성",
};

const openvidu = (state = initalState, action) => {
  switch (action.type) {
    case SETSESSIONNAME:
      return {
        ...state,
        sessionName: action.sessionName,
      };
    case SETUSERNAME:
      return {
        ...state,
        userName: action.userName,
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default openvidu;
