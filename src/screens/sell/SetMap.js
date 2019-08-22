import React, {Component} from 'react';
import {
    Alert,
    Animated,
    Button, Dimensions,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid, TouchableOpacity,
    View
} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Entypo";
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../cores/styles/colors";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import {styles} from './styles/StyleSetMap';
// latitudeDelta: constants.LATITUDE_DELTA,
// longitudeDelta: constants.LONGITUDE_DELTA,

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class SetMap extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            updatesEnabled: false,
            location: {},
            latitude: 0,
            longitude:0,
            dataSource:[],
            formatted_address:'',
        }
    }


    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    };

    componentDidMount() {
        this.getLocation();
    };

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({loading: true}, () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const region = {};
                    this.setState({
                        location: position, loading: false,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,

                    }
                    ,()=>{
                    const {latitude, location, longitude} = this.state;
                    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAXOTNZOqwvAUls4Ax0jul3Ae58GRQn--g`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                isLoading: false,
                                dataSource: responseJson,
                                formatted_address:responseJson.results[0].formatted_address
                            }, function () {
                                //console.log('location: '+ responseJson);
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            );
                console.log('location: '+ (this.state.longitude) , (this.state.latitude));


            },
            (error) => {
                this.setState({location: error, loading: false});
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50}
            );

        });
    };

    goBack(){
        const { navigation } = this.props;
        const {latitude, location, longitude} = this.state;
        navigation.goBack();
        navigation.state.params.onLocation({ location: location });
    }

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        //console.log('location: '+ JSON.stringify(this.state.formatted_address));
        //console.log('formatted_address: ' + this.state.formatted_address);
        const {latitude, location, longitude} = this.state;
        console.log('location: '+ latitude+":"+longitude);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon3 onPress={() => this.props.navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.SelectLocation}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
                <MapView
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    zoomControlEnabled={true}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{width:'100%',height:510}}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>

                <View style={styles.latitude}>
                    <Text numberOfLines={3} style={styles.textLatitude}>{this.state.formatted_address}</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btnSelectLocation} onPress={() => this.goBack()}>
                        <Text style={styles.textSelectLocation}>{Locales.SelectLocation}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '$background',
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//     },
//     iconLeft: {
//         marginTop: 20,
//         color: "#fff",
//         marginLeft: 5,
//     },
//     titleHeader: {
//         color: "white",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 20,
//         marginTop: 20,
//     },
//     iconSearch: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     result: {
//         borderWidth: 1,
//         borderColor: '#666',
//         width: '100%',
//         paddingHorizontal: 16
//     },
//     latitude: {
//         width: "90%",
//         justifyContent: "center",
//         height: 65,
//         marginTop: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         backgroundColor: '#fff'
//     },
//     textLatitude: {
//         fontSize: 16,
//         paddingLeft: 10,
//         paddingRight: 10,
//         color: 'black',
//     },
//     buttonContainer: {
//         marginVertical: 5,
//         backgroundColor: "rgba(255,255,255,0.7)",
//         borderRadius: 30,
//     },
//     button: {
//         alignItems: 'center',
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         borderRadius: 30,
//         padding: 12,
//         width: 160,
//     },
//     textSelect: {
//         fontSize: 18,
//         color: 'black',
//         fontWeight: 'bold'
//     }
// });
