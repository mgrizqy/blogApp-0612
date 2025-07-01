import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  ObjectId:string;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  imgprofile?: string;
  isVerified?: boolean;
  isAuth?: boolean;
}

const initialData: IUser = {
  ObjectId:"",
  username: "",
  email: "",
};

// Define slice config to create function reducer and action
const userSlice = createSlice({
  name: "user",
  initialState: initialData,
  reducers: {
    setSignIn: (initialState, action) => {
      console.log("CHECK ACTION REDUX FROM USER SIGNIN:", action);
      // Store data to global store user reducer
      return action.payload;
    },
    setSignOut: () => {
      // reset data in global store user reducer
      return initialData;
    },
    setUpdateProfile: (initialState, action) => {
      console.log("NEW PROFILE UPDATE", action.payload);

      return { ...initialState, ...action.payload };
    },
  },
});

// Export action
export const { setSignIn, setSignOut, setUpdateProfile } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
