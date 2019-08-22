import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, TextInput
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colors } from '../../styles/colors';
import { Card } from 'native-base';
import { Dimens } from '../../styles/dimens';
export default class TextInputComponentShawDow extends Component {
    render() {
        return (
            <Card style={{ borderRadius: 8, height: 50, width: Dimens.screen.width - 30,justifyContent:'center'}}>
                <TextField
                    style={styles.textField}
                    label={this.props.label}
                    labelTextStyle={{ fontWeight: 'bold' }}
                    value={this.props.value}
                    labelFontSize={16}
                    multiline={true}
                    lineWidth={1.5}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                    returnKeyType={this.props.returnKeyType}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        width: Dimens.screen.width - 40,

    }
});
