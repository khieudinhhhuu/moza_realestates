import React, {Component} from 'react';
import {
    Text,
    View, TouchableOpacity,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'native-base';
import {Dimens} from '../../styles/dimens';
import {colors} from '../../styles/colors';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";
import {Buttons, Spacing, Texts} from "../../styles/styleBase";
import {textButton} from "../../styles/texts";

export default class ButtonFilled extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container, this.props.style]}>
                <TextBlackComponent style={styles.textStyle}>{this.props.text}</TextBlackComponent>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // borderRadius: 25,
        // width: Dimens.screen.width - 40,
        // height: 45,
        marginTop: Spacing.margin.sm,
        // alignItems: 'center',
        // justifyContent: 'center'
        backgroundColor: colors.red,
        ...Buttons.roundedLarge
    },
    textStyle: {
        // fontWeight: Texts.fontWeightTypes.large,
        color: colors.white,
        // fontFamily: Texts.fontTypes.kanitRegular,
        ...Texts.textButton
    }
});
