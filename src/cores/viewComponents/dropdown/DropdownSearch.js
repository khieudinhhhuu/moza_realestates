import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, TouchableOpacity
} from 'react-native';
import {Button, Picker, Icon} from 'native-base';
import {Dimens} from '../../styles/dimens';
import {colors} from '../../styles/colors';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class DropdownSearch extends Component {

    render() {
        return (
            <View style={{
                // borderWidth: 1,
                // width: Dimens.screen.width - 65,
                borderColor: colors.lightGrey,
                borderRadius: 5,
            }}>
                <SearchableDropdown
                    onTextChange={this.props.onTextChange}
                    onItemSelect={this.props.onItemSelect}
                    containerStyle={{padding: 5}}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{color: '#222'}}
                    // itemsContainerStyle={{maxHeight: 140}}
                    // items={this.items}
                    items={this.props.items}
                    defaultIndex={2}
                    placeholder="Search"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: Dimens.screen.width - 65,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        // paddingBottom: 8,
        height: 40,
    }
});
