import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user", // 함수의 이름은 userSlice지만, store의 이름은 user가 된다.
  initialState: {
    // 사용하려는 데이터에 값이 있어야 하기 때문에 데이터 지정해주기
    user: {
      isLogin: false,
    },
  },
  reducers: {
    //state나 redux state를 업데이트 해주는 함수 역할을 함
    login: (state, action) => void (state.user = action.payload),
    // {
    //   //state는 업데이트 될 값, action은 우리한테 전해주는 값
    //   state.user = action.payload; // initialState의 user는 state.user와 같음. acition.payload로 오는 값으로 바꿔줌
    // },
    logout: (state) => void (state.user = null),
    reset(state) {
      console.log("리셋");
      Object.assign(state, null);
    },
  },
});

export const { login, logout, reset } = userSlice.actions;
//login, logout 하는 action을 export 해야됨. store를 사용하려면 reducer가 필요.

export const selectUser = (state) => state.user.user;
// export const selectLogined = (state) => state.user.isLogin;
// 전역적으로 값을 사용하기 위해 state를 export 해주어야 함.
// state.user는 initialState 안의 user이고, 새로운 정보로 update 되기 때문에 다른 user object를 사용

export default userSlice.reducer; // export default 할 값이 필요해서 한듯?
