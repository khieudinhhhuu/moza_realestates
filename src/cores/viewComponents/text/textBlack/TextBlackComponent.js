import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default class TextBlackComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text
                    onPress={this.props.onPress}
                    style={[styles.text, this.props.style]}
                    numberOfLines={this.props.numberOfLines}>{this.props.children}</Text>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    text: {
        // fontFamily: 'Kanit-Regular',
        color:'$textColor'
    }
});
