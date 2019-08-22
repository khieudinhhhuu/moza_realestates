import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card} from 'native-base';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';

export default class SearchComponent extends Component {

    render() {
        return (
            <Card style={styles.search}>
                <View style={styles.viewHorizontal}>
                    <Icon name='search' size={23} color='#000'/>
                    <View style={{width: 2, height: 20, backgroundColor: colors.lightGray, margin: 10}}/>
                    <TextInput
                        style={styles.textInput}
                        inlineImageLeft={this.props.inlineImageLeft}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        onChangeText={this.props.onChangeText}
                    />
                </View>
                <View style={{marginRight: 5}}>
                    <AntDesign name='close' size={18} color='#000'/>
                </View>
            </Card>

        );
    }
}
const styles = StyleSheet.create({

    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        marginTop: 5,
        width: Dimens.screen.width - 30,
        padding: 5,
        alignItems: 'center',
        borderRadius: 8,
    },
    viewHorizontal: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: 250,
    }
});
