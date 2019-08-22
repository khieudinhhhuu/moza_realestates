import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Button, Picker, Icon } from 'native-base';
import { Dimens } from '../../styles/dimens';
import { colors } from '../../styles/colors';

export default class DropdownComponentMax extends Component {

    render() {
        return (
            <View style={{borderWidth:1, width: Dimens.screen.width/1.1,borderColor: colors.lightGrey,borderRadius: 5,}}>
            <Picker
                mode="dropdown"
                iosHeader={this.props.iosHeader}
                placeholder={this.props.placeholder}
                placeholderStyle={{fontWeight:'bold', marginLeft:0}}
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                itemTextStyle={{ fontFamily: 'Kanit-Regular' }}
                textStyle={{ fontFamily: 'Kanit-Regular' }}
                selectedValue={this.props.selectedValue}
                onValueChange={this.props.onValueChange}
            >
                {this.props.renderList}
            </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: Dimens.screen.width/1.1,

        borderColor: colors.lightGrey,
        // paddingBottom: 8,
        height: 40,
        borderRadius: 5,
    }
});
