import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext);

    // ERROR when rendering Polyline
    console.log("locations", locations);
    console.log("current loc", currentLocation);

    if (!currentLocation) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />;
    };

    return (
        <MapView 
            style={styles.map} 
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Circle 
                center={currentLocation.coords}
                radius={50}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
            />

            {locations.length > 0
                ? <Polyline strokeColor="black" strokeWidth={2} coordinates={locations.map(loc => loc.coords)} />
                : null
            }
            
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;