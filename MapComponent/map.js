import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";

import {
  
  Button,
  
} from "react-native-paper";

import * as Location from "expo-location";

import { addUpdateDataTransaction } from "../Reducer/types";

//const LocationMap = (props)=>{
const LocationMap = (props) => {
  const [location, setLocation] = useState(null);
  const [stillNeeded, setStillNeeded] = useState(true);

  const [mapPoints, setMapPoints] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  const addMarker = async (coord) => {
    var firstPoint = {};
    if (mapPoints.length === 0) {
      setMapPoints([...mapPoints, coord]);
    } else {
      firstPoint = mapPoints[0];

      setMapPoints([...mapPoints, coord]);
    }
  };

  const getLocation = () => {
    /*console.log("pressed")*/(async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setFields(dicArrayConv(props.fields));
    })();
  };

  return (
    <View style={stylesLocal.mapContainer}>
      <MapView
        style={stylesLocal.mapStyle}
        mapType={"satellite"}
        onPress={(e) => {
          addMarker(e.nativeEvent.coordinate);
          console.log(mapPoints);
        }}
        region={
          location === null && stillNeeded === true
            ? {
                latitude: -28.4792625,
                longitude: 24.6727135,
                latitudeDelta: 0.00000001,
                longitudeDelta: 0.00000001,
              }
            : {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00000001,
                longitudeDelta: 0.00000001,
              }
        }
      ></MapView>

      <Button
            mode="contained"
            onPress={() => getLocation()}
            style={{ margin: "1%", width: "45%" }}
          >
            Get Location
          </Button>
    </View>
  );
};

/*
<Button
        onPress={() => getLocation()}
        title="Get Stand"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />





*/

const mapStateToProps = (state) => ({
  locations: state.addUpdateReducer.locations,
});

const stylesLocal = StyleSheet.create({
  mapStyle: {
    width: "100%", //Dimensions.get("window").width,
    height: "90%", //Dimensions.get("window").height,
  },
  mapContainer: {
    width: "90%", //Dimensions.get("window").width,
    height: "70%", //Dimensions.get("window").height,
    borderWidth: 2,
    borderColor: "#556B2F",
  },
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(
  LocationMap
);
