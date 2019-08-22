import Storage from 'react-native-storage';
import {Alert, AsyncStorage, Dimensions, NetInfo, PermissionsAndroid, Share} from 'react-native';
import {Item, Toast} from 'native-base';
import {NavigationActions, StackActions} from "react-navigation";
import constants from "../../../assets/constants";
// import keys from "../../../assets/keys";
import Locales from "../../languages/languages";
import React from "react";
import FastImage from "react-native-fast-image";
import TextBlackComponent from "../text/textBlack/TextBlackComponent";
import RNFetchBlob from "rn-fetch-blob";
// import validThaiID from 'thai-id-validator';
import {RNToasty} from "react-native-toasty";
import moment from "moment";
import validator from 'validator';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get("window");

const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,
    // cache data in the memory. default is true.
    enableCache: true,
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

const shareToOtherApp = (message, link) => {
    Share.share(
        {
            message: message + ' ' + link
        })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg));
};

const downloadNameCardAndroid = (url) => {
    let date = new Date();
    let ext = extention(url);
    ext = "." + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        appendExt: 'png',
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: PictureDir + "/image_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
            description: 'Image'
        },
    };
    config(options).fetch('GET', url, {
        'Cache-Control': 'no-store'
    }).then((res) => {
        ToastUtilsSuccess(Locales.DownloadNameCardSuccessful);
        // ToastUtilsSuccess('The Name Card saved to ', res.path())
        console.log('The Name Card saved to ', res.path())
    });
};



const setWidth = (value) => {
    return wp(value)
};

const setHeight = (value) => {
    return hp(value)
};

const isEmail = (text) => {
    return validator.isEmail(text)
};

const openFileIos = (firstName, lastName, url) => {
    RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        // path: RNFetchBlob.fs.dirs.DocumentDir + '/catalog/' + ext
    })
        .fetch('GET', url)
        .then((res) => {
            // open the document directly
            let fileName = firstName + '_' + lastName + '_NameCard' + res.path().slice(-4, -1) + res.path().slice(-1);
            RNFetchBlob.ios.previewDocument(res.path());
            // console.log('Path: ' + JSON.stringify(res.path().slice(-4,-1)));
            console.log('Path: ' + fileName);
            // or show options
            // RNFetchBlob.ios.openDocument(res.path())
            console.log('Res path: ' + res.path())
        })
};


const ToastUtils = (text, position, type, buttonText, duration) => {
    Toast.show({
        text: text,
        position: position,
        type: type,
        buttonText: buttonText,
        duration: duration,
    });
};

const ToastUtilsError = (text) => {
    return Toast.show({
        text: text,
        position: 'bottom',
        type: 'error',
        buttonText: 'Dismiss',
        duration: 2500,
    });
};

const ToastyError = (title) => {
    return RNToasty.Error({
        title: title,
        // icon: 'icon',
        // duration: 2500,
    });
};

const ToastyErrorLong = (title) => {
    return RNToasty.Error({
        title: title,
        // icon: 'icon',
        duration: 6000,
    });
};

const ToastySuccess = (title) => {
    return RNToasty.Success({
        title: title,
        // icon: 'icon',
        // duration: 2500,
    });
};

const ToastyWarning = (title) => {
    return RNToasty.Warn({
        title: title,
        // icon: 'icon',
        // duration: 2500,
    });
};

const ToastUtilsErrorLong = (text) => {
    return Toast.show({
        text: text,
        position: 'bottom',
        type: 'danger',
        buttonText: 'Dismiss',
        duration: 7000,
    });
};

const formatNumberWithCommas = (number) => {
    if (validateText(number)) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return ''
    }
};

const convertEmptyToZero = (number) => {
    return number === '' ? '0' : number;
};

const ToastUtilsDanger = (text) => {
    return Toast.show({
        text: text,
        position: 'bottom',
        type: 'danger',
        buttonText: 'Dismiss',
        duration: 2500,
    });
};

const ToastUtilsSuccess = (text) => {
    return Toast.show({
        text: text,
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 2500,
    });
};

// const validateIDCard = (text) => {
//     return validThaiID(text)
// };

const fixDigits = (text, digit) => {
    return Number(text).toFixed(digit)
};

const formatDMYtoYMD = (date) => {
    return date.split("/").reverse().join("-");
};

const formatYMDToDMY = (date) => {
    return date.split("-").reverse().join("/");
};

const convertToCompareDateObject = (date) => {
    let parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
};

const getDateWhenChangeDay = (date1, date2) => {
    let date = '';
    if (formatDate(date1) === formatDate(new Date())) {
        date = formatDate(date2)
        // date = formatNewDateBeforePostYMD(date2)
    } else {
        date = formatDate(date1);
    }
    return date;
};

const validateDateBeforePost = (dateString, dateObject, dateParam) => {
    let date = '';
    if (validateText(dateString)) {
        date = getDateWhenChangeDay(dateObject, new Date(formatDMYtoYMD(dateString)));
    } else {
        date = getDateWhenChangeDay(dateObject, new Date(dateParam));
    }
    return date;
};

const getDefaultDOB = () => {
    const dob = new Date();
    let year = dob.getFullYear();
    let month = dob.getMonth();
    let day = dob.getDate();
    return new Date(year - 20, month, day);
};

const getDefaultDOBText = () => {
    const dob = new Date();
    let year = dob.getFullYear();
    let month = dob.getMonth();
    let day = dob.getDate();
    const date = new Date(year - 20, month, day);
    return formatDateDMY(date);
};
const getDefaultDOBText2 = () => {
    const dob = new Date();
    let year = dob.getFullYear();
    let month = dob.getMonth();
    let day = dob.getDate();
    const date = new Date(year - 20, month, day);
    return formatDate(date);
};

const getNextTwoWeeksDateText = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    const newDate = new Date(year, month, day + 14);
    return formatDate(newDate);
};

const getNextOneWeeksDateText = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    const newDate = new Date(year, month, day + 7);
    return formatDate(newDate);
};

const getNextTwoWeeksDateTextDMY = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    // const newDate = new Date(year, month, parseInt(day + 14));
    const newDate = new Date(year, month, day + 14);
    return formatDateDMY(newDate);
};
const getNextOneWeeksDateTextDMY = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    // const newDate = new Date(year, month, parseInt(day + 14));
    const newDate = new Date(year, month, day + 7);
    return formatDateDMY(newDate);
};

const getNextTwoWeeksDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return new Date(year, month, day + 14);
};

const getNextOneWeeksDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return new Date(year, month, day + 7);
};

const ToastUtilsSuccessLong = (text, duration) => {
    return Toast.show({
        text: text,
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: duration,
    });
};

const renderValueTextInput = (value) => {
    if (value === '' || value === undefined || null) {
        console.log('Value:' + value)
        return '';
    } else {
        console.log(value)
        return value;
    }
};

const formatISODate = (chosenDate) => {
    return chosenDate.getFullYear() + "-" + parseInt(chosenDate.getMonth() + 1) + "-" + chosenDate.getDate();
};

const showQuantity = () => {
    let array = [];
    for (let i = 1; i < 100; i++) {
        array.push(i)
    }
    return array;
};

const onValuePickerChange = (value) => {
    return value;
};

const saveLocalStorage = (key, value) => {
    try {
        AsyncStorage.setItem(key, JSON.stringify(value));
        // console.log('saveLocalStorage Successful: ' + JSON.stringify(value));
        return value;
    } catch (e) {
        console.log('saveLocalStorage error: ' + e);
        return e;
    }
};

const saveTextData = (key, value) => {
    try {
        AsyncStorage.setItem(key, value);
        return value;
    } catch (e) {
        return e;
    }
};

async function getLocalStorage(key) {
    let value = '';
    try {
        value = await AsyncStorage.getItem(key) || '';
        value = JSON.parse(value)
    } catch (error) {
        // Error retrieving data
        console.log('getLocalStorage error: ' + error.message);
    }
    return value;
}

async function getTextData(key) {
    let value = '';
    try {
        value = await AsyncStorage.getItem(key) || '';
        // value = JSON.parse(value)
    } catch (error) {
        // Error retrieving data
        console.log('getLocalStorage error: ' + error.message);
    }
    return value;
}

async function removeLocalStorage(key) {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (exception) {
        return false;
    }
}

const removeDataLocal = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return 'removeToken';
    } catch (e) {
        return e;
    }
};

const checkPeriodTime = (start, end) => {
    let currentTime = moment();    // e.g. 11:00 pm
    let startTime = moment(start, "HH:mm a");
    let endTime = moment(end, "HH:mm a");
    return currentTime.isBetween(startTime, endTime);
};

const saveUserInfo = (user) => {
    saveLocalStorage(keys.KEY_USER_INFO, user);
};

//Phai dat function nay la async
async function getUserInfo() {
    return await getLocalStorage(keys.KEY_USER_INFO);
}

async function getDataOfflineMode(key) {
    return await getLocalStorage(key);
}

const saveDataOfflineMode = (key, data) => {
    saveLocalStorage(key, data)
};

const notifyOfflineMode = () => {
    ToastUtilsDanger(Locales.NotAvailableOffline)
};

const checkInternetStatus = async () => {
    let status = '';
    await NetInfo.isConnected.fetch().done(
        (isConnected) => {
            return isConnected === true;
        });
    // return status;
};

const saveUserOffline = (user) => {
    saveLocalStorage(keys.KEY_USER_PROFILE, user)
};

async function getUserOffline() {
    return await getLocalStorage(keys.KEY_USER_PROFILE);
}

// async function renderItemPicker(dataSource) {
//     let data = dataSource;
//     let quantities = [];
//     data.map((i) => {
//         quantities.push(
//             <Item key={i} label={i} value={i}/>
//         );
//     });
//     return quantities;
// }

const renderItemPicker = (data) => {
    let quantities = [];
    data.map((item, i) => {
        quantities.push(
            <Item key={i} label={item.value} value={"" + item.id}/>
        );
    });
    return quantities;
};

async function getDropdownData(dataSource) {
    let data = dataSource;
    let quantities = [];
    data.map((item) => {
        quantities.push({
            id: "" + item.Key,
            value: item.Value,
        });
    });
    return quantities;
}

const formatValueTextInput = (value) => {
    if (value === '' || value === undefined || value === null) {
        return '';
    } else {
        return value;
    }
};

async function getDropdownData2(dataSource) {
    let data = dataSource;
    let quantities = [];
    data.map((item) => {
        quantities.push({
            id: item.Key,
            name: item.Value,
        });
    });
    return quantities;
}

const renderPassportOrIDCard = (item) => {
    if (validateText(item.PersonalId)) {
        return <TextBlackComponent
            numberOfLines={2}>{Locales.PersonalIDNo}: {item.PersonalId}
        </TextBlackComponent>
    } else {
        return <TextBlackComponent
            numberOfLines={2}>{Locales.PassportNo}: {item.PassportNo}
        </TextBlackComponent>
    }
};
const navigateLoginAgain = async (responseJson, navigation) => {
    let dataUser = await getUserInfo();
    if (responseJson.code === 205) {
        ToastUtilsErrorLong(responseJson.message);
        navigateFinishPreScreen('ConfirmPinCode', navigation);
    } else if (responseJson.code === 404) {
        if (dataUser.UserType === 'sc') {
            navigateMainMenuOfflineMirai('MenuSC', navigation, 'off')
        } else {
            navigateMainMenuOfflineMirai('MenuSM', navigation, 'off')
        }
    }
};

const setSelectedIndex = (contact_channel) => {
    // const {contact_channel} = this.state;
    let index = '';
    if (validateText(contact_channel)) {
        if (contact_channel.includes('Mobile1')) {
            index = 0
        } else if (contact_channel.includes('Mobile2')) {
            index = 1
        } else if (contact_channel.includes('Home')) {
            index = 2
        } else if (contact_channel.includes('Office')) {
            index = 3
        }
        return index;
    }
}

const saveUsername = async (token) => {
    try {
        await AsyncStorage.setItem('@username', token);
        return 'Successful';
    } catch (e) {
        return e;
    }
};

const saveStatusRememberMe = async (token) => {
    try {
        await AsyncStorage.setItem('@rememberMe', token);
        return 'Successful';
    } catch (e) {
        return e;
    }
};

const extention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
};

const showAlertDialog = (title, message, textLeft, textRight,
                         handleLeftEvent, handleRightEvent) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: textLeft, onPress: () => handleLeftEvent,
                style: 'cancel'
            },
            {text: textRight, onPress: () => handleRightEvent},
        ],
        {cancelable: false}
    )
};

async function getResponseJSON_API(login_token, url, isSaveLocal = false) {
    //isSaveLocal = false;
    url = await prepareForAPI(url);
    console.log('url: ' + url);
    if (isSaveLocal) {
        let responseJson = await getLocalStorage(url);
        if (responseJson !== '') {
            // console.log('getResponseJSON_ Local: ' + JSON.stringify(responseJson));
            return responseJson;
        }
    } else {
        await removeLocalStorage(url);
    }
    // console.log('getResponseJSON_ Online: ' + url);
    let responseJson = await fetch(url).then(res => res.json());
    if (isSaveLocal) {
        saveLocalStorage(url, responseJson)
    }
    return responseJson;
}

async function prepareForAPI(url) {
    let user = await getUserInfo();
    console.log('userInfo : ');
    console.log(user);
    if (typeof url === 'string') {
        if (Locales.getLanguage() === 'en') {
            url = url + `&login_token=${formatBeforePost(user.login_token)}&LanguageId=en-US&page=${formatBeforePost(constants.PAGE_INDEX)}`
                // url = url + `&login_token=${constants.LOGIN_TOKEN}&LanguageId=en-US&pages=${formatBeforePost(constants.PAGE_INDEX)}`
                + `&user_id=${formatBeforePost(user.data.id)}&UserId=${formatBeforePost(user.UserId)}&UserType=${formatBeforePost(user.UserType)}`
                + `&EmployeeID=${formatBeforePost(user.EmployeeID)}`
                + `&DealerId=${formatBeforePost(user.DealerId)}`
                + `&DealerCompanyId=${formatBeforePost(user.DealerCompanyId)}`
                + `&DealerGroupId=${formatToNumBeforePost(user.DealerGroupId)}`
                // + `&DealerGroupId=${formatBeforePost(user.DealerGroupId)}`
                + `&BranchId=${formatBeforePost(user.BranchId)}`;
            // url = url + `&login_token=${constants.LOGIN_TOKEN}&LanguageId=en-US&pages=${constants.PAGE_INDEX}&limit=${constants.PAGE_SIZE}`;
        } else {
            url = url + `&login_token=${formatBeforePost(user.login_token)}&LanguageId=th-TH`
                + `&page=${formatBeforePost(constants.PAGE_INDEX)}&user_id=${formatBeforePost(user.data.id)}`
                + `&UserId=${formatBeforePost(user.UserId)}&UserType=${formatBeforePost(user.UserType)}`
                + `&EmployeeID=${formatBeforePost(user.EmployeeID)}`
                + `&DealerId=${formatBeforePost(user.DealerId)}`
                + `&DealerCompanyId=${formatBeforePost(user.DealerCompanyId)}`
                + `&DealerGroupId=${formatToNumBeforePost(user.DealerGroupId)}`
                + `&UserName=${formatBeforePost(user.data.username)}`
                + `&BranchId=${formatBeforePost(user.BranchId)}`;
            // url = url + `&login_token=${constants.LOGIN_TOKEN}&LanguageId=th-TH&pages=${constants.PAGE_INDEX}&limit=${constants.PAGE_SIZE}`;
        }
    } else {
        url.append('LanguageId', Locales.getLanguage() === 'en' ? 'en-US' : 'th-TH');
        url.append('login_token', `${formatBeforePost(user.login_token)}`);
        url.append('user_id', formatBeforePost(user.data.id))
        url.append('UserName', formatBeforePost(user.data.username))
        url.append('UserId', formatBeforePost(user.UserId))
        url.append('EmployeeID', formatBeforePost(user.EmployeeID))
        url.append('DealerId', formatBeforePost(user.DealerId))
        url.append('DealerCompanyId', formatBeforePost(user.DealerCompanyId))
        url.append('DealerGroupId', formatToNumBeforePost(user.DealerGroupId))
        // url.append('DealerGroupId', formatBeforePost(user.DealerGroupId))
        url.append('BranchId', formatBeforePost(user.BranchId))
        // url.append('limit', `${constants.PAGE_SIZE}`);
        // url.append('pages', `${constants.PAGE_INDEX}`);
    }
    console.log('prepare: ' + url);
    return url;
}

const validateText = (text) => {
    return text !== '' && text !== null
        && text !== undefined && text !== 'null' &&
        text !== 'undefined'
};

const validateDefaultValue = (text) => {
    return text !== '' && text !== null
        && text !== undefined && text !== 'null' &&
        text !== 'undefined' && text !== 0
};

const formatHtml = (text) => {
    return text.replace('width=""', 'width="100%"')
};

const checkHtmlTag = (text) => {
    if (validateText(text)) {
        return !!(text.includes('<p>') || text.includes('<img'));
    }
};

const inValidateText = (text) => {
    return text === '' || text === null ||
        text === 'null' || text === 'undefined' ||
        text === undefined
};

const formatStringCommaToNumber = (text) => {
    // console.log(text.toString());
    if (text === null || text === undefined) {
        return '';
    } else {
        return text.toString().replace(/,/g, '')
    }
};

const inValidateNumber = (text) => {
    return text === '' || text === null ||
        text === 'null' || text === 'undefined' ||
        text === undefined || text === 0 || text === '0'
};
const formatBeforePost = (text) => {
    return (text === null || text === undefined
        || text === 'null' || text === 'undefined') ? "" : text
};
const formatDate = (date) => {
    let dateFormat = '';
    if (date instanceof Date) {
        dateFormat = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();
    } else {
        dateFormat = '';
    }
    return dateFormat;
};
const formatNewDateBeforePost = (date) => {
    let dateFormat = '';
    if (date instanceof Date) {
        dateFormat = date.getFullYear() + "-" + date.getDate() + "-" + parseInt(date.getMonth() + 1);
    } else {
        dateFormat = '';
    }
    return dateFormat;
};

const formatNewDateBeforePostYMD = (date) => {
    let dateFormat = '';
    if (date instanceof Date) {
        dateFormat = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();
    } else {
        dateFormat = '';
    }
    return dateFormat;
};

const formatDateDMY = (date) => {
    let dateFormat = '';
    if (date instanceof Date) {
        dateFormat = ('0' + date.getDate()).slice(-2) + "/" + ('0' + parseInt(date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
    } else {
        dateFormat = '';
    }
    return dateFormat;
};

const formatDateWithTime = (date) => {
    let dateFormat = '';
    if (date instanceof Date) {
        dateFormat = ('0' + date.getDate()).slice(-2) + "/" +
            ('0' + parseInt(date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else {
        dateFormat = '';
    }
    return dateFormat;
};

const formatToNumBeforePost = (text) => {
    return (text === null || text === undefined) ? 0 : text
};

const getIDByValuePicker = (dataArray, selectedValue) => {
    console.log('value: ' + selectedValue);
    return "" + selectedValue;
};

const getValueByIDPicker = (dataArray, id) => {
    let result = dataArray.filter(obj => {
        return obj.id === id
    });
    return result[0]['value'];
};
const getLatestArray = (dataLatest, dataRemoved) => {
    let onlyInFirst = function (equal, a, b) {
        return a.filter(function (current) {
            return b.filter(equal(current)).length === 0
        });
    };
    let onlyInFirstMyObject = onlyInFirst.bind(0, function equal(a) {
        return function (b) {
            return a.id === b.id
        }
    });
    return onlyInFirstMyObject(dataLatest, dataRemoved).concat(onlyInFirstMyObject(dataRemoved, dataLatest));
};

// const getValueValidityPicker = (dataArray, id) => {
//     let result = dataArray.filter(obj => {
//         return obj.key === id
//     });
//     return result[0]['label'];
// };

const getValueValidityPicker = (dataArray, id) => {
    let result = dataArray.filter(obj => {
        return obj.key === id
    });
    return result[0]['label'];
};

const convertToString = (text) => {
    return string(text)
};

const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text) !== false;
};


const navigateFinishPreScreen = (screen, navigation) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: screen})
        ]
    });
    navigation.dispatch(resetAction);
};

const onUserInActivity = (active, navigation) => {
    !active ? navigateFinishPreScreen('ConfirmPinCode', navigation) : '';
};
const getTypeOfUser = (type) => {

};

const getDirectionAndColor = ({moveX, moveY, dx, dy}) => {
    const draggedDown = dy > 30;
    const draggedUp = dy < -30;
    const draggedLeft = dx < -30;
    const draggedRight = dx > 30;
    const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
    const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
    let dragDirection = "";

    if (draggedDown || draggedUp) {
        if (draggedDown) dragDirection += "dragged down ";
        if (draggedUp) dragDirection += "dragged up ";
    }

    if (draggedLeft || draggedRight) {
        if (draggedLeft) dragDirection += "dragged left ";
        if (draggedRight) dragDirection += "dragged right ";
    }

    if (isRed) return `red ${dragDirection}`;
    if (isBlue) return `blue ${dragDirection}`;
    if (dragDirection) return dragDirection;
};

const navigateFinishPreScreenWithParams = (screen, navigation, data, isSameUser) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: screen, params: {data: data, isSameUser: isSameUser}})
        ]
    });
    navigation.dispatch(resetAction);
};
const navigateMainMenuOfflineMirai = (screen, navigation, status) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: screen, params: {status: status}})
        ]
    });
    navigation.dispatch(resetAction);
};

const navigateFinishSearchPPPC = (screen, navigation, customer, tagAddNew, title) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: screen,
                params: {customer: customer, tagAddNew: tagAddNew, title: title}
            })
        ]
    });
    navigation.dispatch(resetAction);
};

const navigateFinishPreScreenPincode = (screen, navigation, userPinCode) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: screen, params: {userPinCode: userPinCode}})
        ]
    });
    navigation.dispatch(resetAction);
};

async function requestWriteExtStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

async function getConnectionInfo() {
    let connection = await NetInfo.getConnectionInfo().then((connectionInfo) => connectionInfo.json());
    // let responseJson = await fetch(url).then(res => res.json());
    NetInfo.addEventListener(
        'connectionChange',
        // this.handleFirstConnectivityChange
    );
    return connection;
}

async function requestAccessLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'MobileSC Permission',
                message:
                    'MobileSC needs access to your location ' +
                    'so you can view map.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

const showImage = (url, placeholderImage, width, height) => {
    if (url === '') {
        return <FastImage
            style={{width: width, height: height}}
            source={placeholderImage}
            // source={require(placeholderImage)}
        />
    } else {
        return <FastImage
            style={{width: width, height: height}}
            source={{
                uri: url,
            }}
        />
    }
};

const getValuePicker = (dataSource) => {
    let quantities = [];
    dataSource.map((item) => {
        quantities.push({
            id: item.Key,
            value: item.Value,
        });
    });
    return quantities;
    // return quantities.map(a => a.value);
};

const checkTimeoutToLogout = (navigation) => {
    if (validateText(navigation))
        setTimeout(() => {
            navigateFinishPreScreen('Login', navigation)
        }, 10000);
};

export {storage}
export {showImage}
export {getIDByValuePicker};
export {getValueByIDPicker};
export {ToastUtils}
export {ToastUtilsSuccess}
export {ToastUtilsSuccessLong}
export {ToastUtilsDanger}
export {ToastUtilsError}
export {ToastUtilsErrorLong}
export {shareToOtherApp}
export {getDefaultDOB}
export {checkTimeoutToLogout}
export {navigateFinishPreScreen};
export {prepareForAPI};
export {saveUserInfo};
export {getUserInfo};
export {getResponseJSON_API};
export {getNextTwoWeeksDate};
export {getDropdownData};
export {renderItemPicker};
export {extention};
export {saveTextData};
export {formatNumberWithCommas};
export {getTextData};
export {getDefaultDOBText2};
export {getUserOffline};
export {saveUserOffline};
export {removeLocalStorage};
export {getDateWhenChangeDay};
export {showAlertDialog};
export {validateText};
export {formatBeforePost};
export {inValidateText};
export {validateEmail};
export {getDropdownData2};
// export {validateIDCard};
export {fixDigits};
export {ToastyError};
export {ToastyWarning};
export {ToastyErrorLong};
export {ToastySuccess};
export {getNextTwoWeeksDateText};
export {checkInternetStatus};
export {saveDataOfflineMode};
export {getNextOneWeeksDate};
export {getDataOfflineMode};
export {requestWriteExtStoragePermission};
export {renderPassportOrIDCard};
export {removeDataLocal};
export {notifyOfflineMode};
export {formatValueTextInput};
export {inValidateNumber};
export {convertEmptyToZero};
export {getValueValidityPicker};
export {downloadNameCardAndroid};
export {openFileIos};
export {formatDate};
export {formatStringCommaToNumber};
export {formatDateDMY};
export {getDefaultDOBText};
export {getNextOneWeeksDateText};
export {formatDMYtoYMD};
export {formatYMDToDMY};
export {convertToCompareDateObject};
export {getNextTwoWeeksDateTextDMY};
export {formatNewDateBeforePost};
export {formatNewDateBeforePostYMD};
export {getNextOneWeeksDateTextDMY};
export {getConnectionInfo};
export {navigateLoginAgain};
export {onUserInActivity};
export {getDirectionAndColor};
export {formatHtml};
export {formatDateWithTime};
export {validateDateBeforePost};
export {navigateFinishPreScreenWithParams};
export {navigateFinishPreScreenPincode};
export {navigateFinishSearchPPPC};
export {checkHtmlTag};
export {getLatestArray};
export {setSelectedIndex};
export {checkPeriodTime};
export {setWidth};
export {setHeight};
export {isEmail};
export {validateDefaultValue};
export {requestAccessLocationPermission};
export {navigateMainMenuOfflineMirai};
