import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
export default class TextRedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View>
                <Text style={[styles.text,this.props.style]}> {this.props.children}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Kanit-Regular',
        color:colors.red
    }
})
