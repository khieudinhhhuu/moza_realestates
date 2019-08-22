import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from 'react-redux';
import {fetchProducts} from "../redux/actions/productAction";

class HomeDux extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        console.log("data: " + JSON.stringify(this.props.products));
        return (
            <View >
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products.items
});

export default connect(mapStateToProps ,{fetchProducts })(HomeDux)