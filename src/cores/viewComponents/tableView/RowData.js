import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import {Row, Table} from "react-native-table-component";
import {Card} from "native-base";

export default class RowData extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.props.onPress}>
                    <Row
                        key={this.props.key}
                        data={this.props.data}
                        widthArr={this.props.widthArr}
                        style={[styles.row, this.props.MainMenu % 2 && {backgroundColor: '#F7F6E7'}]}
                        textStyle={styles.text}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        width: Dimens.screen.width - 65,
        borderColor: colors.lightGrey,
        height: null,
        borderRadius: 5,
        borderBottomWidth: 1.5,
        padding: 4,
        justifyContent: "flex-start",
        fontWeight: '400',
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
    },
    header: {height: 50, backgroundColor: colors.chalky, fontFamily: 'Kanit-Regular'},
    text: {textAlign: 'center', fontWeight: '300', fontFamily: 'Kanit-Regular',},
    dataWrapper: {marginTop: -1},
    row: {height: 40}
    // row: {height: 40, backgroundColor: '#E7E6E1'}
});
