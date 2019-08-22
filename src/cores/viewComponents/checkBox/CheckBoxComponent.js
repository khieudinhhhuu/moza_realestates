import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Button, Picker, Icon, Card} from 'native-base';
import {Dimens} from '../../styles/dimens';
import {CheckBox} from 'react-native-elements';
import {colors} from '../../styles/colors';
import Locales from "../../languages/languages";

export default class CheckBoxComponent extends Component {

    render() {
        return (
            <View>
                <CheckBox
                    disabled={this.props.disabled}
                    title={this.props.title}
                    checked={this.props.checked}
                    onPress={this.props.onPress}
                    checkedColor={this.props.checkedColor}
                    containerStyle={{
                        backgroundColor: '#fff',
                        borderColor: '#fff',
                        padding: 0,
                        marginBottom: 5
                    }}
                    size={26}
                    fontFamily={'Kanit-Regular'}
                    textStyle={{fontWeight: '400', fontSize: 16, color: colors.lightGrey}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
