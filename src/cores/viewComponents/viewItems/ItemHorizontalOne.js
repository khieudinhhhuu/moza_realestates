import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {colors} from "../../../../assets/styles/colors";
import TextComponent from "../../../../cores/viewComponents/text/TextComponent";
import EStyleSheet from "react-native-extended-stylesheet";
import {setWidth, setHeight} from "../../../../cores/viewComponents/baseFunctions/BaseFunctions";
import FastImage from "react-native-fast-image/src/index";

export default class ItemHorizontalOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    ratingCompleted(rating) {
        // console.log("Rating is: " + rating)
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
                    showsHorizontalScrollIndicator={false}
                    // renderItem={item => this.renderItem(item)}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={this.props.onPressItem}>
                            <View style={styles.viewItem}>
                                <View style={styles.boxWithShadow}>
                                    <FastImage style={[styles.image]} source={{uri: item.image}}
                                               // resizeMode={FastImage.resizeMode.contain}
                                    />
                                </View>
                                <View style={styles.viewText}>
                                    <TextComponent
                                        numberOfLines={1}
                                        style={styles.title}>{item.title}</TextComponent>
                                    <TextComponent style={styles.author}>Moza</TextComponent>
                                </View>
                            </View>
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
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: setWidth('30%'),
        height: setHeight('20%'),
        marginLeft: 10,
        borderRadius: 5,
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5
    },
    viewText:{
        marginTop:5,
        alignItems:'center',
        width: setWidth('28%'),
        justifyContent:'center',
        marginLeft:10
    },
    title:{
        fontWeight:'600',
        fontSize:16,
        textAlign:'center'
    },
    author:{

    },
    viewItem:{

    }
});
