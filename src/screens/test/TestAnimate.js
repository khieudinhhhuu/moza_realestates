import React, {Component} from 'react';
import {
    ScrollView, StyleSheet, View, Animated, Text,
    Platform, SafeAreaView, TouchableOpacity, FlatList
} from 'react-native';
import FastImage from "react-native-fast-image";
import {Icon} from 'native-base';
import {colors} from '../../cores/styles/colors';
import {setHeight, setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import ItemList from "../../cores/viewComponents/viewItems/ItemList";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import EStyleSheet from "react-native-extended-stylesheet";

const Header_Maximum_Height = setHeight('30%');
const Header_Minimum_Height = 50;

export default class TestAnimate extends Component {

    constructor() {
        super();
        this.state = {
            bookmarks: [
                {
                    _id: 1,
                    imageUrl: 'http://cdn.hoahoctro.vn/uploads/2019/04/5ca41fe58b423-d3kbgdsu8aahbys.jpg',
                    title: 'Avengers',
                    author: 'marvel'
                },
                {
                    _id: 2,
                    imageUrl: 'http://cdn.hoahoctro.vn/uploads/2019/04/5ca41fe58b423-d3kbgdsu8aahbys.jpg',
                    title: 'Avengers',
                    author: 'marvel'
                },
                {
                    _id: 3,
                    imageUrl: 'http://cdn.hoahoctro.vn/uploads/2019/04/5ca41fe58b423-d3kbgdsu8aahbys.jpg',
                    title: 'Avengers',
                    author: 'marvel'
                },
            ],
        };
        this.AnimatedHeaderValue = new Animated.Value(0);
    }

    render() {
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],
                outputRange: ['transparent', '#0499ff'],
                extrapolate: 'clamp'
            });
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.AnimatedHeaderValue}}}]
                    )}>
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.image}
                            source={{uri: 'http://cdn.hoahoctro.vn/uploads/2019/04/5ca41fe58b423-d3kbgdsu8aahbys.jpg'}}
                            // resizeMode={FastImage.resizeMode.contain}
                        />
                        <View style={styles.boxImage}/>
                        <View style={[styles.itemImage, styles.viewRow]}>
                            <FastImage
                                style={styles.avatar}
                                source={{uri: 'http://cdn.hoahoctro.vn/uploads/2019/04/5ca41fe58b423-d3kbgdsu8aahbys.jpg'}}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={styles.viewItemText}>
                                <TextComponent style={styles.title}>Avegers</TextComponent>
                                <TextComponent style={styles.author}>Marvel</TextComponent>
                                <Text style={styles.published}>Published: 28/05/2019</Text>
                                <View style={[styles.viewBottomRight, styles.viewRow]}>
                                    <View>
                                        <TouchableOpacity style={styles.buttonMin}>
                                            <TextComponent style={styles.reviews}>Reviews</TextComponent>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={[styles.buttonTag, styles.boxWithShadow]}>
                                            <Icon name='bookmark-border' type='MaterialIcons' style={styles.iconTag}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <TextComponent style={styles.text}>
                            Hello! This is a generator for text fonts of the "cool" variety. I noticed people were
                            trying to find a generator
                            like fancy letters, but were ending up on actual font sites rather than generators of
                            copy-paste text like this one.
                            So currently this is basically a duplicate of the above,
                            but I think I'll try to collect a few more "cool" text fonts, like the old enlgish one, and
                            specialise this a bit.
                            Hello! This is a generator for text fonts of the "cool" variety. I noticed people were
                            trying to find a generator
                            like fancy letters, but were ending up on actual font sites rather than generators of
                            copy-paste text like this one.
                            So currently this is basically a duplicate of the above,
                            but I think I'll try to collect a few more "cool" text fonts, like the old enlgish one, and
                            specialise this a bit.
                            Hello! This is a generator for text fonts of the "cool" variety. I noticed people were
                            trying to find a generator
                            like fancy letters, but were ending up on actual font sites rather than generators of
                            copy-paste text like this one.
                            So currently this is basically a duplicate of the above,
                            but I think I'll try to collect a few more "cool" text fonts, like the old enlgish one, and
                            specialise this a bit.
                            Hello! This is a generator for text fonts of the "cool" variety. I noticed people were
                            trying to find a generator
                            like fancy letters, but were ending up on actual font sites rather than generators of
                            copy-paste text like this one.
                            So currently this is basically a duplicate of the above,
                            but I think I'll try to collect a few more "cool" text fonts, like the old enlgish one, and
                            specialise this a bit.
                        </TextComponent>
                    </View>
                    {/*ListBook*/}

                    <View>
                        <Text style={styles.titleItemList}>Books</Text>
                        <FlatList
                            data={this.state.bookmarks}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // renderItem={item => this.renderItem(item)}
                            renderItem={({item, i}) => (
                                <TouchableOpacity>
                                    <ItemList
                                        image={{uri: item.imageUrl}}
                                        styleImage={styles.imageItemFL}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => navigate('EpubReader')}
                        style={styles.buttonMax}>
                        <TextComponent style={styles.textbtn}>READ NOW</TextComponent>
                    </TouchableOpacity>
                </View>
                {/*hearder*/}
                <Animated.View
                    style={[styles.header, {
                        height: (Platform.OS === 'ios') ? 80 : 45,
                        backgroundColor: AnimateHeaderBackgroundColor
                    }]}>
                    <View style={[styles.horizontal, {
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: (Platform.OS === 'ios') ? 35 : 0
                    }]}>
                        <Icon name='ios-arrow-back' style={styles.icon}/>
                        <TextComponent>Detail</TextComponent>
                        <Icon name='clouddownload' type='AntDesign' style={styles.icon}/>
                    </View>
                </Animated.View>

            </View>
        );
    }
}

const styles = EStyleSheet.create({
    saf: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '$bgColor',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewRow: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        // alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    body: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    footer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',

    },
    itemImage: {
        position: 'absolute',
        bottom: 0,

    },
    viewImage: {
        height: setHeight('33%')
    },
    boxImage: {
        width: '100%',
        height: setHeight('30%'),
        backgroundColor: '#00000021',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: setHeight('30%')
    },
    icon: {
        color: colors.white,
        fontSize: 30
    },
    avatar: {
        width: setWidth('40%'),
        height: setHeight('20%'),
        borderRadius: 10
    },
    title: {
        color: colors.white,
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 3
    },
    author: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 3
    },
    published: {
        color: colors.background,
        fontSize: 14,
        fontWeight: '600',
        paddingBottom: 3
    },
    dash: {
        width: setWidth('50%'),
        marginTop: 5,
        height: 0.5,
        marginBottom: 5
    },
    viewItemText: {
        width: setWidth('50%'),
    },
    rating: {
        // marginTop: 5,
        alignItems: 'flex-start',
        // color:'red'
    },
    viewBottomRight: {
        top: setHeight('1%')
    },
    reviews: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '500',
    },
    buttonMin: {
        backgroundColor: colors.blue,
        width: setWidth('25%'),
        alignItems: 'center',
        borderRadius: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5
    },
    buttonTag: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    boxWithShadow: {
        shadowColor: '#a2a2a2',
        shadowOffset: {width: 0.5, height: 0},
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5
    },
    iconTag: {
        color: colors.blue,
        fontSize: 25
    },
    text: {
        fontSize: 15
    },
    buttonMax: {
        width: setWidth('80%'),
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbtn: {
        fontSize: 16
    },
    imageItemFL: {
        width: setWidth('28%'),
        height: setHeight('18%'),
    },
    titleItemList: {
        marginLeft: 10,
        marginTop: 20,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '500'
    }
});
