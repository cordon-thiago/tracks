import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "signin":
            return { errorMessage: "", token: action.payload };
        case "clear_error_message":
            return { ...state, errorMessage: "" };
        case "signout":
            return { token: null, errorMessage: "" };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        dispatch({ type: "signin", payload: token });
        navigate("TrackList");
    } else {
        navigate("Signup");
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
    try {
        // Retrieve token info from API
        const response = await trackerApi.post("/signup", { email, password });
        // Store token in device
        await AsyncStorage.setItem("token", response.data.token);
        // Update token in data context
        dispatch({ type: "signin", payload: response.data.token });
        // Navigate to trackList screen
        navigate("TrackList");
    } catch (err) {
        dispatch({ type: "add_error", payload: "Something went wrong with sign up" });
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        // Retrieve token info from API
        const response = await trackerApi.post("/signin", { email, password });
        // Store token in device
        await AsyncStorage.setItem("token", response.data.token);
        // Update token in data context
        dispatch({ type: "signin", payload: response.data.token });
        // Navigate to trackList screen
        navigate("TrackList");
    } catch (err) {
        dispatch({ type: "add_error", payload: "Something went wrong with sign in" });
    }
};

const signout = (dispatch) => async () => {
    // Remove token
    await AsyncStorage.removeItem("token");
    // Call action
    dispatch({ type: "signout" });
    // Navigate
    navigate("loginFlow");

};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: "" }
);