import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import Products from "./pages/Products";

export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Products/>
            </Provider>
        )
    }
}