import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, TouchableOpacity
} from 'react-native';
import {Dimens} from '../../styles/dimens';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'native-base';
import {colors} from '../../styles/colors';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";
import {Buttons, Spacing, Texts} from "../../styles/styleBase";

export default class ButtonLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container, this.props.style]}>
                <TextBlackComponent style={this.props.textStyle}>{this.props.text}</TextBlackComponent>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.margin.sm,
        backgroundColor: colors.red,
        ...Buttons.roundedLarge
    },
    textStyle: {
        color: colors.white,
        ...Texts.textButton
    }
});
