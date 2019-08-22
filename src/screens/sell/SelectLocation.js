import React, {Component} from "react";
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
    AsyncStorage, PermissionsAndroid, ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import {Rating, AirbnbRating} from "react-native-ratings";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Geolocation from 'react-native-geolocation-service';
import {firebaseApp} from "../../components/firebase/Realtimedb";
import {colors} from "../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import {setHeight, setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";

const {width, height} = Dimensions.get("window");
const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class SelectLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            region: {
                latitude: 21.0184834,
                longitude: 105.7799923,
                latitudeDelta: 0.026045512883268174,
                longitudeDelta: 0.015308372676386739
            },
            markers: [
                {
                    latitude: 21.0184834,
                    longitude: 105.7799923,
                }
            ],
            loading: false,
            updatesEnabled: false,
            location: {},
            latitude: 0,
            longitude:0,
            dataSource:[],
            formatted_address: '',
        };

    }


    onRegionChange(data) {
        this.setState({
                region: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.026045512883268174,
                    longitudeDelta: 0.015308372676386739
                },
                location: data,

            }, () => {
                const location = data;
                const latitude = data.latitude;
                const longitude = data.longitude;
                console.log("lcation_vitri: " + latitude + ":" + longitude);

                return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAXOTNZOqwvAUls4Ax0jul3Ae58GRQn--g`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson,
                            formatted_address: responseJson.results[0].formatted_address
                        }, function () {
                            console.log('formatted_address: '+ responseJson.results[0].formatted_address);
                            // In this block you can do something with new state.
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        )

    }

    goBack(){
        const { navigation } = this.props;
        const {latitude, location, longitude} = this.state;
        navigation.goBack();
        navigation.state.params.onLocation({ location: location });
    }



    onSelect(data) {
        let latitude = data.nativeEvent.coordinate.latitude;
        let longitude = data.nativeEvent.coordinate.longitude;
        markers.push({
            latitude: latitude,
            longitude: longitude
        });
        this.setState({
            markers
        }, () => {
            console.log("wwwwwww: " + this.state.markers)
        });

    }

    renderMarker() {
        markers = [];
        for (marker of this.state.markers) {
            markers.push(
                <MapView.Marker
                    key={marker.longitude}
                    title={"Your position"}
                    description={"latitude: " + marker.latitude + " - " + "longitude: " + marker.longitude}
                    coordinate={this.state.region}
                />

            );
        }
        return markers;
    }


    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const {latitude, location, longitude} = this.state;
        console.log('location_render: '+ latitude+":"+longitude);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon3 onPress={() => this.props.navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.SelectLocation}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
                <MapView
                    ref={map => (this.map = map)}
                    onRegionChange={this.onRegionChange.bind(this)}
                    onPress={() => this.onSelect.bind(this)}
                    style={styles.map}
                    listViewDisplayed={false}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    showUserLocationButton={true}
                    provider={PROVIDER_GOOGLE}
                    zoomControlEnabled={true}
                >
                    {this.renderMarker()}
                </MapView>

                <View style={styles.latitude}>
                    <Text numberOfLines={3} style={styles.textLatitude}>{this.state.formatted_address}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.goBack()}>
                        <Text style={styles.textSelect}>Select Location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#D8D8D8"
    },
    map: {
        left: 0,
        right: 0,
        top: 70,
        bottom: 170,
        position: "absolute"
    },
    header: {
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        width: "100%",
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
        marginLeft: 5,
    },
    titleHeader: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
    },
    iconSearch: {
        marginTop: 20,
        color: colors.white,
        marginRight: 5,
    },
    latitude: {
        width: setWidth("95%"),
        justifyContent: "center",
        height: 70,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white,
        position: "absolute",
        bottom: 80
    },
    textLatitude: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.black,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        padding: 12,
        width: 160,
    },
    textSelect: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    }
});
