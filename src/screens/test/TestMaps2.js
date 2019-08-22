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
    AsyncStorage,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Foundation";
import FastImage from "react-native-fast-image";
import MapView from 'react-native-maps';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//import {styles} from './styles/StyleMaps';
import {firebaseApp} from '../../components/firebase/Realtimedb';

const Images = [
    {uri: "https://svietland.com/wp-content/uploads/2018/07/villa-la-gi-1.jpg"},
    {uri: "https://r-ec.bstatic.com/images/hotel/max1024x768/757/75713094.jpg"},
    {uri: "https://nhabephoanggia.vn/contents/images/mau-villa-dep-13.jpg"},
    {uri: "https://r-ec.bstatic.com/images/hotel/max1024x768/120/120911789.jpg"}
]

const {width, height} = Dimensions.get("window");
const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
    return px * deviceW / basePx
}

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

//bản test này: là bản trước của maps

export default class TestMaps2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: [
                {
                    coordinate: {
                        latitude: 21.0166477,
                        longitude: 105.7878773,
                    },
                    title: "Best Place",
                    description: "This is the best place in Portland",
                    image: Images[0],
                },
                {
                    coordinate: {
                        latitude: 21.0207579,
                        longitude: 105.786888,
                    },
                    title: "Second Best Place",
                    description: "This is the second best place in Portland",
                    image: Images[1],
                },
                {
                    coordinate: {
                        latitude: 21.024271,
                        longitude: 105.789045,
                    },
                    title: "Third Best Place",
                    description: "This is the third best place in Portland",
                    image: Images[2],
                },
                {
                    coordinate: {
                        latitude: 21.027542,
                        longitude: 105.780025,
                    },
                    title: "Fourth Best Place",
                    description: "This is the fourth best place in Portland",
                    image: Images[3],
                },
            ],
            region: {
                latitude: 21.0177468,
                longitude: 105.7915921,
                latitudeDelta: 0.05864195,
                longitudeDelta: 0.070142817,
            },
        };

    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const {coordinate} = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });


    }

    render() {

        // const { navigate } = this.props.navigation;
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return {scale, opacity};
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <MapView
                    ref={map => this.map = map}
                    style={styles.map}
                    listViewDisplayed={false}
                    initialRegion={this.state.region}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.radius, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={styles.marker}/>
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}

                </MapView>

                <Animated.View style={styles.partTop}>
                    <View style={styles.tabar}>
                        <TouchableOpacity style={styles.arrowleft}>
                            <Icon4 style={styles.iconArrowleft} name="arrowleft" size={px2dp(27)} color="#424242"/>
                        </TouchableOpacity>
                        <View style={styles.mapmap}>
                            <TextComponent style={styles.titleMap}>{Locales.Map}</TextComponent>
                        </View>
                        <TouchableOpacity style={styles.bell}>
                            <Icon style={styles.iconBell} name="bell" size={px2dp(27)} color="black"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchbar}>
                        <Icon4 style={styles.iconRightcircleo} name="rightcircleo" size={px2dp(15)} color="#666"/>
                        <TextInput style={styles.textInputSearch}
                                   placeholder={Locales.SearchMap}
                                   keyboardType='default'
                                   returnKeyType="go"
                                   placeholderTextColor='#666'
                        />
                        <Icon style={styles.iconSearch} name="search" size={px2dp(26)} color="#666"/>
                    </View>
                </Animated.View>

                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        {useNativeDriver: true}
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.markers.map((marker, index) => (
                        <TouchableOpacity style={styles.card}
                                          key={index}
                            // onPress={() => navigate('Properties')}
                        >
                            <FastImage style={styles.fastImage} source={marker.image}>
                                <View style={styles.status}>
                                    <TextComponent style={styles.textStatus}>FOR SALE</TextComponent>
                                </View>
                            </FastImage>
                            <View style={styles.partBottom}>
                                <View style={styles.content1}>
                                    <TextComponent style={styles.title}>{marker.title}</TextComponent>
                                    <View style={styles.content2}>
                                        <Icon3 style={styles.iconStar} name="star" size={px2dp(15)} color="#FE9A2E"/>
                                        <TextComponent style={styles.rating}>4.3</TextComponent>
                                        <TextComponent style={styles.textReviews}>Reviews</TextComponent>
                                    </View>
                                </View>
                                <View style={styles.content3}>
                                    <TextComponent style={styles.textCurrency}>$</TextComponent>
                                    <TextComponent style={styles.textMoney}>3,500.00</TextComponent>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#D8D8D8",
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    scrollView: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: 300,
    },
    card: {
        width: '30%',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginLeft: 22,
    },
    fastImage: {
        width: '100%',
        height: 170,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        width: 60,
        height: 23,
        backgroundColor: '#0174DF',
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        top: 16,
        left: 13,
    },
    textStatus: {
        color: '#fff',
        fontSize: 11,
    },
    partBottom: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        borderRadius: 5,
    },
    content1: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        color: "black",
        fontWeight: "400",
    },
    content2: {
        width: '35%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        fontSize: 14,
        color: "#666",
        fontWeight: "400",
    },
    textReviews: {
        fontSize: 14,
        color: "#666",
    },
    content3: {
        width: '100%',
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
    },
    textCurrency: {
        fontSize: 15,
        color: "#2E64FE",
        fontWeight: "500",
    },
    textMoney: {
        fontSize: 16,
        color: "#2E64FE",
        fontWeight: "500",
    },
    radius: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        overflow: 'hidden',
        borderColor: 'rgba(0, 112, 255, 0.3)',
        backgroundColor: 'rgba(0, 112, 255, 0.1)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    ring: {
        // width: 20,
        // height: 20,
        // borderRadius: 10,
        // borderColor: 'rgba(0, 112, 255, 0.5)',
        // backgroundColor: 'rgba(0, 112, 255, 0.3)',
        // position: "absolute",
        // borderWidth: 1,
    },
    marker: {
        height: 15,
        width: 15,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
    },
    partTop: {
        width: "100%",
        height: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    tabar: {
        width: "90%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
    },
    arrowleft: {
        width: 35,
        alignItems: "flex-start"
    },
    mapmap: {
        width: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    titleMap: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    bell: {
        width: 35,
        alignItems: "center"
    },
    iconBell: {
        marginLeft: 5
    },
    searchbar: {
        width: "90%",
        height: 50,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
    },
    iconRightcircleo: {
        marginLeft: 15
    },
    textInputSearch: {
        width: "78%",
        height: "100%",
        backgroundColor: "#fff",
        padding: 5,
        fontSize: 18,
        marginLeft: 6
    },
    iconSearch: {
        marginRight: 15
    }
});
