import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import {colors} from "../../cores/styles/colors";

export const ChatLeftHolder = (props) => {

    return (
        <View style={styles.left}>
            <View style={styles.avatarLeft}>
                <Image style={styles.imageAvatar} resizeMode="cover" source={{uri: "http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg"}}/>
            </View>
            <View style={styles.messageLeft}>
                <TextComponent style={styles.textLeft}>{props.message}</TextComponent>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    left: {
        width: "97%",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 5,
    },
    avatarLeft: {
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
    messageLeft: {
        width: "60%",
        backgroundColor: "#6e6e6e",
        borderTopLeftRadius: 15,
        borderTopRightRadius:  10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textLeft: {
        fontSize: 15,
        color: colors.white
    },
});
