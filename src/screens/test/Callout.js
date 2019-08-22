import React, { Component } from 'react';
import {
    Image,              // Renders images
    StyleSheet,         // CSS-like styles
    Text,               // Renders text
    View,
} from 'react-native';
import FastImage from "react-native-fast-image";

export default class Callout extends Component {
    state = {
        initialRender: true
    }
    render() {
        const { name, image } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.bubble}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Image
                            onLayout={() => this.setState({ initialRender: false })}
                            style={styles.image}
                            source={{ uri: image }}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    // Callout bubble
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: 80,
        height: 80,
    },
});
