import React, {Component} from 'react';
import {
    Text,
    View, TouchableOpacity,
    StyleSheet, ActivityIndicator
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'native-base';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";
import Locales from "../../languages/languages";
import ButtonOutline from "./ButtonOutline";

export default class ButtonLoadMore extends Component {

    render() {
        return (
            <View style={styles.footer}>
                <ButtonOutline
                    textStyle={styles.textButton}
                    style={styles.buttonAddCancel}
                    onPress={this.props.onPress}
                    text={Locales.LoadMore}
                />
                {this.props.fetching_from_server ? (
                    <View style={styles.indicatorButton}>
                        <ActivityIndicator size='large' color={colors.red} style={{marginLeft: 8}}/>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textButton: {
        // textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.red,
        fontFamily: 'Kanit-Regular'
    },
    indicatorButton: {
        position: "absolute",
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        right: 30,
        bottom: 12
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonAddCancel: {
        borderRadius: 25,
        width: Dimens.screen.width - 32,
        height: 45,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
});
