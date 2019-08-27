import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableOpacity, Image
} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/FontAwesome";
import {firebaseApp} from "../../components/firebase/Realtimedb";
import FastImage from "react-native-fast-image";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import {setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {medium_bold, mini, mini2, small_bold} from "../../cores/styles/styleText";
import {colors} from "../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}


export default class DetailStore extends Component {

    constructor(props) {
        super(props);

        this.offset = 0;

        this.state = {
            isLoading: true,
            data: [],
            scrollOffset: new Animated.Value(0),
            titleWidth: 0,
        };

        thisState = this;
    }

    componentDidMount() {
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
                    isLoading: false,
                });
        });
    }


    onScroll = e => {
        const scrollSensitivity = 4 / 3;
        const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
        this.state.scrollOffset.setValue(offset);
    };

    render() {
        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#BBBBBB"
                    translucent={false}
                />
                <Animated.View
                    style={[
                        styles.header,
                        {
                            paddingHorizontal: screenWidth * 0.05,
                            width: screenWidth,
                            height: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [90, 50],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}>
                    <View style={styles.viewBack}>
                        <Icon5 onPress={() => navigation.goBack()} style={styles.iconLeft} name="long-arrow-left" size={px2dp(23)}/>
                    </View>
                    <Animated.Text
                        onLayout={e => {
                            if (this.offset === 0 && this.state.titleWidth === 0) {
                                const titleWidth = e.nativeEvent.layout.width;
                                this.setState({ titleWidth });
                            }
                        }}
                        style={{
                            fontWeight: 'bold',
                            color: "#000",
                            fontSize: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [25, 22],
                                extrapolate: 'clamp',
                            }),
                            marginBottom: 10,
                            left: -8,
                        }}>
                        Header Title Here
                    </Animated.Text>
                    <Animated.View
                        style={{
                            width: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
                                extrapolate: 'clamp',
                            }),
                        }}
                    />
                </Animated.View>

                <ScrollView
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ width: '100%' }}
                    onScroll={this.onScroll}
                    scrollEventThrottle={20}
                >
                    <View style={styles.FlatList}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.item}>
                                    <Image
                                        style={styles.imageItem}
                                        source={{uri: item.image}}
                                    />
                                    <View style={styles.partBottom}>
                                        <TextComponent style={styles.title}>{item.name}</TextComponent>
                                        <View style={styles.content2}>
                                            <View style={styles.Address}>
                                                <Icon4
                                                    style={styles.iconEnviromento}
                                                    name="enviromento"
                                                    size={px2dp(11)}
                                                    color="#666"
                                                />
                                                <TextComponent style={styles.textCity}>
                                                    {item.address}
                                                </TextComponent>
                                            </View>
                                            <View style={styles.Sqm}>
                                                <Icon4
                                                    style={styles.iconHome}
                                                    name="home"
                                                    size={px2dp(11)}
                                                    color="#666"
                                                />
                                                <Text style={styles.textKm}>{item.sqm}</Text>
                                                <Text style={styles.textUnit}>sq/m</Text>
                                            </View>
                                        </View>
                                        <View style={styles.Price}>
                                            <TextComponent style={styles.textCurrency}>$</TextComponent>
                                            <TextComponent style={styles.textMoney}>{item.price}</TextComponent>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => item.id}
                            numColumns={2}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    viewBack: {
        width: '10%',
        height: 30,
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    iconLeft: {
        color: "#000",
    },
    FlatList: {
        width: setWidth("98%"),
        marginHorizontal: 5,
        marginTop: 20,
    },
    item: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        margin: 5,
        borderRadius: 5
    },
    imageItem: {
        width: "100%",
        height: 150,
        marginBottom: 8,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between"
    },
    title: {
        ...small_bold,
        color: "$textColor",
        textAlign: "left"
    },
    content2: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 3,
    },
    Address: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingRight: 7,
    },
    iconEnviromento: {
        marginRight: 2,
        marginTop: 1,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second
    },
    Sqm: {
        width: "50%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2
    },
    textKm: {
        marginRight: 2,
        ...mini,
        color: colors.color_text_second
    },
    textUnit: {
        ...mini,
        color: colors.color_text_second
    },
    Price: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 2
    },
    textCurrency: {
        ...mini2,
        color: colors.button1,
        fontWeight: "500",
        marginRight: 1
    },
    textMoney: {
        ...mini2,
        color: colors.button1,
        fontWeight: "500"
    }
});