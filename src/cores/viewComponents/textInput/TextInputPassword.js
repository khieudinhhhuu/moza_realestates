import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colors } from '../../styles/colors';
import TextInputComponent from "./TextInputComponent";

export default class TextInputPassword extends Component {

    render() {
        const { props } = this;
        return (
            <TextField
                {...props}
                style={styles.textField}
                label={this.props.label}
                ref={(input) => props.inputRef && props.inputRef(input)}
                onSubmitEditing={this.props.onSubmitEditing}
                blurOnSubmit={this.props.blurOnSubmit}
                labelTextStyle={{ fontWeight: '400', fontFamily: 'Kanit-Regular',}}
                value={this.props.value}
                labelFontSize={16}
                maxLength={20}
                // multiline={true}
                textContentType={this.props.textContentType}
                lineWidth={1.5}
                autoCapitalize={this.props.autoCapitalize}
                onChangeText={this.props.onChangeText}
                keyboardType={this.props.keyboardType}
                returnKeyType={this.props.returnKeyType}
                secureTextEntry={this.props.secureTextEntry}
                selectTextOnFocus = {this.props.selectTextOnFocus}
                editable={this.props.editable}
            />
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        padding: 2,
        fontFamily: 'Kanit-Regular',
    }
});
