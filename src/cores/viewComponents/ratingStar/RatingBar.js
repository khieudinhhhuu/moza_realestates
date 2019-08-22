import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Button, Picker, Icon} from 'native-base';
import {Dimens} from '../../styles/dimens';
import {colors} from '../../styles/colors';
import StarRating from "react-native-star-rating";

export default class RatingBar extends Component {

    render() {
        return (
            <View>
                <StarRating
                    disabled={this.props.disabled}
                    emptyStar={'ios-star-outline'}
                    emptyStarColor={'red'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={this.props.maxStars}
                    starSize={this.props.starSize}
                    selectedStar={this.props.selectedStar}
                    rating={this.props.rating}
                    fullStarColor={this.props.fullStarColor}
                    starStyle={this.props.starStyle}
                />
            </View>
        );
    }
}

