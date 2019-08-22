import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {colors} from "../../styles/colors";
import LinearGradient from "react-native-linear-gradient";
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Icon} from 'native-base'

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={colors.blueGradient}
                style={[styles.container, styles.horizontal]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.props.onPressLeft}>
                    <Icon name={this.props.iconLeft} type={this.props.types} style={styles.icon}/>
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.props.onPressRight}>
                    <Icon name={this.props.iconRight} type={this.props.types} style={styles.icon}/>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

        container: {
            // flex: 1,
            // backgroundColor:colors.white,
            // height: Platform.OS === 'ios' ? 55 : 50,
            alignItems: 'center',
            justifyContent: 'center',
            ...ifIphoneX({
                height: 75
            }, {
                height: 70
            })

        },
        btn: {
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',

            ...
                ifIphoneX({
                    marginTop: 25
                }, {
                    marginTop: 10
                })
        },
        icon: {
            fontSize: 30,
            color:
            colors.white,

        }
        ,
        horizontal: {
            flexDirection: 'row',
            justifyContent:
                'space-between',
            alignItems:
                'center'
        }
        ,
        title: {
            color: colors.white,
            fontWeight:
                '600',
            fontSize:
                22,
            // marginTop: Platform.OS === 'ios' ? 50 : 15,
            ...
                ifIphoneX({
                    marginTop: 25
                }, {
                    marginTop: 10
                })
        }


    })
;
