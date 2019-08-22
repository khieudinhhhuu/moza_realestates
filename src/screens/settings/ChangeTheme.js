import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Locales from "../../cores/languages/languages";
import HeaderComponent from "../../cores/viewComponents/headerComponent/HeaderComponent";
import {colors} from "../../cores/styles/colors";
import {
    getDataOfflineMode, inValidateText,
    saveDataOfflineMode,
    setWidth
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import FastImage from "react-native-fast-image";
import {
    horizontalView,
    marginComponent,
    marginRight5,
    paddingBottom5,
    rowView
} from "../../cores/styles/styleView";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import EStyleSheet from "react-native-extended-stylesheet";
import {Icon} from "native-base";
import Styles from "./styles/StyleTheme";
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

export default class ChangeTheme extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            themes: [
                {
                    id: 0,
                    name: 'Theme 1',
                    image: require("../../assets/image/theme1.jpg")
                },
                {
                    id: 1,
                    name: 'Theme 2',
                    image: require("../../assets/image/theme2.jpg")
                }
            ]
        }
    }

    async componentWillMount() {
        this.getTheme();
    }

    async componentDidMount() {

    }

    async getTheme() {
        const change_theme = await getDataOfflineMode(constants.CHANGE_THEME);
        console.log('change_theme: ' + change_theme);
        if (inValidateText(change_theme)) {
            this.setState({id: 0})
        } else {
            this.setState({id: change_theme})
        }

    }

    changeTheme(item) {
        this.setState({id: item})

    }

    save(id) {
        saveDataOfflineMode(constants.CHANGE_THEME, id);
        //this.props.navigation.goBack();
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const navigations = this.props.navigation;
        const {navigation} = this.props;
        console.log('data' + this.state.id);
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconRightStyle={{fontSize: 35}}
                    iconLeft='ios-arrow-back'
                    // typeIconRight='EvilIcons'
                    title={Locales.Change_Theme}
                    // iconRight='share-apple'
                    onPressLeft={() => navigation.goBack()}
                />
                <View>
                    <View style={styles.body}>
                        {this.state.themes.map((item, index) => (
                            <TouchableOpacity style={styles.touch} onPress={() => this.changeTheme(index)}>
                                <View style={{...horizontalView}}>
                                    <TextComponent style={styles.text1}>{item.name}</TextComponent>
                                    {index === this.state.id || inValidateText(this.state.id) ?
                                        <Icon name='checkcircle' type='AntDesign'
                                              style={{fontSize: 15, color: colors.froly, marginRight: 10}}/> :
                                        <Icon name='checkcircle' type='AntDesign'
                                              style={{fontSize: 15, color: colors.white, marginRight: 10}}/>}
                                </View>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.theme}
                                    source={item.image}/>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
                <View style={{
                    width: '100%',
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 10
                }}>
                    <TouchableOpacity onPress={() => this.save(this.state.id)} style={{
                        width: '80%',
                        height: 50,
                        alignItems: 'center',
                        backgroundColor: colors.froly,
                        justifyContent: 'center',
                        borderRadius: 5
                    }}>
                        <TextComponent style={{color: colors.white}}>{Locales.Agree}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
