import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Button, Picker, Icon } from 'native-base';
import { Dimens } from '../../styles/dimens';
import { colors } from '../../styles/colors';
import { Card } from 'native-base';
export default class DropdownComponentShadow extends Component {

    render() {
        return (
            <Card style={{ borderRadius: 8 }}>
                <Picker
                    mode="dropdown"
                    iosHeader={this.props.iosHeader}
                    placeholder={this.props.placeholder}
                    placeholderStyle={{ fontWeight: '500', marginLeft: 0, color: colors.black }}
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.pickerStyle}
                    textStyle={{ fontFamily: 'Kanit-Regular' }}
                    itemTextStyle={{ fontFamily: 'Kanit-Regular' }}
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}
                >
                    {this.props.renderList}
                </Picker>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: Dimens.screen.width - 30,
        marginTop: 5,
        height: 45,

    }
});
