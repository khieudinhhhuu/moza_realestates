import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, TextInput} from 'react-native';
import {colors} from "../../styles/colors";
import LinearGradient from "react-native-linear-gradient/index";
import {setWidth, setHeight} from "../baseFunctions/BaseFunctions";
import { ifIphoneX } from 'react-native-iphone-x-helper/index'
export default class HeaderSearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <LinearGradient start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={colors.blueGradient}
                            style={[styles.container]}>

                <View style={styles.viewSearch}>
                    <TextInput
                        placeholder="Search"
                        style={styles.search}/>
                </View>

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        // backgroundColor:colors.white,

        alignItems: 'center',
        justifyContent:'center',
        ...ifIphoneX({
            height: 90
        }, {
            height: 65
        })

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 18,
        marginTop: Platform.OS === 'ios' ? 50 : 40,
    },
    viewSearch: {
        // marginTop: Platform.OS === 'ios' ? 40 : 6,
        backgroundColor: colors.white,
        width: setWidth('90%'),
        height: setWidth('10%'),
        justifyContent: 'center',
        ...ifIphoneX({
            marginTop: 25
        }, {
            marginTop: 10
        }),
        borderRadius:3

    },
    search: {
        marginLeft: 5,
        width: setWidth(85),
        fontSize: 16
    }


});
