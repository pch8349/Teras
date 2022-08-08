const SETUSERID = "USER/SETUSERID";

const SETUSERNAME = "USER/SETUSERNAME";

export const setUserId = (userId) => ({
  type: SETUSERID,
  userId,
});

export const setUserName = (userName) => ({
  type: SETUSERNAME,
  userName,
});

const initalState = {
  userId: "sessionA",
  userName: "김민성",
};

const user = (state = initalState, action) => {
  switch (action.type) {
    case SETUSERID:
      return {
        ...state,
        userId: action.userId,
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

export default user;
