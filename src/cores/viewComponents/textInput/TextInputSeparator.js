import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import {TextInputMask} from "react-native-masked-text";
import TextInputComponent from "./TextInputComponent";
import Locales from "../../languages/languages";
import {formatBeforePost} from "../baseFunctions/BaseFunctions";

export default class TextInputSeparator extends Component {

    render() {
        return (
            <View style={this.props.style}>
                <TextInputMask
                    customTextInput={this.props.customTextInput}
                    customTextInputProps={this.props.customTextInputProps}
                    // customTextInput={TextInputComponent}
                    type={'money'}
                    keyboardType='numeric'
                    // label={Locales.Price}
                    options={{
                        precision: 0,
                        separator: '.',
                        delimiter: ',',
                        unit: '',
                        suffixUnit: ''
                    }}
                    value={this.props.value}
                    // value={formatBeforePost(this.props.value)}
                    onChangeText={this.props.onChangeText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        width: Dimens.screen.width - 65,
        borderColor: colors.lightGrey,
        height: null,
        borderRadius: 5,
        borderBottomWidth: 1.5,
        padding: 4,
        justifyContent: "flex-start",
        fontWeight: '400',
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
    },
});
