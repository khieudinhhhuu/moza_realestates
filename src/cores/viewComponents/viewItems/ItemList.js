import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {setWidth, setHeight} from "../baseFunctions/BaseFunctions";
import FastImage from "react-native-fast-image";

export default class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const item = this.props.item;
        return (
            <View>
                <View style={styles.boxWithShadow}>
                    <FastImage style={[styles.image,this.props.styleImage]} source={this.props.image}
                               resizeMode={FastImage.resizeMode.contain}/>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.author}>{this.props.author}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: setWidth('30%'),
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
    viewText:{
        marginTop:5,
        alignItems:'center',
    },
    title:{
        fontWeight:'500'
    },
    author:{

    }
});
