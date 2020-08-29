import * as Location from "expo-location";
const tenMetersWithDegrees = 0.0001;
const getLocation = (increment: number) => {
  return {
    timestamps: 1000000,
    coords: {
      spead: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 108.2222743 + increment * tenMetersWithDegrees,
      latitude: 16.071857 + increment * tenMetersWithDegrees
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
