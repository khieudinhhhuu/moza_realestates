import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button, DatePicker} from 'native-base';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import Icon from 'react-native-vector-icons/FontAwesome';
import Locales from "../../languages/languages";

export default class DatePickerComponent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <DatePicker
                    defaultDate={this.props.defaultDate}
                    // minimumDate={new Date(2018, 1, 1)}
                    // maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"none"}
                    androidMode={"calendar"}
                    // animationType={this.props.animationType}
                    // placeHolderText={Locales.SelectDate}
                    // placeHolderText={this.props.placeHolderText}
                    textStyle={{color: colors.black}}
                    placeHolderTextStyle={{color: colors.lightGrey, fontWeight: 'bold'}}
                    onDateChange={this.props.onDateChange}
                    disabled={this.props.disabled}
                />
                <View style={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    right: 10,
                    top: 5
                }}>
                    <Icon name='calendar' size={25} color='red'/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: Dimens.screen.width - 65,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: 5
    }
});
