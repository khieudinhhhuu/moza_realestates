import {getProducts} from "../../utils/data";
import * as types from "./types";

export const fetchProducts = () => dispatch => {
    const books = getProducts();
    dispatch({
        type: types.PRODUCTS,
        payload: books
    })
};
