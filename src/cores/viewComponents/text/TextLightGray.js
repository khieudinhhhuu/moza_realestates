import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
export default class TextLightGray extends Component {

  render() {
    return (
      <View>
       <Text style={styles.textRed}>{this.props.text}</Text>
      </View>
    );
  }
}
const styles=StyleSheet.create({
    textRed:{
        color:'#afb2bd',
    }
})
