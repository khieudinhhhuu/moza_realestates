import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {colors} from "../../../../assets/styles/colors";
import {Card} from "native-base";
import {setWidth, setHeight} from "../../../../cores/viewComponents/baseFunctions/BaseFunctions";
import FastImage from "react-native-fast-image";
import Dash from 'react-native-dash';
import EStyleSheet from "react-native-extended-stylesheet";
export default class ItemHorizontalThree extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const item = this.props.item
        return (
            <Card style={[styles.card, styles.horizontal]}>
                <View style={styles.boxWithShadow}>
                    <FastImage style={[styles.image]} source={this.props.image}
                               resizeMode={FastImage.resizeMode.contain}/>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.author}>{this.props.author}</Text>
                    <Dash dashColor={colors.lightGrey} style={styles.dash} dashGap={5} dashLength={6}
                          dashThickness={1}/>

                    <Text style={styles.detall}>The Rose shield Book 1 by D.Wallace Peach</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textBtn}>READ MORE</Text>
                    </TouchableOpacity>
                </View>

            </Card>
        );
    }


}

const styles = EStyleSheet.create({

    card: {
        borderRadius: 5,
        paddingLeft: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,
        marginLeft: 10,
        backgroundColor:'$bgColor'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: setWidth('24%'),
        height: setHeight('20%'),
        marginLeft: 10,
        borderRadius: 5,
    },
    boxWithShadow: {
        shadowColor: '#000',
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
        fontSize: 20,
        fontWeight: '600',
        marginBottom:5,
        color:'$textColor'
    },
    author: { color:'$textColor'},
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
    dash: {
        width: setWidth(45),
        marginTop: 10,
        height: 0.5,
        marginBottom: 10
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        width: setWidth(25),
        backgroundColor: colors.iOSBlue,
        borderRadius: 15,
        paddingLeft: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 5,
    },
    textBtn: {
        color: colors.white,
        fontSize: 14,
    },
    detall: {
        color: '$TextManganeseGrey'
    }


});
