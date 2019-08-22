import React, {Component} from 'react';
import {
    Text,
    View, TouchableOpacity,
    StyleSheet, Alert
} from 'react-native';
import {colors} from '../../styles/colors';

export default class AlertDialog extends Component {

    render() {
        return (
            Alert.alert(
                this.props.title,
                this.props.message,
                [
                    {
                        text: this.props.textNegative,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {text: this.props.textPositive, onPress: () => this.props.onPress},
                    // { text: 'OK', onPress: () => this.navigateLogin('Login') },
                ],
                {cancelable: false}
            )
        );
    }
}

const styles = StyleSheet.create({
    viewBack: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 5,
    },
});
