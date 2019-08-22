import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
  ImageBackground,
  Dimensions,
  FlatList,
  AppRegistry,
  AppState,
  NetInfo,
  Modal,
  AsyncStorage,
} from "react-native";

export default class Connection extends Component {

  constructor(props) {
    super(props);

  }

  // this.state = {
  //   isConnected: true
  // };

  // componentDidMount() {
  //   NetInfo.isConnected.addEventListener(
  //     "connectionChange",
  //     this.handleConnectivityChange
  //   );
  // }

  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     "connectionChange",
  //     this.handleConnectivityChange
  //   );
  // }

  // handleConnectivityChange = isConnected => {
  //   if (isConnected) {
  //     this.setState({ isConnected });
  //   } else {
  //     this.setState({ isConnected });
  //   }
  // };

  render() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  offlineText: {
    color: "#fff",
  }
});
