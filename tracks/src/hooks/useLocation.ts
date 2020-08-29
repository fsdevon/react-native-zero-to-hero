import { useState, useEffect } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
  LocationCallback
} from "expo-location";

export default (shouldTrack: boolean, callback: LocationCallback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber: any;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
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
  }, [shouldTrack, callback]);

  return [err];
};
