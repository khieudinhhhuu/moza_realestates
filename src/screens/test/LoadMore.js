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
    Modal,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import EStyleSheet from "react-native-extended-stylesheet";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {getDataOfflineMode, setWidth, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import {colors} from "../../cores/styles/colors";
import global from "../../cores/utils/global";
import axios from "axios";
import {large_bold, mini2, small, small2_bold} from "../../cores/styles/styleText";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class LoadMore extends Component {

    constructor(props) {
        super(props);

        this.page = 1;

        this.state = {
            loading: false,
            isRefreshing: false,
            data: [],
            error: '',
            bg: colors.blue,
        };

        thisState = this;

    }

    componentWillMount() {
        this.fetchUser(this.page) //Method for API call
    }

    fetchUser(page) {
        //stackexchange User API url
        const url = `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`;
        this.setState({
            loading: true
        });
        axios.get(url)
            .then(res => {
                let listData = this.state.data;
                let data = listData.concat(res.data.items) . //concate list with response
                this.setState({
                    loading: false,
                    data: data
                })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'Something just went wrong' })
            });
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

    }

    render() {
        const {navigate} = this.props.navigation;
        const color = this.state.bg;
        if (this.state.loading && this.page === 1) {
            return (
                <View style={{width: '100%', height: '100%'}}>
                    <ActivityIndicator style={{ color: '#000' }} />
                </View>
            );
        }
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    <TextComponent style={styles.titleHeader}>Load More</TextComponent>
                    <Icon onPress={() => navigate("LoadMore")} style={styles.iconBell} name="bell" size={px2dp(30)}/>
                </View>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            padding: 15,
                            alignItems: 'center',
                        }}>
                            <Image source={{ uri: item.profile_image }}
                                   style={{
                                       height: 50,
                                       width: 50,
                                       marginRight: 10
                                   }} />
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#65A7C5',
                            }}>{item.display_name}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.handleLoadMore.bind(this)}
                />
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    };

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.page = this.page + 1; // increase page by 1
            this.fetchUser(this.page); // method for API call
        }
    };

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        const url = `https://api.stackexchange.com/2.2/users?page=1&order=desc&sort=reputation&site=stackoverflow`;
        axios.get(url)
            .then(res => {
                let data = res.data.items;
                this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
            })
            .catch(error => {
                this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
            });
    }

}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$background"
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
        //marginLeft: 5,
    },
    titleHeader: {
        color: colors.white,
        textAlign: "center",
        ...large_bold,
        marginTop: 20,
    },
    iconBell: {
        marginTop: 20,
        color: colors.white,
        //marginRight: 5,
    },
    body: {
        width: setWidth('95%'),
        paddingBottom: 70,
    },
    content: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "$bg2",
        borderRadius: 4,
    },
    item: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    imageItem: {
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
        ...mini2,
    },
    favorite: {
        width: 35,
        height: 35,
        backgroundColor: colors.white,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        top: 13,
        right: 13,
    },
    iconFavorite: {
        color: colors.red,
    },
    partBottom: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    content1: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 13,
    },
    title: {
        ...small2_bold,
        color: "$textColor",
        textAlign: 'center',
    },
    Reviews: {
        width: '28%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        ...mini2,
        color: colors.color_text_second,
        fontWeight: "400",
    },
    textReviews: {
        ...mini2,
        color: colors.color_text_second,
    },
    content3: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 1,
        marginBottom: 13,
    },
    content4: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    viewAddress: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        ...small,
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
        ...small,
        color: colors.color_text_second,
    },
    textUnit: {
        ...small,
        color: colors.color_text_second,
    },
    viewPrice: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    textCurrency: {
        ...small2_bold,
        //color: colors.button1,
    },
    textMoney: {
        ...small2_bold,
        //color: colors.button1,
    },
});
