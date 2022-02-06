import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;

        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                subscriber = await watchPositionAsync({
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    }, callback
                );
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
            } catch (e) {
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]); //every time the variable shouldTrack and callback changes, the shouldTrack is checked to decide if start or stop watching
                                 //all functions, props and contexts referenced inside the useEffect must be placed in the second parameter of useEffect to avoid Stale references to old versions of the objects

    return [err];
};