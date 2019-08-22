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
    AsyncStorage,
    Modal,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../cores/styles/colors";
//import Modal from "react-native-modal";
import {
    getDataOfflineMode,
    saveDataOfflineMode,
    inValidateText, setWidth, setHeight
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}


const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

export default class TestGgPlacesAutoComplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            itemSelect: "",
            dataMarker: "",
            ModalVisibleStatus: false,
            region: {
                latitude: 21.0156199,
                longitude: 105.7784527,
                latitudeDelta: 0.030233219033370062,
                longitudeDelta: 0.017230845987782573,
            },
            check: false,
            bg: colors.blue,
        };

        thisState = this;

    }

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        this.setState(
            {
                bg: backgroundColor
            });


        let array = [];
        firebaseApp.database().ref('data').child('bds').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    address: childData.address,
                    avatar: childData.avatar,
                    bathrooms: childData.bathrooms,
                    bedrooms: childData.bedrooms,
                    description: childData.description,
                    detail: childData.detail,
                    image: childData.image,
                    kitchen: childData.kitchen,
                    landmark: childData.landmark,
                    link: childData.link,
                    name: childData.name,
                    owner: childData.owner,
                    parkings: childData.parkings,
                    price: childData.price,
                    rate: childData.rate,
                    sqm: childData.sqm,
                    status: childData.status,
                    type: childData.types,
                    year: childData.year,
                    latitude: childData.latitude,
                    longitude: childData.longitude,
                    latitudeDelta: childData.latitudeDelta,
                    longitudeDelta: childData.longitudeDelta,
                });
            });
            thisState.setState({
                data: array,
            });
        });

    }

    onSelect(item) {
        console.log('data marker: ' + JSON.stringify(item));
        this.ShowModalFunction(true, item)
    };

    ShowModalFunction(visible, item) {
        this.setState({
            ModalVisibleStatus: visible,
            dataMarker: item
        });
    };

    _onUpdate() {
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        const allStates = this.state;
        const color = this.state.bg;
        return (
            <View style={styles.container}>
                {/*<StatusBar*/}
                {/*    //barStyle="dark-content"*/}
                {/*    hidden={false}*/}
                {/*    backgroundColor="transparent"*/}
                {/*    translucent*/}
                {/*/>*/}
                <View style={styles.header}>
                    <Icon5 style={styles.iconLeft} name="google-maps"
                           size={px2dp(33)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.Map}</TextComponent>
                    <Icon5 style={styles.iconBell} name="format-list-bulleted"
                           size={px2dp(30)}/>
                </View>

                {/*<MapView*/}
                {/*    ref={map => this.map = map}*/}
                {/*    provider={MapView.PROVIDER_GOOGLE}*/}
                {/*    style={styles.map}*/}
                {/*    listViewDisplayed={false}*/}
                {/*    initialRegion={this.state.region}*/}
                {/*    onMapReady={this.onMapReady}*/}
                {/*    onRegionChange={this.onRegionChange}*/}
                {/*    showsUserLocation={true}*/}
                {/*    showUserLocationButton={true}*/}
                {/*    zoomControlEnabled={true}*/}
                {/*    mapType="standard"*/}
                {/*    followsUserLocation={true}*/}
                {/*    showsMyLocationButton={true}*/}
                {/*    showsPointsOfInterest={true}*/}
                {/*    showsCompass={true}*/}
                {/*    showsBuildings={true}*/}
                {/*>*/}
                {/*    {*/}
                {/*        this.state.data.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <MapView.Marker*/}
                {/*                    onCalloutPress={() => navigate('Details', {item: item})}*/}
                {/*                    onPress={() => this.onSelect(item)}*/}
                {/*                    title={item.name}*/}
                {/*                    description={item.sqm + " sq/m " + " - " + item.price + " vnđ"}*/}
                {/*                    key={index}*/}
                {/*                    coordinate={{*/}
                {/*                        latitude: item.latitude,*/}
                {/*                        longitude: item.longitude,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</MapView>*/}

                {/*<Animated.View style={styles.searchBar}>*/}
                    {/*<Icon4 style={styles.iconRightcircleo} name="rightcircleo" size={px2dp(15)} color="#666"/>*/}


                    <GooglePlacesAutocomplete
                        // placeholder= {Locales.SearchMap}
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        getDefaultValue={() => ''}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: constants.API_GOOGLE_MAP,
                            language: 'en', // language of the results
                            types: '(cities)' // default: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                width: '100%',
                                height: 50,
                                borderRadius: 0,
                                paddingHorizontal: 0,
                                backgroundColor: "#e91e82",
                                marginLeft: 3,
                                marginRight: 3
                            },
                            textInput: {
                                width: "100%",
                                height: 50,
                                fontSize: 18,
                                borderRadius: 0,
                                marginTop: 0,
                                marginRight: 0,
                                marginLeft: 0
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#0099ff'
                            },
                        }}

                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        // currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}

                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        // predefinedPlaces={[homePlace, workPlace]}

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        //renderLeftButton={()  => <Image style={{width: 30, height: 30}} source={require('../../assets/image/add_image.png')} />}
                        //renderRightButton={() => <Image style={{width: 30, height: 30}} source={require('../../assets/image/add_image.png')} />}
                    />
                {/*    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(28)} color="#666"/>*/}
                {/*</Animated.View>*/}

                {/*<Modal*/}
                {/*    transparent={true}*/}
                {/*    animationType={"slide"}*/}
                {/*    visible={this.state.ModalVisibleStatus}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.ShowModalFunction(!this.state.ModalVisibleStatus)*/}
                {/*    }}>*/}

                {/*    <TouchableOpacity*/}
                {/*        onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker)}*/}
                {/*        style={styles.modalContainer}>*/}
                {/*        <View style={styles.ModalInsideView}>*/}
                {/*            <TouchableOpacity style={styles.content}*/}
                {/*                              onPress={() => navigate('Details', {item: allStates.dataMarker}, this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker))}>*/}
                {/*                <View style={styles.viewImage}>*/}
                {/*                    <FastImage*/}
                {/*                        style={[styles.imageItem]}*/}
                {/*                        source={{uri: allStates.dataMarker.image}}/>*/}
                {/*                </View>*/}
                {/*                <View style={styles.viewText}>*/}
                {/*                    <TextComponent style={styles.title}*/}
                {/*                                   numberOfLines={1}>{allStates.dataMarker.name}</TextComponent>*/}
                {/*                    <View style={styles.viewAddress}>*/}
                {/*                        <Icon4 style={styles.iconEnviromento} name="enviromento" size={px2dp(13)}*/}
                {/*                               color="#666"/>*/}
                {/*                        <TextComponent style={styles.textCity}*/}
                {/*                                       numberOfLines={1}>{allStates.dataMarker.address}</TextComponent>*/}
                {/*                    </View>*/}
                {/*                    <View style={styles.viewDescription}>*/}
                {/*                        <TextComponent style={[styles.textDescription]}*/}
                {/*                                       numberOfLines={2}>{allStates.dataMarker.description}</TextComponent>*/}
                {/*                    </View>*/}
                {/*                    <TextComponent style={styles.textDetail}>({Locales.Seedetails})</TextComponent>*/}
                {/*                </View>*/}
                {/*            </TouchableOpacity>*/}
                {/*            <View style={styles.btn}>*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker)}*/}
                {/*                    style={styles.btnCancel}>*/}
                {/*                    <TextComponent*/}
                {/*                        style={styles.textCancel}>{Locales.CancelSettings}</TextComponent>*/}
                {/*                </TouchableOpacity>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}
                {/*</Modal>*/}
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
    },
    map: {
        left: 0,
        right: 0,
        top: 120,
        bottom: 0,
        position: 'absolute'
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
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
        fontSize: 22,
        marginTop: 20,
    },
    iconBell: {
        marginTop: 20,
        color: colors.white,
        marginRight: 5,
    },
    searchBar: {
        width: setWidth("100%"),
        //height: 50,
        backgroundColor: colors.white,
        justifyContent: "center",
        //alignItems: "center",
        flexDirection: "row",
    },
    iconRightcircleo: {
        marginLeft: 17,
        marginTop: 18,
    },
    iconSearch: {
        marginRight: 13,
        marginTop: 13,
    },
    viewStyle: {
        width: "12%",
        height: "13%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        borderRadius: 5,
        top: 220,
        right: 15,
    },
    styleMap: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 0.5,
    },
    iconStyleMap: {
        color: colors.green
    },
    styleList: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 0.5,
    },
    iconStyleList: {
        color: colors.green
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
    },
    ModalInsideView: {
        width: '92%',
        height: 140,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        position: "absolute",
        bottom: 80
    },
    content: {
        width: '100%',
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: "$bgColor"
    },
    viewImage: {
        width: '30%',
    },
    imageItem: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    viewText: {
        width: '70%',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 1,
        //justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        color: "$textColor",
        fontWeight: "bold",
    },
    viewAddress: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        fontSize: 14,
        color: colors.color_text_second
    },
    viewDescription: {
        width: '100%',
        //height: 33,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textDescription: {
        fontSize: 13,
        color: colors.color_text_second,
    },
    textDetail: {
        fontSize: 14,
        color: "$textColor",
    },
    btn: {
        width: '100%',
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$header",
        marginTop: 5,
        borderRadius: 5,
    },
    btnCancel: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    textCancel: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    body: {
        width: setWidth('90%'),
        paddingBottom: 70,
    },
    content2: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "$bg2",
        borderRadius: 4,
    },
    itemTwo: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    imageItemTwo: {
        width: '100%',
        height: 170,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        width: 80,
        height: 27,
        //backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        top: 16,
        left: 13,
    },
    textStatus: {
        color: colors.white,
        fontSize: 13,
    },
    partBottom: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    content6: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 13,
    },
    titleName: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
        textAlign: 'center',
    },
    viewRating: {
        width: '28%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        fontSize: 14,
        color: colors.color_text_second,
        fontWeight: "400",
    },
    textReviews: {
        fontSize: 14,
        color: colors.color_text_second,
    },
    content7: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 1,
        marginBottom: 13,
    },
    content8: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    viewAddress2: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    iconEnviromento10: {
        marginRight: 2,
    },
    textCity2: {
        fontSize: 14,
        color: colors.color_text_second,
    },
    viewSqm: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2,
    },
    textKm: {
        marginRight: 2,
        fontSize: 14,
        color: colors.color_text_second,
    },
    textUnit: {
        fontSize: 14,
        color: colors.color_text_second,
    },
    viewPrice: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    textCurrency: {
        fontSize: 15,
        //color: colors.button1,
        fontWeight: "500",
    },
    textMoney: {
        fontSize: 16,
        //color: colors.button1,
        fontWeight: "500",
    },
});
