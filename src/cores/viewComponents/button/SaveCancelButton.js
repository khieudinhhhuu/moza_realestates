import React, {Component} from 'react';
import {
    Text, TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Dimens} from '../../styles/dimens';
import {colors} from '../../styles/colors';
import Locales from '../../languages/languages';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";

export default class SaveCancelButton extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.onPressCancel}
                    style={styles.btnCancel}>
                    <TextBlackComponent style={styles.textCancel}>{Locales.Cancel}
                    </TextBlackComponent>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.props.onPressSave}
                    style={styles.btnSave}>
                    <TextBlackComponent style={styles.textSave}>{Locales.Save}
                    </TextBlackComponent>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    btnCancel: {
        borderRadius: 5,
        padding: 10,
        width: Dimens.screen.width / 2 - 20,
        height: 40,
        borderColor: colors.red,
        marginRight: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    btnSave: {
        borderRadius: 5,
        width: Dimens.screen.width / 2 - 32,
        height: 40,
        marginLeft: 8,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCancel: {
        color: colors.red,
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        fontWeight: '400'
    },
    textSave: {
        color: colors.white,
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        fontWeight: '400'
    }
});
