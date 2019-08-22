import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Animated,
    ImageBackground,
    Dimensions,
    FlatList,
    AppRegistry,
    Modal,
    Switch,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from "react-native-ratings";
import {colors} from "../../cores/styles/colors";
import PhotoUpload from "react-native-photo-upload";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {
    setWidth,
    getValueByIDPicker,
    getIDByValuePicker,
    getValueValidityPicker, getDataOfflineMode, validateText
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import RNPickerSelect from 'react-native-picker-select';
import {Select, Option} from "react-native-chooser";
import RNFetchBlob from 'rn-fetch-blob';
import {Item} from 'native-base';
import DropdownComponent from "../../cores/viewComponents/dropdown/DropdownComponent";
import {NavigationActions, StackActions} from "react-navigation";
import {styles} from './styles/StyleSell';
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

let options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const address = [
    {
        label: 'Choose The City: ',
        key: 'key0'
    },
    {
        label: 'TP Hồ Chí Minh',
        key: 'key1'
    },
    {
        label: 'Hà Nội',
        key: 'key2'
    },
    {
        label: 'Cần Thơ',
        key: 'key3'
    },
    {
        label: 'Đà Nẵng',
        key: 'key4'
    },
    {
        label: 'Nha Trang',
        key: 'key5'
    },
    {
        label: 'Huế',
        key: 'key6'
    },
];

const loaibds = [
    {
        label: 'Choose Real Estate Type: ',
        key: 'key0'
    },
    {
        label: 'Biệt thự, Đất biệt thự',
        key: 'key1'
    },
    {
        label: 'Căn hộ chung cư',
        key: 'key2'
    },
    {
        label: 'Nhà liền kề, Đất dự án',
        key: 'key3'
    },
    {
        label: 'Đất dịch vụ, đền bù',
        key: 'key4'
    },
    {
        label: 'Đất thổ cư, đất nền',
        key: 'key5'
    },
    {
        label: 'Nhà mặt phố',
        key: 'key6'
    },
];

const huong = [
    {
        label: 'Select Direction: ',
        key: 'key0'
    },
    {
        label: 'Đông',
        key: 'key1'
    },
    {
        label: 'Tây',
        key: 'key2'
    },
    {
        label: 'Nam',
        key: 'key3'
    },
    {
        label: 'Bắc',
        key: 'key4'
    },
    {
        label: 'Đông Bắc',
        key: 'key5'
    },
    {
        label: 'Đông Nam',
        key: 'key6'
    },
    {
        label: 'Tây Bắc',
        key: 'key7'
    },
    {
        label: 'Tây Nam',
        key: 'key8'
    },
];

export default class Sell extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: false,
            image_uri: 'http://chittagongit.com/download/7430',
            name: "",
            owner: "",
            price: "",
            sqm: "",
            year: "",
            description: "",
            detail: "",
            validity: "",
            validity2: "",
            validity3: "",

            selectedValidity: '',

            location: "",
            latitude_data: "",
            longitude_data: "",
            formatted_address:'',


            currentUser: [],
            bg: colors.blue,

            // value : "Chọn tỉnh thành",
            // tinhthanh: [
            //   {city: 'TP Hồ Chí Minh',},
            //   {city: 'Hà Nội',},
            //   {city: 'Cần Thơ',},
            //   {city: 'Đà Nẵng',},
            //   {city: 'Nha Trang',},
            //   {city: 'Huế',},
            // ],
        };

        thisState = this;
    }

    // onSelect(value, label) {
    //     this.setState({
    //         value: value,
    //     });
    // }

    onLocation = data => {
        this.setState({data},()=>{
            console.log('latitude_data: ' + JSON.stringify(data.location.latitude));
            console.log('longitude_data: ' + JSON.stringify(data.location.longitude));
            // console.log('latitude_data: ' + JSON.stringify(data.location.coords.latitude));
            // console.log('longitude_data: ' + JSON.stringify(data.location.coords.longitude));
        });

        this.setState({
            latitude_data: data.location.latitude,
            longitude_data: data.location.longitude,
        },()=>{
            const {latitude_data, location, longitude_data} = this.state;
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude_data},${longitude_data}&key=AIzaSyAXOTNZOqwvAUls4Ax0jul3Ae58GRQn--g`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
            dataSource: responseJson,
            formatted_address:responseJson.results[0].formatted_address
            }, function () {
                console.log('location: '+ responseJson);
                // In this block you can do something with new state.
            });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    };

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        if (validateText(backgroundColor)) {
            this.setState({
                    bg: backgroundColor
                }, () =>
                    global.colors = this.state.bg
            )
        } else {
            this.setState({
                    bg: colors.blue
                }, () =>
                    global.colors = this.state.bg
            )
        }


        const user = firebaseApp.auth().currentUser;
        console.log("user_sell: " + JSON.stringify(user));
        firebaseApp.database().ref('users').child('accounts').on('value', function (snapshot) {
            console.log("snapshot: " + JSON.stringify(snapshot));
            //đây là hàm để lặp toàn bộ object trong mảng accounts
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    thisState.setState({
                        isLoading: true,
                        currentUser: childData,
                    },() => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_displayName: " + childData.displayName);
                    })
                }
            });
        });
    }

    _onPost() {
        if (this.state.name.trim() === '' || this.state.owner.trim() === '' || this.state.price.trim() === '' ||
            this.state.sqm.trim() === '' || this.state.year.trim() === '' || this.state.description.trim() === '' ||
            this.state.detail.trim() === '') {
            Alert.alert('Error !!!', 'Please enter Text Content');
            return
        }
        const user = firebaseApp.auth().currentUser;
        //console.log("wwwwwww: " + JSON.stringify(this.state.currentUser));
        //console.log("kkkkkkk: " + JSON.stringify(this.state.currentUser.displayName));
        firebaseApp.database().ref('data').child('sell').push({
            name: this.state.name,
            owner: this.state.owner,
            price: this.state.price,
            sqm: this.state.sqm,
            year: this.state.year,
            description: this.state.description,
            detail: this.state.detail,
            address: this.state.validity,
            type: this.state.validity2,
            direction: this.state.validity3,
            image: this.state.image_uri,
            latitude: this.state.latitude_data,
            longitude: this.state.longitude_data,
            location: this.state.formatted_address,
            email: this.state.currentUser.email,
            displayName: this.state.currentUser.displayName,
            photoURL: this.state.currentUser.photoURL,
            phoneNumber: this.state.currentUser.phoneNumber,
            addressUser: this.state.currentUser.address,
        });

        //this.props.navigation.navigate('Menu');
        this.props.navigation.dispatch(resetAction);

        this.setState({
            name: '',
            owner: '',
            price: '',
            sqm: '',
            year: '',
            description: '',
            detail: '',
            //validity: '',
            //validity2: '',
            //validity3: '',
            latitude_data: "",
            longitude_data: "",
            formatted_address:'',
            image_uri: "http://chittagongit.com/download/7430",
        })
    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            const sessionId = new Date().getTime();
            let uploadBlob = null;

            const imageRef = firebaseApp.storage().ref('images').child(`${sessionId}.jpg`);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, {contentType: mime})
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    chooseFile = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // let source = { uri: response.uri };
                // this.setState({image_uri: response.uri})

                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

                this.uploadImage(response.uri)
                    .then(url => {
                        this.setState({image_uri: url})
                    })
                    .catch(error => console.log(error))

            }
        });
    };


    renderItemPicker(data) {
        let quantities = [];
        data.map((item, i) => {
            quantities.push(
                <Item key={i} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange(key) {
        const validity = getValueValidityPicker(address, key);
        this.setState({
            validity: getValueValidityPicker(address, key),
            selectedValidity: key,
        });
        console.log('Label_address: ' + validity);
        console.log('Key_address: ' + key)
    }

    renderItemPicker2(data) {
        let quantities = [];
        data.map((item, index) => {
            quantities.push(
                <Item key={index} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange2(key) {
        const validity2 = getValueValidityPicker(loaibds, key);
        this.setState({
            validity2: getValueValidityPicker(loaibds, key),
            selectedValidity2: key,
        });
        console.log('Label_bds: ' + validity2);
        console.log('Key_bds: ' + key)
    }

    renderItemPicker3(data) {
        let quantities = [];
        data.map((item, index) => {
            quantities.push(
                <Item key={index} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange3(key) {
        const validity3 = getValueValidityPicker(huong, key);
        this.setState({
            validity3: getValueValidityPicker(huong, key),
            selectedValidity3: key,
        });
        console.log('Label_huong: ' + validity3);
        console.log('Key_huong: ' + key)
    }

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        console.log('formatted_address: ' + this.state.formatted_address);
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        console.log('location' + JSON.stringify(this.state.location));
        //console.log("aaa1: " + JSON.stringify(this.state.currentUser));
        //console.log("aaa2: " + JSON.stringify(this.state.currentUser.displayName));
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon3 onPress={() => navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <Text style={styles.titleHeader}>{Locales.Postsaleofrealestate}</Text>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <TextComponent style={styles.textTitle}>{Locales.Pleasecompletefulltheinformation}</TextComponent>
                        <View style={styles.viewImageBDS}>
                            <Image style={styles.imageBDS} source={{uri: this.state.image_uri}}/>
                        </View>
                        <View style={styles.btnSelectImage}>
                            <TouchableOpacity style={styles.selectImage} onPress={this.chooseFile.bind(this)}>
                                <Text style={styles.textSelectImage}>{Locales.SelectImage}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.information}>
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker(address)}
                                onValueChange={this.onItemChange.bind(this)}
                                selectedValue={'' + this.state.selectedValidity}
                            />

                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker2(loaibds)}
                                onValueChange={this.onItemChange2.bind(this)}
                                selectedValue={'' + this.state.selectedValidity2}
                            />

                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker3(huong)}
                                onValueChange={this.onItemChange3.bind(this)}
                                selectedValue={'' + this.state.selectedValidity3}
                            />

                            {/* <Select
                                onSelect = {this.onSelect.bind(this)}
                                defaultText  = {this.state.value}
                                style = {styles.viewSelect}
                                textStyle = {{fontSize: 16}}
                                backdropStyle  = {{backgroundColor : "#d3d5d6"}}
                                optionListStyle = {{backgroundColor : "#F5FCFF", width: 335, height: 400}}
                            >
                                {this.state.tinhthanh.map((item, index) => (
                                    <Option key={index} style={styles.option} styleText={styles.textOption} value={item.city}>{item.city}</Option>
                                ))}
                            </Select>  */}

                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Nameofrealestate}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.textInputName.focus()}
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Ownerofrealestate}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputName = input}
                                    onSubmitEditing={() => this.textInputOwner.focus()}
                                    onChangeText={(owner) => this.setState({owner})}
                                    value={this.state.owner}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Enterthetotalpriceofrealestate}
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputOwner = input}
                                    onSubmitEditing={() => this.textInputPrice.focus()}
                                    onChangeText={(price) => this.setState({price})}
                                    value={this.state.price}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Enterrealestateacreage}
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputPrice = input}
                                    onSubmitEditing={() => this.textInputSqm.focus()}
                                    onChangeText={(sqm) => this.setState({sqm})}
                                    value={this.state.sqm}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Yearbuilt}
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputSqm = input}
                                    onSubmitEditing={() => this.textInputYear.focus()}
                                    onChangeText={(year) => this.setState({year})}
                                    value={this.state.year}
                                />
                            </View>
                            <View style={styles.content2}>
                                <TextInput
                                    style={styles.textInput2}
                                    placeholder= {Locales.Describerealestate}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={true}
                                    multiline={true}
                                    maxLength={5000}
                                    ref={(input) => this.textInputYear = input}
                                    onChangeText={(description) => this.setState({description})}
                                    value={this.state.description}
                                />
                            </View>
                            <View style={styles.content3}>
                                <TextInput
                                    style={styles.textInput2}
                                    placeholder= {Locales.Realestatedetails}
                                    returnKeyType="go"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={true}
                                    multiline={true}
                                    maxLength={5000}
                                    onChangeText={(detail) => this.setState({detail})}
                                    value={this.state.detail}
                                />
                            </View>
                            {/*{console.log("latitude_data: " + this.state.latitude_data)}*/}
                            <View style={styles.content}>
                                <View style={styles.latitude}>
                                    <Text numberOfLines={2} style={styles.textLatitude}>{this.state.formatted_address}</Text>
                                </View>
                            </View>
                            {/*<TouchableOpacity style={styles.btnLocation} onPress={() => navigate('SetMap', {onLocation: this.onLocation })}>*/}
                            {/*    <Text style={styles.textLocation}>{Locales.ChooseLocationForRealEstate}</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity style={styles.btnLocation} onPress={() => navigate('SelectLocation', {onLocation: this.onLocation })}>
                                <Text style={styles.textLocation}>SelectLocation</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={[styles.btnPost, {backgroundColor: color}]} onPress={() => this._onPost()}>
                                <TextComponent style={styles.textPost}>{Locales.POSTBELIEVE}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnCancel, {backgroundColor: color}]} onPress={() => navigation.goBack()}>
                                <TextComponent style={styles.textCancel}>{Locales.Cancel}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: "$background"
//     },
//     keyboardView: {
//         width: "100%",
//         height: "100%"
//     },
//     fake: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     iconLeft: {
//         marginTop: 20,
//         color: "#fff",
//         marginLeft: 5,
//     },
//     titleHeader: {
//         color: "white",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 20,
//         marginTop: 20,
//     },
//     iconSearch: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     title: {
//         color: "$textColor",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 16,
//         marginTop: 10,
//     },
//     avatar: {
//         width: '85%',
//         height: 200,
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 20,
//         borderRadius: 5,
//     },
//     imageAvatar: {
//         width: "100%",
//         height: 200,
//         borderRadius: 5,
//     },
//     btnSelectImage: {
//         width: "85%",
//         height: 40,
//         alignItems: "center",
//         marginTop: 20,
//         marginBottom: 20,
//     },
//     selectImage: {
//         width: "100%",
//         height: 40,
//         backgroundColor: "orange",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5,
//     },
//     textSelectImage: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     information: {
//         width: "85%",
//         marginTop: 20,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     dropdown: {
//         marginBottom: 20,
//     },
//     // viewSelect: {
//     //   width: 335,
//     //   height: 45,
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     //   borderRadius: 5,
//     //   borderWidth: 0.5,
//     //   borderColor: "black",
//     //   marginBottom: 20,
//     //   backgroundColor: '#fff'
//     // },
//     // option: {
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     // },
//     // textOption: {
//     //   fontSize: 16,
//     //   textAlign: "center",
//     //   fontWeight: 'bold'
//     // },
//     content: {
//         width: "100%",
//         height: 45,
//         marginBottom: 20,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         backgroundColor: '#fff',
//         justifyContent: "center",
//     },
//     textInput: {
//         fontSize: 16,
//         paddingLeft: 10,
//         paddingRight: 10
//     },
//     content2: {
//         width: "100%",
//         height: 80,
//         marginBottom: 20,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         backgroundColor: '#fff'
//     },
//     textInput2: {
//         paddingLeft: 10,
//         paddingRight: 10,
//         color: 'black',
//         fontSize: 16,
//         textAlignVertical: 'top'
//     },
//     content3: {
//         width: "100%",
//         height: 140,
//         marginBottom: 20,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         backgroundColor: '#fff'
//     },
//     latitude: {
//         width: "100%",
//         justifyContent: "center",
//     },
//     textLatitude: {
//         fontSize: 16,
//         paddingLeft: 10,
//         paddingRight: 10,
//         color: 'black',
//     },
//     btnLocation: {
//         width: "100%",
//         height: 40,
//         backgroundColor: "orange",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     textLocation: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     btn: {
//         width: "85%",
//         height: 110,
//         alignItems: "center",
//         marginTop: 20,
//         marginBottom: 20,
//     },
//     btnSignin: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5,
//         marginBottom: 15
//     },
//     textSignin: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     btnCancel: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5
//     },
//     textCancel: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
// });

