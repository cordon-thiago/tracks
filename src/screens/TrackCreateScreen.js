// import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
    const { state: {recording}, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
            addLocation(location, recording);
        }, [recording] //every time the state.recording be updated, the useCallback will create a new callback function in memory instead of creating every time the screen is rendered
    );
    const [err] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={{ top: "always" }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services!</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);