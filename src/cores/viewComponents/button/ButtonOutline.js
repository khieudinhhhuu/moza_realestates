import React, {Component} from 'react';
import {
    Text,
    View, TouchableOpacity,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'native-base';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";

export default class ButtonOutline extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={this.props.style}>
                <TextBlackComponent style={this.props.textStyle}>{this.props.text}</TextBlackComponent>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        width: Dimens.screen.width / 2 - 20,
        height: 40,
        borderColor: colors.red,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
