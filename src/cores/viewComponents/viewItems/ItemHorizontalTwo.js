import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {colors} from "../../../../assets/styles/colors";
import {Card} from "native-base";
import FastImage from "react-native-fast-image";
import {setHeight, setWidth} from "../../../../cores/viewComponents/baseFunctions/BaseFunctions";
import RatingBar from "../../../../cores/viewComponents/ratingStar/RatingBar";
import TextComponent from "../../../../cores/viewComponents/text/TextComponent";
import EStyleSheet from "react-native-extended-stylesheet";

export default class ItemHorizontalTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    render() {
        const item = this.props.item;
        return (
            <View style={styles.container}>
                <View style={[styles.header, styles.horizontal]}>
                    <Text style={styles.titleLeft}>{this.props.titleLeft}</Text>
                    <TouchableOpacity style={styles.btnRight}>
                        <Text style={styles.titleRight}>{this.props.titleRight}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.dataFlatList}
                    horizontal
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    // renderItem={item => this.renderItem(item)}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={this.props.onPressItem}>
                            <Card style={[styles.card, styles.horizontal]}>
                                <View style={styles.boxWithShadow}>
                                    <FastImage style={[styles.image]} source={{uri: item.image}}
                                               // resizeMode={FastImage.resizeMode.contain}
                                    />
                                    {/*{console.log('image: ' + JSON.stringify(item))}*/}
                                </View>

                                <View style={styles.viewText}>
                                    <TextComponent
                                        // style={styles.title}
                                                   numberOfLines={2}>{item.title}</TextComponent>
                                    {/*<Text style={styles.author}>{item.author}</Text>*/}
                                    <TextComponent style={styles.detall} numberOfLines={2}>The Rose shield Book 1 by D.Wallace Peach</TextComponent>
                                    {/*<View style={styles.row}>*/}
                                    {/*    <Text style={styles.pin}>SCIENCE FICTION</Text>*/}
                                    {/*    <Text style={styles.pin}>FANTASY</Text>*/}
                                    {/*</View>*/}
                                    <View style={{width:50,marginTop:5}}>
                                        <RatingBar
                                            disabled={true}
                                            maxStars={5}
                                            starSize={25}
                                            rating={item.rate}
                                            fullStarColor={colors.yellow}
                                        />
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:colors.white,
        // height: Platform.OS === 'ios' ? 85 : 50,
        alignItems: 'center'
    },
    header: {
        width: setWidth(95),
        marginBottom: 10
    },
    titleLeft: {
        fontSize: setWidth('5%'),
        fontWeight: '600',
        color: '$textColor'
    },
    btnRight: {
        backgroundColor: '$bgColor',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        paddingTop: 2,
        borderColor: colors.lightGrey,
        // borderWidth:0.5
    },
    titleRight: {
        fontSize: setWidth('3.6%'),
        color:'$textColor',
    },
    card: {
        backgroundColor: '$bgColor',
        borderRadius: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginLeft: 10
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        // width: Dimens.screen.width/3,
        // height: Dimens.screen.width/2.5,
        // width: setWidth('24%'),
        // height: setHeight('16%'),
        width: setWidth('24%'),
        height: setWidth('35%'),
        marginLeft: 10,
        borderRadius: 5,
    },
    boxWithShadow: {
        shadowColor: '#cacaca',
        shadowOffset: {width: 0.5, height: 0},
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5
    },
    viewText: {
        width: setWidth(45),
        marginLeft: 20,
        // alignItems: 'center',
    },
    title: {
        fontSize: setWidth('5'),
        fontWeight: '600',
        marginBottom: 5
    },
    author: {marginBottom: 5},
    pin: {
        marginTop: 10,
        fontSize: 12,
        backgroundColor: colors.iOSBlue,
        borderRadius: 3,
        paddingLeft: 2,
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 2,
        marginRight: 5,
        color: colors.white
    },
    rating: {
        marginTop: 10,
        alignItems: 'flex-start',
    },
    detall: {
        color: colors.color_text_second
    }
});
