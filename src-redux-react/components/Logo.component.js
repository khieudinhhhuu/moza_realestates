import React, { Component } from 'react';

import {
    Image,
    TouchableOpacity,Text
} from 'react-native';



class Logo extends Component {

    goHome = () => {
        this.props.navigation.navigate('Products');
    }
    render() {
        return (
            <TouchableOpacity onPress={this.goHome}>
                <Text>hih</Text>
            </TouchableOpacity>
        );
    }
}


export default Logo;
