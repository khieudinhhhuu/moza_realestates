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
import Icon from 'react-native-vector-icons/Ionicons';
import {buttonIconBack} from "../../styles/buttons";

export default class ButtonBack extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.viewBack, this.props.style]}>
                <Icon name="ios-arrow-back" size={28} color={colors.white}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    viewBack: {
        ...buttonIconBack,
        marginLeft: 10,
        marginBottom: 5,
        backgroundColor: colors.red,
    },
});
