import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import {colors} from "../../cores/styles/colors";

export const ChatRightHolder = (props) => {

    return (
        <View style={styles.right}>
            <View style={styles.messageRight}>
                <TextComponent style={styles.textRight}>{props.message}</TextComponent>
            </View>
            <View style={styles.avatarRight}>
                <Image style={styles.imageAvatar} resizeMode="cover" source={{uri: "http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg"}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    right: {
        width: "97%",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 5,
    },
    messageRight: {
        width: "60%",
        backgroundColor: "#3895ff",
        borderTopLeftRadius: 10,
        borderTopRightRadius:  5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textRight: {
        fontSize: 15,
        color: colors.white
    },
    avatarRight: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        marginLeft: 5,
        marginRight: 5,
    },
    imageAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
});