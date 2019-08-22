import React, {Component} from 'react';
import {
    Text, TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button, DatePicker} from 'native-base';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "react-native-modal-datetime-picker";

export default class TimePickerComponent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={{alignItems: 'flex-start',marginLeft: 8}}>{this.props.timePicked}</Text>
                    <DateTimePicker
                        mode={"time"}
                        isVisible={this.props.isVisible}
                        onConfirm={this.props.onConfirm}
                        onCancel={this.props.onCancel}
                    />
                    <View style={{
                        position: 'absolute',
                        alignItems: 'flex-end',
                        right: 10,
                        bottom: -2
                    }}>
                        <Icon name='calendar' size={25} color='red'/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height:40,
        justifyContent: 'center',
        width: Dimens.screen.width - 65,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: 5
    }
});
