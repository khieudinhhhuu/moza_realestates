import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Button, Picker, Icon } from 'native-base';
import { Dimens } from '../../styles/dimens';
import { colors } from '../../styles/colors';

export default class DropdownNormal extends Component {

    render() {
        return (
            <Picker
                mode="dropdown"
                iosHeader={this.props.iosHeader}
                placeholder={this.props.placeholder}
                placeholderStyle={{ fontWeight: 'bold', marginLeft: 0 }}
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{ fontFamily: 'Kanit-Regular' }}
                style={styles.pickerStyle}
                itemTextStyle={{ fontFamily: 'Kanit-Regular' }}
                selectedValue={this.props.selectedValue}

                onValueChange={this.props.onValueChange}
            >
                {this.props.renderList}
            </Picker>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: null,
        borderWidth: 1,
        borderColor: colors.lightGrey,  // color of the border
        // paddingBottom: 8,
        height: 40,
        borderRadius: 5,
    }
});
