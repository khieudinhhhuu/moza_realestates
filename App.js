import React, {Component} from 'react';
import {
    Button,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// latitudeDelta: constants.LATITUDE_DELTA,
//     longitudeDelta: constants.LONGITUDE_DELTA,
export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            updatesEnabled: false,
            location: {},
            latitude: '',
            longitude: '',
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
    }

    componentDidMount() {
        this.getLocation();

    }

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

                    },()=>{
                        const {latitude, location, longitude} = this.state;
                        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAXOTNZOqwvAUls4Ax0jul3Ae58GRQn--g`)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    isLoading: false,
                                    dataSource: responseJson,
                                    formatted_address:responseJson.results[0].formatted_address
                                }, function () {
                                    // console.log('location: '+ responseJson);
                                    // In this block you can do something with new state.
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    });
                    // console.log('location: '+ (this.state.longitude) , (this.state.latitude));


                },
                (error) => {
                    this.setState({location: error, loading: false});
                    console.log(error);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50}
            );

        });
    }

    getLocal(){

    }
    render() {
        console.log('location: '+ JSON.stringify(this.state.formatted_address));
        const {latitude, location, longitude} = this.state;
        return (
            <View style={styles.container}>
                <Text>{latitude}+ {longitude}</Text>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 12
    },
    result: {
        borderWidth: 1,
        borderColor: '#666',
        width: '100%',
        paddingHorizontal: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%'
    }
});
