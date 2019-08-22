import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
// or any pure javascript modules available in npm
import {CheckBox} from 'react-native-elements';
import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import TextInputBorder from "../textInput/TextInputBorder";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default class RadioGroupInput extends Component {

    render() {
        return (
            <View style={styles.container}>
                <RadioButton
                    color={this.props.color}
                    value={this.state.valueButton}
                    // style={{
                    //     flexDirection: 'row-reverse',
                    //     justifyContent: 'space-between', alignItems: 'center',
                    // }}
                >
                    <Text>dsdd</Text>
                    {/*<TextInputBorder*/}
                    {/*    style={this.props.style}*/}
                    {/*    maxLength={10}*/}
                    {/*    keyboardType={this.props.keyboardType}*/}
                    {/*    onChangeText={this.props.onChangeText}*/}
                    {/*    value={this.props.valueInput}*/}
                    {/*/>*/}
                </RadioButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
    },
});
