import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {colors} from '../../styles/colors';

export default class TextInputComponent extends Component {

    render() {
        const {props} = this;
        return (
            <TextField
                {...props}
                style={[styles.textField, this.props.style]}
                label={this.props.label}
                // ref={this.props.ref}
                ref={(input) => props.inputRef && props.inputRef(input)}
                onSubmitEditing={this.props.onSubmitEditing}
                blurOnSubmit={this.props.blurOnSubmit}
                labelTextStyle={{fontWeight: '400'}}
                // titleTextStyle={{fontFamily: 'Kanit-Regular'}}
                // affixTextStyle={{fontFamily: 'Kanit-Regular'}}
                value={this.props.value}
                labelFontSize={16}
                maxLength={this.props.maxLength}
                multiline={true}
                textContentType={this.props.textContentType}
                lineWidth={1.5}
                autoCapitalize={this.props.autoCapitalize}
                onChangeText={this.props.onChangeText}
                keyboardType={this.props.keyboardType}
                // returnKeyType={'next'}
                returnKeyType={this.props.returnKeyType}
                secureTextEntry={this.props.secureTextEntry}
                selectTextOnFocus={this.props.selectTextOnFocus}
                editable={this.props.editable}
            />
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        // padding: 2,
        // fontFamily: 'Kanit-Regular',
    }
});
