import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, TouchableOpacity
} from 'react-native';
import {Button, Picker, Icon} from 'native-base';
import {Dimens} from '../../styles/dimens';
import {colors} from '../../styles/colors';

export default class DropdownComponent extends Component {

    render() {
        return (
            <View style={[{
                borderWidth: 1,
                width: Dimens.screen.width - 58,
                borderColor: colors.lightGrey,
                borderRadius: 5,
                backgroundColor: '#fff',
                paddingLeft: 2,
            }, this.props.style]}>
                <TouchableOpacity
                    onPress={this.props.onPress}>
                    <Picker
                        mode="dropdown"
                        iosHeader={this.props.iosHeader}
                        enabled={this.props.enabled}
                        placeholder={this.props.placeholder}
                        placeholderStyle={{fontWeight: '400', marginLeft: -6, color: colors.black}}
                        iosIcon={<Icon name="arrow-down"/>}
                        style={styles.pickerStyle}
                        headerStyle={{fontFamily: 'Kanit-Regular'}}
                        headerTitleStyle={{fontFamily: 'Kanit-Regular'}}
                        textStyle={{fontFamily: 'Kanit-Regular'}}
                        itemTextStyle={{fontFamily: 'Kanit-Regular'}}
                        selectedValue={this.props.selectedValue}
                        onValueChange={this.props.onValueChange}>
                        {this.props.renderList}
                    </Picker>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: Dimens.screen.width - 65,
        borderWidth: 1,
        // fontFamily: 'Kanit-Regular',
        borderColor: colors.lightGrey,
        // paddingBottom: 8,
        height: 42,
    }
});
