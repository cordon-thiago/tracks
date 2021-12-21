import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "signup":
            return { errorMessage: "", token: action.payload };
        default:
            return state;
    }
};

const signup = (dispatch) => async ({ email, password }) => {
    try {
        // Retrieve token info from API
        const response = await trackerApi.post("/signup", { email, password });
        // Store token in device
        await AsyncStorage.setItem("token", response.data.token);
        // Update token in data context
        dispatch({ type: "signup", payload: response.data.token });
        // Navigate to trackList screen
        navigate("TrackList");
    } catch (err) {
        dispatch({ type: "add_error", payload: "Something went wrong with sign up" });
    }
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        // Try to sign in
        // Handle success by updating state
        // Handle failure by showing error message
    };
};

const signout = (dispatch) => {
    return () => {
        // Sign out
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout },
    { token: null, errorMessage: "" }
);