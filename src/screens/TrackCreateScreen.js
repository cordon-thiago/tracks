import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackCreateScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: "always" }}>
            <Text style={{ fontSize: 48 }}>
                TrackCreateScreen
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;