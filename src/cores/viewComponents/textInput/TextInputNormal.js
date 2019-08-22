import React, { Component } from 'react';
import {
    Text,
    View, TextInput,
    StyleSheet
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'native-base';
import { colors } from '../../styles/colors';

export default class TextInputNormal extends Component {

    render() {
        return (
            <TextInput
                style={styles.container}
                inlineImageLeft={this.props.inlineImageLeft}
                placeholder={this.props.placeholder}
                value={this.props.value}
                multiline={true}
                placeholderTextColor={this.props.placeholderTextColor}
                onChangeText={this.props.onChangeText}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        flex: 1,
        padding: 8,
        fontWeight: 'bold',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
