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
    Modal
} from "react-native";
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import * as firebase from "firebase";
import Splash from "../screens/splash/Splash";
import Splash2 from "../screens/splash2/Splash2";
import Splash3 from "../screens/splash3/Splash3";
import Login from "../screens/login/Login";
import Signup from "../screens/signup/Signup";
import Welcome from "../screens/welcome/Welcome";
import Menu from "../screens/menu/Menu";
import Home from "../screens/home/Home";
import Favourites from "../screens/favourites/Favourites";
import Profile from "../screens/profile/Profile";
import Settings from "../screens/settings/Settings";
import Maps from "../screens/maps/Maps";
import Properties from "../screens/properties/Properties";
import Mostpopular from "../screens/mostpopular/Mostpopular";
import Toprated from "../screens/toprated/Toprated";
import Recommended from "../screens/recommended/Recommended";
import Details from "../screens/details/Details";
import News from "../screens/news/News";
import News_Details from "../screens/news/News_Details";
import Sell from "../screens/sell/Sell";
import SelectLocation from "../screens/sell/SelectLocation";
import EditAccount from "../screens/edit_account/EditAccount";
import SetMap from "../screens/sell/SetMap";
import Sell_Detail from "../screens/sell_detail/Sell_Detail";
import Users from "../screens/users/Users";
import ChangeTheme from "../screens/settings/ChangeTheme";
import LoadMore from "../screens/test/LoadMore";
import DetailsTheme1 from "../screens/details/DetailsTheme1";

class App extends Component {

    render() {
        return <View style={styles.container}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});

const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    Splash2: {
        screen: Splash2,
        navigationOptions: {
            header: null
        }
    },
    Splash3: {
        screen: Splash3,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Maps: {
        screen: Maps,
        navigationOptions: {
            header: null
        }
    },
    News: {
        screen: News,
        navigationOptions: {
            header: null
        }
    },
    News_Details: {
        screen: News_Details,
        navigationOptions: {
            header: null
        }
    },
    Favourites: {
        screen: Favourites,
        navigationOptions: {
            header: null
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    EditAccount: {
        screen: EditAccount,
        navigationOptions: {
            header: null
        }
    },
    Users: {
        screen: Users,
        navigationOptions: {
            header: null
        }
    },
    Sell: {
        screen: Sell,
        navigationOptions: {
            header: null
        }
    },
    SelectLocation: {
        screen: SelectLocation,
        navigationOptions: {
            header: null
        }
    },
    SetMap: {
        screen: SetMap,
        navigationOptions: {
            header: null
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: null
        }
    },
    ChangeTheme: {
        screen: ChangeTheme,
        navigationOptions: {
            header: null
        }
    },
    Sell_Detail: {
        screen: Sell_Detail,
        navigationOptions: {
            header: null
        }
    },
    Properties: {
        screen: Properties,
        navigationOptions: {
            header: null
        }
    },
    Mostpopular: {
        screen: Mostpopular,
        navigationOptions: {
            header: null
        }
    },
    Toprated: {
        screen: Toprated,
        navigationOptions: {
            header: null
        }
    },
    Recommended: {
        screen: Recommended,
        navigationOptions: {
            header: null
        }
    },
    Details: {
        screen: Details,
        navigationOptions: {
            header: null
        }
    },
    DetailsTheme1: {
        screen: DetailsTheme1,
        navigationOptions: {
            header: null
        }
    },
    LoadMore: {
        screen: LoadMore,
        navigationOptions: {
            header: null
        }
    },
});

// console.disableYellowBox = true;
// StatusBar.setHidden(true);

export default createAppContainer(AppNavigator);
