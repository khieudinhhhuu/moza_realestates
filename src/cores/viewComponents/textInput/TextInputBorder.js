import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import {TextField} from "react-native-material-textfield";
import {formatValueTextInput} from "../baseFunctions/BaseFunctions";

export default class TextInputBorder extends Component {

    render() {
        return (
            <View>
                <TextInput
                    style={[styles.textArea, this.props.style]}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={colors.lightGrey}
                    numberOfLines={1}
                    placeholder={this.props.placeholder}
                    multiline={true}
                    blurOnSubmit={this.props.blurOnSubmit}
                    returnKeyType={this.props.returnKeyType}
                    onChangeText={this.props.onChangeText}
                    onChange={this.props.onChange}
                    value={formatValueTextInput(this.props.value)}
                    keyboardType={this.props.keyboardType}
                    editable={this.props.editable}
                    maxLength={this.props.maxLength}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textArea: {
        width: Dimens.screen.width / 1.6,
        borderColor: colors.lightGrey,
        height: null,
        borderRadius: 5,
        borderWidth: 1.5,
        padding: 4,
        justifyContent: "flex-start",
        fontWeight: '500',
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
    },
});
