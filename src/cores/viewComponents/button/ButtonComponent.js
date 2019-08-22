import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from "../../styles/colors";
import {Dimens} from "../../styles/dimens";

export default class ButtonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container, this.props.style]}>
                <Text style={[styles.text,this.props.styleText]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: Dimens.screen.width / 1.2,
        height: 56,
        // backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:colors.iOSBlue,
        borderWidth:1
    },
    text:{
        fontSize:18,
        color:colors.iOSBlue
    }
});
