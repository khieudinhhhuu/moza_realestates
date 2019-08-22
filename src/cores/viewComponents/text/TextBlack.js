import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default class TextBlack extends Component {


  render() {
    return (
      <View>
       <Text>{this.props.text}</Text>
      </View>
    );
  }
}
const styles=StyleSheet.create({

})
