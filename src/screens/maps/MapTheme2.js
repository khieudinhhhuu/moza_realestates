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
import Icon6 from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../cores/styles/colors";
import {styles} from "./styles/StyleMapTheme2";
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

//import Modal from "react-native-modal";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

const mapStyle = [
    {
        "color": "#212121"
    },
    {
        "color": "#757575"
    },
];

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class MapTheme2 extends Component {

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

    onCheck(value){
        if (value === false) {
            this.setState({
                check: false,
            });
        } else {
            this.setState({
                check: true,
            });
        }
    }

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        if (validateText(backgroundColor)) {
            this.setState({
                    bg: backgroundColor
                }, () =>
                    global.colors = this.state.bg
            )
        } else {
            this.setState({
                    bg: colors.blue
                }, () =>
                    global.colors = this.state.bg
            )
        }


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
                    latitude: childData.latitude,
                    latitudeDelta: childData.latitudeDelta,
                    link: childData.link,
                    longitude: childData.longitude,
                    longitudeDelta: childData.longitudeDelta,
                    name: childData.name,
                    owner: childData.owner,
                    parkings: childData.parkings,
                    price: childData.price,
                    rate: childData.rate,
                    sqm: childData.sqm,
                    status: childData.status,
                    type: childData.type,
                    year: childData.year,
                    checkFavourite: childData.checkFavourite,
                });
            });
            thisState.setState({
                data: array,
            });
        });

    }

    onRegionChange(region){
        // console.log('region: ' + JSON.stringify(region));
    };

    onSelect(item){
        console.log('data marker: ' + JSON.stringify(item));
        this.ShowModalFunction(true, item)
    };

    ShowModalFunction(visible, item) {
        this.setState({
            ModalVisibleStatus: visible,
            dataMarker:item
        });
    };

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        const allStates = this.state;
        const color = this.state.bg;
        if (this.state.check === false) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        //barStyle="dark-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />

                    <MapView
                        ref={map => this.map = map}
                        provider={MapView.PROVIDER_GOOGLE}
                        style={styles.map}
                        listViewDisplayed={false}
                        initialRegion={this.state.region}
                        onMapReady={this.onMapReady}
                        onRegionChange={this.onRegionChange}
                        showsUserLocation={true}
                        showUserLocationButton={true}
                        zoomControlEnabled={true}
                        mapType="standard"
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        showsPointsOfInterest={true}
                        showsCompass={true}
                        showsBuildings={true}
                        customMapStyle={mapStyle}
                    >
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <MapView.Marker
                                        onCalloutPress={() => navigate('Details', {item: item})}
                                        onPress={() => this.onSelect(item)}
                                        title={item.name}
                                        description={item.sqm + " sq/m " + " - " + item.price + " vnđ"}
                                        key={index}
                                        coordinate={{
                                            latitude: item.latitude,
                                            longitude: item.longitude,
                                        }}
                                    />
                                )
                            })
                        }
                    </MapView>


                    <Animated.View style={styles.header}>
                        <View style={styles.iconLeft} />
                        <TextComponent style={styles.titleHeader}>{Locales.Map}</TextComponent>
                        <Icon5 onPress={() => this.onCheck(true)} style={styles.iconBell} name="format-list-bulleted" size={px2dp(30)}/>
                    </Animated.View>

                    <Animated.View style={styles.viewSearch}>
                        <View style={styles.searchBar}>
                            <Icon4 style={styles.iconRightcircleo} name="rightcircleo" size={px2dp(15)} color="#666"/>
                            <TextInput style={styles.textInputSearch}
                                       placeholder={Locales.SearchMap}
                                       keyboardType='default'
                                       returnKeyType="search"
                                       placeholderTextColor='#666'
                            />
                            <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(28)}
                                  color="#666"/>
                        </View>
                    </Animated.View>

                    <Modal
                        transparent={true}
                        animationType={"slide"}
                        visible={this.state.ModalVisibleStatus}
                        onRequestClose={() => {
                            this.ShowModalFunction(!this.state.ModalVisibleStatus)
                        }}>

                        <TouchableOpacity
                            onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker)}
                            style={styles.modalContainer}>
                            <View style={styles.ModalInsideView}>
                                <TouchableOpacity style={styles.content}
                                                  onPress={() => navigate('Details', {item: allStates.dataMarker}, this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker))}>
                                    <View style={styles.viewImage}>
                                        <FastImage
                                            style={[styles.imageItem]}
                                            source={{uri: allStates.dataMarker.image}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent style={styles.title}
                                                       numberOfLines={1}>{allStates.dataMarker.name}</TextComponent>
                                        <View style={styles.viewAddress}>
                                            <Icon4 style={styles.iconEnviromento} name="enviromento" size={px2dp(13)}
                                                   color="#666"/>
                                            <TextComponent style={styles.textCity}
                                                           numberOfLines={1}>{allStates.dataMarker.address}</TextComponent>
                                        </View>
                                        <View style={styles.viewDescription}>
                                            <TextComponent style={[styles.textDescription]}
                                                           numberOfLines={2}>{allStates.dataMarker.description}</TextComponent>
                                        </View>
                                        <TextComponent style={styles.textDetail}>({Locales.Seedetails})</TextComponent>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.btn}>
                                    <TouchableOpacity
                                        onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus, allStates.dataMarker)}
                                        style={styles.btnCancel}>
                                        <TextComponent
                                            style={styles.textCancel}>{Locales.CancelSettings}</TextComponent>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar
                        //barStyle="dark-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <View style={styles.headerTwo}>
                        <View style={styles.iconLeftTwo} />
                        <TextComponent style={styles.titleHeaderTwo}>LIST</TextComponent>
                        <Icon5 onPress={() => this.onCheck(false)} style={styles.iconBellTwo} name="google-maps" size={px2dp(30)}/>
                    </View>

                    <ScrollView style={styles.keyboardView}>
                        <View style={styles.body}>
                            <View style={styles.viewSearchTwo}>
                                <View style={styles.locationTwo}>
                                    <TextComponent style={styles.textLocationTwo}>LOCATION</TextComponent>
                                    <Icon6 style={styles.iconSound} name="sound-mix" size={px2dp(20)}/>
                                </View>
                                <View style={styles.searchBarTwo}>
                                    <TextInput style={styles.textInputSearchTwo}
                                               placeholder={Locales.SearchMap}
                                               keyboardType='default'
                                               returnKeyType="search"
                                               placeholderTextColor='#666'
                                    />
                                    <Icon style={styles.iconSearch} name="search" size={px2dp(28)} color="#666"/>
                                </View>
                                <View style={styles.horizontal}/>
                                <View style={styles.viewBottom}>
                                    <View style={styles.propertyType}>
                                        <TextComponent style={styles.textProperty}>PROPERTY TYPE</TextComponent>
                                        <TextComponent style={styles.textType}>Houses</TextComponent>
                                    </View>
                                    <View style={styles.vertical}/>
                                    <View style={styles.rooms}>
                                        <TextComponent style={styles.textRooms}>ROOMS</TextComponent>
                                        <TextComponent style={styles.textNumber}>3+1</TextComponent>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.FlatList2}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.data}
                                    renderItem={({item}) => (
                                        <View style={styles.content2}>
                                            <TouchableOpacity style={styles.itemTwo}
                                                              onPress={() => navigate('Details', {item: item})}>
                                                <FastImage style={styles.imageItemTwo} source={{uri: item.image}}>
                                                    <View style={[styles.status, {backgroundColor: color}]}>
                                                        <TextComponent style={styles.textStatus}>{item.status}</TextComponent>
                                                    </View>
                                                </FastImage>
                                                <View style={styles.partBottom}>
                                                    <View style={styles.content6}>
                                                        <TextComponent style={styles.titleName}>{item.name}</TextComponent>
                                                        <View style={styles.viewRating}>
                                                            <Icon3 style={styles.iconStar} name="star" size={px2dp(14)}
                                                                   color="#FE9A2E"/>
                                                            <TextComponent style={styles.rating}>{item.rate}</TextComponent>
                                                            <TextComponent style={styles.textReviews}>Reviews</TextComponent>
                                                        </View>
                                                    </View>
                                                    <View style={styles.content7}>
                                                        <View style={styles.content8}>
                                                            <View style={styles.viewAddress2}>
                                                                <Icon4 style={styles.iconEnviromento10} name="enviromento"
                                                                       size={px2dp(14)} color="#666"/>
                                                                <TextComponent
                                                                    style={styles.textCity2}>{item.address}</TextComponent>
                                                            </View>
                                                            <View style={styles.viewSqm}>
                                                                <Icon4 style={styles.iconHome} name="home" size={px2dp(14)}
                                                                       color="#666"/>
                                                                <TextComponent style={styles.textKm}>{item.sqm}</TextComponent>
                                                                <TextComponent style={styles.textUnit}>sq/m</TextComponent>
                                                            </View>
                                                        </View>
                                                        <View style={styles.viewPrice}>
                                                            <TextComponent style={[styles.textCurrency, {color: color}]}>$</TextComponent>
                                                            <TextComponent style={[styles.textMoney, {color: color}]}>{item.price}</TextComponent>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => item.id}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: "#D8D8D8",
//     },
//     map: {
//         left: 0,
//         right: 0,
//         top: 120,
//         bottom: 0,
//         position: 'absolute'
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 10,
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
//         fontSize: 22,
//         marginTop: 20,
//     },
//     iconBell: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     searchbar: {
//         width: "100%",
//         height: 50,
//         backgroundColor: "#fff",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconRightcircleo: {
//         marginLeft: 17
//     },
//     textInputSearch: {
//         width: "78%",
//         height: "100%",
//         backgroundColor: "#fff",
//         padding: 5,
//         fontSize: 18,
//         marginLeft: 3
//     },
//     iconSearch: {
//         marginRight: 17
//     },
//     modalContainer: {
//         width: "95%",
//         height: 140,
//         alignItems: "center",
//         position: 'absolute',
//         borderRadius: 5,
//         bottom: 80,
//         left: "2.5%",
//     },
//     content: {
//         width: '100%',
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         borderRadius: 5,
//         backgroundColor: "$bgColor"
//     },
//     viewImage: {
//         width: '30%',
//     },
//     fastImage: {
//         width: '100%',
//         height: 100,
//         borderRadius: 3,
//     },
//     viewText: {
//         width: '70%',
//         height: 100,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 5,
//         paddingTop: 1,
//         //justifyContent: "space-between",
//     },
//     title: {
//         fontSize: 18,
//         color: "$textColor",
//         fontWeight: "bold",
//     },
//     content5: {
//         width: "100%",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconEnviromento: {
//         marginRight: 2,
//     },
//     textCity: {
//         fontSize: 14,
//         color: "#666"
//     },
//     content2: {
//         width: '100%',
//         //height: 33,
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//     },
//     textContent2: {
//         fontSize: 13,
//         color: "#666",
//     },
//     textDetail: {
//         fontSize: 14,
//         color: "$textColor",
//     },
//     btn: {
//         width: '100%',
//         height: 35,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#0174DF",
//         marginTop: 5,
//         borderRadius: 5,
//     },
//     btnCancel: {
//         width: '100%',
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textCancel: {
//         fontSize: 20,
//         color: "#fff",
//         fontWeight: "bold",
//     },
// });
