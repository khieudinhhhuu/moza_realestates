import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {Icon} from 'native-base';

export default class CustomSidebarMenu extends Component {
    constructor() {
        super();
        this.proileImage =
            'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
        this.items = [
            {
                navOptionThumb: 'camera',
                navOptionName: 'First Screen',
                screenToNavigate: 'NavScreen1',
            },
            {
                navOptionThumb: 'image',
                navOptionName: 'Second Screen',
                screenToNavigate: 'NavScreen2',
            },
            {
                navOptionThumb: 'build',
                navOptionName: 'Third Screen',
                screenToNavigate: 'NavScreen3',
            },
        ];
    }
    render() {
        return (
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <Image
                    source={{ uri: this.proileImage }}
                    style={styles.sideMenuProfileIcon}
                />
                {/*Divider between Top Image and Sidebar Option*/}
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#e2e2e2',
                        marginTop: 15,
                    }}
                />
                {/*Setting up Navigation Options from option array using loop*/}
                <View style={{ width: '100%' }}>
                    {this.items.map((item, key) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                            key={key}>
                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Icon name={item.navOptionThumb} size={25} color="#808080" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                }}>
                                {item.navOptionName}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 150 / 2,
    },
});
