import {StyleSheet, Dimensions} from 'react-native';
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from 'react-native-extended-stylesheet';
import {medium, medium2_bold, medium_bold} from "../../../cores/styles/styleText";

export default class Styles {
    static getSheet(isRTL) {
        console.log('logStyle ' + isRTL)
        return EStyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '$background',
            },
            theme: {
                width: setWidth('42%'),
                height: setWidth('70%'),
                marginTop: 5,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            },
            touch: {
                backgroundColor: colors.white,
                width: setWidth('42%'),
                height: setWidth('80%'),
                borderRadius: 10,
                // ...shadowComponent
            },
            text1: {
                marginLeft: 10,
                marginTop: 5,
                color: colors.black,
                ...medium2_bold
            },
            text2: {marginLeft: 10, color: colors.black, ...medium,},
            body: {
                // flexDirection: 'row',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20
            }
        });
    }
}
