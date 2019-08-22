import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import HomeDux from "./pages/HomeDux";

export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <HomeDux/>
            </Provider>
        )
    }
}